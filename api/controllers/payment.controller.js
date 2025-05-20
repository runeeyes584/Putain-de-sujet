import { ProductCode, VNPay, VnpLocale, dateFormat, ignoreLogger } from 'vnpay';
import { models } from '../models/Sequelize-mysql.js';

export const vnpay = new VNPay({
  tmnCode: 'JEOP71C7',
  secureSecret: 'F48MKHH4U2ZRMTE5AZ47XHEO1UKRXHE5',
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
  hashAlgorithm: 'SHA512',
  loggerFn: ignoreLogger
});

export const createVNPayUrl = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Lấy order từ DB
    const order = await models.Order.findByPk(orderId);
    if (!order) {
      return res.status(404).send("Không tìm thấy đơn hàng");
    }

    if (!order.total_price || isNaN(order.total_price)) {
  return res.status(400).send("Giá trị đơn hàng không hợp lệ");
}

    // Tự nhận biết đơn giá là USD hay VND
    const exchangeRate = 250; // 1 USD = 25,000 VND ( nhưng do vnpay quy định là * 100 nên sau khi * 25000 sẽ * thêm 100 nữa)
    const isUSD = order.total_price < 1000; // nếu giá < 1000 thì coi là USD

    const amountInVND = isUSD
      ? Math.round(order.total_price * exchangeRate)
      : Math.round(order.total_price);

    const now = new Date();
    const expire = new Date(now.getTime() + 15 * 60 * 1000);

    console.log("💬 Tổng tiền USD từ FE:", order.total_price);
console.log("💬 Là USD?", isUSD);
console.log("💬 Sau quy đổi VND:", amountInVND);
console.log("💬 Gửi lên VNPay:", amountInVND * 100);


    const vnpayResponse = await vnpay.buildPaymentUrl({
      vnp_Amount: amountInVND * 100, // nhân 100 theo yêu cầu của VNPay
      vnp_IpAddr: req.ip || '127.0.0.1',
      vnp_TxnRef: orderId.toString(),
      vnp_OrderInfo: order.requirements || `Thanh toán đơn hàng #${orderId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: 'http://localhost:8800/api/payments/check-payment-vnpay',
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(now),
      vnp_ExpireDate: dateFormat(expire)
    });

    return res.status(201).json(vnpayResponse);
  } catch (error) {
    console.error("❌ Lỗi tạo QR:", error);
    return res.status(500).send("Không tạo được QR thanh toán");
  }
};



export const handleVNPayReturn = async (req, res) => {
  try {
    const result = await vnpay.verifyReturnUrl(req.query);
    // Xử lý order_id
    const orderId = Number(req.query.vnp_TxnRef);
    if (isNaN(orderId)) {
      console.error("❌ vnp_TxnRef không hợp lệ:", req.query.vnp_TxnRef);
      return res.status(400).send("Order ID không hợp lệ");
    }
    // Truy vấn đơn hàng
    const order = await models.Order.findByPk(orderId);
    if (!order) {
      return res.status(404).send("Không tìm thấy đơn hàng");
    }
    // Xác định trạng thái thanh toán
    let payment_status;
    if (result.isSuccess && req.query.vnp_ResponseCode === "00") {
      payment_status = "completed";
    } else if (!result.isVerified || req.query.vnp_ResponseCode !== "00") {
      payment_status = "failed";
    } else {
      payment_status = "pending";
    }
    // Lưu thanh toán
    await models.Payment.create({
      order_id: orderId,
      buyer_clerk_id: order.buyer_clerk_id,
      amount: Number(req.query.vnp_Amount) / 100,
      payment_method: req.query.vnp_BankCode || "vnpay",
      payment_status,
      transaction_id: req.query.vnp_TransactionNo,
    });
    // Chuyển hướng theo kết quả
    if (payment_status === "completed") {
      // Cập nhật trạng thái đơn hàng
      order.order_status = "completed";
      await order.save();
      return res.redirect("http://localhost:3000/checkout/success");
    } else {
      return res.redirect("http://localhost:3000/checkout/failure");
    }
  } catch (error) {
    return res.status(500).send("Lỗi callback VNPay");
  }
};
