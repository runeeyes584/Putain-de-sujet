import JobType from "./jobType.model.js";
import Category from "./category.model.js";
import Skills from "./skills.model.js";
import User from "./user.model.js";
import Company from "./company.model.js";
import CompanyImage from "./companyImage.model.js";
import SeekerProfile from "./seekerProfile.model.js";
import ExperienceDetail from "./experienceDetail.model.js";
import Gig from "./gig.model.js";
import Order from "./order.model.js";
import Review from "./review.model.js";
import Message from "./message.model.js";
import Payment from "./payment.model.js";
import SavedGig from "./savedGigs.model.js";
import ContactForm from "./contactForm.model.js";
import AdminLog from "./adminLog.model.js";
import SeekerSkill from "./seekerSkill.model.js";
import GigSkill from "./gigSkills.model.js";
import GigView from "./gigViews.model.js";
import UserSearchHistory from "./userSearchHistory.model.js";
import Notification from "./notification.model.js";
import GigTranslation from "./gigTranslation.model.js";
import Portfolio from "./portfolio.model.js";
import GigExtra from "./gigExtra.model.js";
import GigFaq from "./gigFaq.model.js";
import GigPackage from "./gigPackage.model.js";
import GigRequirements from "./gigRequirement.model.js";
import OrderExtra from "./orderExtra.model.js";
import SubCategory from "./subCategory.model.js";
import Wallet from "./wallet.model.js";
import WithdrawalRequest from "./withdrawalRequest.model.js";
import GigRequirementTemplate from "./gigReqTemplate.model.js";


export default {
  JobType,
  Category,
  Skills,
  User,
  Company,
  CompanyImage,
  SeekerProfile,
  ExperienceDetail,
  Gig,
  GigExtra,
  GigFaq,
  GigPackage,
  GigRequirements,
  Order,
  Review,
  Message,
  Payment,
  SavedGig,
  ContactForm,
  AdminLog,
  SeekerSkill,
  GigSkill,
  GigView,
  UserSearchHistory,
  Notification,
  Portfolio,
  GigTranslation,
  OrderExtra,
  SubCategory,
  Wallet,
  WithdrawalRequest,
  GigRequirementTemplate
};

//index.js, init-db.js, mySQL-db.js dành cho việc khởi tạo database và models của MySQL
//trong trường hợp không có script của MongoDB và không cài MongoDB => xem file init-db.js