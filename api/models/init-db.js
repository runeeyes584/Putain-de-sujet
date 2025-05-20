import { models, sequelize } from "./Sequelize-mysql.js";

async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối MySQL thành công");

    await sequelize.sync({ force: true}); //force true để xóa và tạo lại tất cả các bảng, có thể thay đổi thành false nếu không muốn xóa dữ liệu cũ
    console.log("Tạo database thành công");

    // Tạo job_type
    const jobTypes = await models.JobType.bulkCreate([
      { job_type: "Full-time" },
      { job_type: "Part-time" },
    ]);

    // Tạo category
    const categories = await models.Category.bulkCreate([
      { name: "Web Development" },
      { name: "Graphic Illustration" },
      { name: "SEO Services" },
      { name: "Social Media Management" },
      { name: "Animation Design" },
      { name: "Content Creation" },
      { name: "E-commerce Solutions" },
      { name: "UI/UX Design" },
      { name: "Voice Acting" },
      { name: "Mobile App Development" },
      { name: "Video Editing" },
      { name: "Copywriting" },
      { name: "Game Development" },
      { name: "Interior Design" },
      { name: "Event Planning" }
    ]);

    // Tạo subcategory
    const subCategories = await models.SubCategory.bulkCreate([
      { category_id: categories[0].id, name: "Frontend Development", description: "Frontend web development services" },
      { category_id: categories[0].id, name: "Backend Development", description: "Backend web development services" },
      { category_id: categories[1].id, name: "Logo Design", description: "Logo design services" },
      { category_id: categories[1].id, name: "Illustration", description: "Illustration services" },
      { category_id: categories[2].id, name: "Technical SEO", description: "Technical SEO optimization" },
      { category_id: categories[2].id, name: "Content SEO", description: "Content SEO optimization" },
      { category_id: categories[3].id, name: "Social Media Strategy", description: "Social media strategy development" },
      { category_id: categories[3].id, name: "Content Management", description: "Social media content management" }
    ]);


    // Tạo skills
    const skills = await models.Skills.bulkCreate([
      { name: "JavaScript" },
      { name: "React" },
      { name: "Node.js" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Photoshop" },
      { name: "Illustrator" },
      { name: "SEO" },
      { name: "Content Writing" },
      { name: "Video Editing" },
      { name: "Social Media Marketing" },
      { name: "E-commerce" },
      { name: "UI/UX Design" },
      { name: "Game Development" },
      { name: "Voice Over" },
      { name: "Animation" }
    ]);

    // Tạo user_account
    const users = await models.User.bulkCreate([
      {
        clerk_id: "user_1",
        country: "Việt Nam",
        registration_date: "2024-01-01",
        user_roles: ["employer"],
        description: "Experienced web developer",
        date_of_birth: "1990-01-01",
        gender: 1,
        contact_number: "+84123456789"
      },
      {
        clerk_id: "user_2",
        country: "USA",
        registration_date: "2024-01-02",
        user_roles: ["employer"],
        description: "Creative designer",
        date_of_birth: "1992-05-15",
        gender: 2,
        contact_number: "+12125551234"
      },
      {
        clerk_id: "user_3",
        country: "India",
        registration_date: "2024-01-03",
        user_roles: ["seeker"],
        description: "Looking for opportunities",
        date_of_birth: "1995-08-20",
        gender: 1,
        contact_number: "+911234567890"
      },
    ]);

    // Tạo seeker_profile
    await models.SeekerProfile.bulkCreate([
      {
        clerk_id: users[2].clerk_id,
        first_name: "Amit",
        last_name: "Sharma",
        current_salary: 50000,
        is_annually_monthly: true,
        currency: "USD",
        email_contact: "amit.sharma@example.com",
        file_cv: "https://example.com/cv/amit.pdf"
      }
    ]);

    // Tạo seeker_skills
    await models.SeekerSkill.bulkCreate([
      { clerk_id: users[2].clerk_id, skill_id: skills[0].id }, // JavaScript
      { clerk_id: users[2].clerk_id, skill_id: skills[1].id }, // React
      { clerk_id: users[2].clerk_id, skill_id: skills[2].id }, // Node.js
      { clerk_id: users[2].clerk_id, skill_id: skills[3].id }, // HTML
      { clerk_id: users[2].clerk_id, skill_id: skills[4].id }  // CSS
    ]);

    // Tạo companies
    const companies = await models.Company.bulkCreate([
      {
        clerk_id: users[0].clerk_id,
        company_name: "TechCorp VN",
        profile_description: "A leading tech company in Vietnam",
        establishment_date: "2020-01-01",
        company_website_url: "https://techcorp.vn",
        company_email: "contact@techcorp.vn",
        verified_at: "2020-02-01",
        location: "Hanoi, Vietnam"
      },
      {
        clerk_id: users[1].clerk_id,
        company_name: "DesignWorks USA",
        profile_description: "Creative design agency in the USA",
        establishment_date: "2018-05-15",
        company_website_url: "https://designworks.com",
        company_email: "info@designworks.com",
        verified_at: "2018-06-01",
        location: "New York, USA"
      }
    ]);

    // Tạo company_images
    await models.CompanyImage.bulkCreate([
      {
        company_id: companies[0].id,
        company_image: "https://example.com/techcorp_logo.jpg"
      },
      {
        company_id: companies[0].id,
        company_image: "https://example.com/techcorp_office.jpg"
      },
      {
        company_id: companies[1].id,
        company_image: "https://example.com/designworks_logo.jpg"
      },
      {
        company_id: companies[1].id,
        company_image: "https://example.com/designworks_team.jpg"
      }
    ]);

    // Tạo gigs
    const gigs = await models.Gig.bulkCreate([
      {
        seller_clerk_id: users[0].clerk_id,
        category_id: categories[0].id,
        job_type_id: jobTypes[0].id,
        title: "Web Development Service",
        description: "Build a responsive website",
        starting_price: 200.0,
        delivery_time: 5,
        gig_image: "https://example.com/gig1.jpg",
        city: "Hanoi",
        country: "Việt Nam",
        status: "active",
      },
      {
        seller_clerk_id: users[0].clerk_id,
        category_id: categories[0].id,
        job_type_id: jobTypes[1].id,
        title: "API Integration",
        description: "Integrate APIs for your app",
        starting_price: 150.0,
        delivery_time: 3,
        gig_image: "https://example.com/gig2.jpg",
        city: "Hanoi",
        country: "Việt Nam",
        status: "active",
      },
      {
        seller_clerk_id: users[1].clerk_id,
        category_id: categories[1].id,
        job_type_id: jobTypes[0].id,
        title: "Graphic Design",
        description: "Create stunning visuals",
        starting_price: 100.0,
        delivery_time: 4,
        gig_image: "https://example.com/gig3.jpg",
        city: "New York",
        country: "USA",
        status: "active",
      },
    ]);

    // Tạo gig_skills
    await models.GigSkill.bulkCreate([
      // Skills for Web Development gig
      {
        gig_id: gigs[0].id,
        skill_id: skills[0].id  // JavaScript
      },
      {
        gig_id: gigs[0].id,
        skill_id: skills[1].id  // React
      },
      {
        gig_id: gigs[0].id,
        skill_id: skills[2].id  // Node.js
      },
      {
        gig_id: gigs[0].id,
        skill_id: skills[3].id  // HTML
      },
      {
        gig_id: gigs[0].id,
        skill_id: skills[4].id  // CSS
      },
      // Skills for Logo Design gig
      {
        gig_id: gigs[1].id,
        skill_id: skills[5].id  // Photoshop
      },
      {
        gig_id: gigs[1].id,
        skill_id: skills[6].id  // Illustrator
      },
      {
        gig_id: gigs[1].id,
        skill_id: skills[12].id // UI/UX Design
      }
    ]);

    // Tạo gig_packages
    await models.GigPackage.bulkCreate([
      {
        gig_id: gigs[0].id,
        package_name: "Basic",
        description: "Basic web development service",
        price: 200.0,
        delivery_time: 5,
        revisions: 1
      },
      {
        gig_id: gigs[0].id,
        package_name: "Standard",
        description: "Standard web development service with additional features",
        price: 300.0,
        delivery_time: 7,
        revisions: 2
      },
      {
        gig_id: gigs[0].id,
        package_name: "Premium",
        description: "Premium web development service with all features",
        price: 500.0,
        delivery_time: 10,
        revisions: 3
      },
      {
        gig_id: gigs[1].id,
        package_name: "Basic",
        description: "Simple logo design with 2 revisions",
        price: 100.0,
        delivery_time: 3,
        revisions: 2
      },
      {
        gig_id: gigs[1].id,
        package_name: "Standard",
        description: "Standard logo design with source files",
        price: 200.0,
        delivery_time: 5,
        revisions: 3
      },
      {
        gig_id: gigs[1].id,
        package_name: "Premium",
        description: "Premium logo design with source files and unlimited revisions",
        price: 300.0,
        delivery_time: 7,
        revisions: 5
      }
    ]);

    

    // Tạo gig_extras
    const gigExtras = await models.GigExtra.bulkCreate([
      {
        gig_id: gigs[0].id,
        title: "Extra fast delivery",
        description: "Deliver your order faster",
        price: 5.0,
        extra_delivery_time: 1
      },
      {
        gig_id: gigs[0].id,
        title: "Additional revision",
        description: "Get an extra revision",
        price: 5.0,
        extra_delivery_time: 1
      },
      {
        gig_id: gigs[0].id,
        title: "Page setup",
        description: "Initial page setup",
        price: 5.0,
        extra_delivery_time: 2
      },
      {
        gig_id: gigs[0].id,
        title: "Page optimization",
        description: "Optimize page performance",
        price: 5.0,
        extra_delivery_time: 2
      },
      {
        gig_id: gigs[0].id,
        title: "Additional social media post",
        description: "Post more to social media",
        price: 5.0,
        extra_delivery_time: 1
      },
      {
        gig_id: gigs[0].id,
        title: "Additional social media mgmt",
        description: "Manage more accounts",
        price: 5.0,
        extra_delivery_time: 3
      },
      {
        gig_id: gigs[0].id,
        title: "Additional Stock Media",
        description: "Include stock media",
        price: 5.0,
        extra_delivery_time: 2
      }
    ]);

    // Tạo 3 gig_requirement_templates
    await models.GigRequirementTemplate.bulkCreate([
      {
        gig_id: gigs[1].id,
        requirement_text: "Please provide your website content and design preferences.",
        is_required: true
      },
      {
        gig_id: gigs[2].id,
        requirement_text: "Please provide your website content and design preferences.",
        is_required: true
      },
      {
        gig_id: gigs[0].id,
        requirement_text: "Please provide your website content and design preferences.",
        is_required: true
      },
      {
        gig_id: gigs[0].id,
        requirement_text: "Please provide your website content and design preferences.",
        is_required: true
      },
    ]);

    // Tạo orders
    const orders = await models.Order.bulkCreate([
      {
        gig_id: gigs[0].id,
        package_id: 1, // Basic package
        buyer_clerk_id: users[2].clerk_id,
        seller_clerk_id: users[0].clerk_id,
        order_status: "completed",
        total_price: 250.0, // Base price + extra
        order_date: "2024-01-04",
        delivery_deadline: "2024-01-09"
      },
      {
        gig_id: gigs[1].id,
        package_id: 4, // Basic package
        buyer_clerk_id: users[2].clerk_id,
        seller_clerk_id: users[1].clerk_id,
        order_status: "in_progress",
        total_price: 130.0, // Base price + extra
        order_date: "2024-01-05",
        delivery_deadline: "2024-01-08"
      },
      {
        gig_id: gigs[0].id,
        package_id: 2, // Standard package
        buyer_clerk_id: users[2].clerk_id,
        seller_clerk_id: users[0].clerk_id,
        order_status: "pending",
        total_price: 400.0, // Base price + extras
        order_date: "2024-01-06",
        delivery_deadline: "2024-01-13"
      },
    ]);

    // Tạo gig_requirements
    await models.GigRequirements.bulkCreate([
      {
        order_id: orders[0].id,
        requirement_text: "Please provide your website content and design preferences.",
        submitted_at: "2024-01-04"
      },
      {
        order_id: orders[1].id,
        requirement_text: "Please provide your brand guidelines and color preferences for the logo.",
        submitted_at: "2024-01-05"
      }
    ]);

    

    // Tạo order_extras
    await models.OrderExtra.bulkCreate([
      {
        order_id: orders[0].id,
        gig_extra_id: gigExtras[0].id, // SEO Optimization
        price: 50.0,
        extra_delivery_time: 2
      },
      {
        order_id: orders[1].id,
        gig_extra_id: gigExtras[2].id, // Social Media Kit
        price: 30.0,
        extra_delivery_time: 1
      },
      {
        order_id: orders[2].id,
        gig_extra_id: gigExtras[0].id, // SEO Optimization
        price: 50.0,
        extra_delivery_time: 2
      },
      {
        order_id: orders[2].id,
        gig_extra_id: gigExtras[1].id, // Responsive Design
        price: 100.0,
        extra_delivery_time: 3
      }
    ]);

    // Tạo reviews
    await models.Review.bulkCreate([
      {
        order_id: 1,
        gig_id: gigs[0].id,
        reviewer_clerk_id: users[2].clerk_id,
        rating: 5,
        comment: "Amazing web development service!",
      },
      {
        order_id: 2,
        gig_id: gigs[2].id,
        reviewer_clerk_id: users[2].clerk_id,
        rating: 4,
        comment: "Great graphic design!",
      },
    ]);


    // Tạo contact_forms
    await models.ContactForm.bulkCreate([
      {
        clerk_id: users[2].clerk_id, // Associated with user_3
        name: "Amit Sharma",
        email: "amit.sharma@example.com",
        message: "I would like to inquire about job opportunities.",
        submitted_at: "2025-01-06",
      },
      {
        clerk_id: null, // Guest user (no clerk_id)
        name: "John Doe",
        email: "john.doe@example.com",
        message: "I have a question about your services.",
        submitted_at: "2025-01-07",
      },
    ]);

    // Tạo experience_details
    await models.ExperienceDetail.bulkCreate([
      {
        clerk_id: users[2].clerk_id, // Associated with user_3
        certificate_degree_name: "Bachelor of Technology",
        major: "Computer Science",
        cgpa: 8.5,
        start_date: "2018-06-01",
        end_date: "2022-05-30",
        is_current_job: false,
        job_title: "Software Engineer Intern",
        company_name: "TechCorp VN",
        location: "Hanoi, Vietnam",
        description: "Developed web applications using React and Node.js",
      },
      {
        clerk_id: users[2].clerk_id, // Associated with user_3
        certificate_degree_name: "Master of Technology",
        major: "Software Engineering",
        cgpa: 9.0,
        start_date: "2022-06-01",
        end_date: null,
        is_current_job: true,
        job_title: "Software Engineer",
        company_name: "DesignWorks USA",
        location: "New York, USA",
        description: "Working on API integrations and UI design",
      },
    ]);

    // Tạo portfolio
    await models.Portfolio.bulkCreate([
      {
        clerk_id: users[0].clerk_id,
        title: "E-commerce Website",
        description: "A full-featured e-commerce platform",
        portfolio_url: "https://example.com/portfolio1",
        portfolio_size: 1024,
        portfolio_type: "image",
        created_at: "2024-01-01"
      },
      {
        clerk_id: users[1].clerk_id,
        title: "Brand Identity Design",
        description: "Complete brand identity package for a startup",
        portfolio_url: "https://example.com/portfolio2",
        portfolio_size: 2048,
        portfolio_type: "image",
        created_at: "2024-01-02"
      }
    ]);

    // Tạo gig_translations
    await models.GigTranslation.bulkCreate([
      {
        gig_id: gigs[0].id,
        language: "English",
        title: "Professional Web Development",
        description: "Full-stack web development services",
        language_code: "en"
      },
      {
        gig_id: gigs[0].id,
        language: "Vietnamese",
        title: "Phát Triển Web Chuyên Nghiệp",
        description: "Dịch vụ phát triển web full-stack",
        language_code: "vi"
      }
    ]);

    // Tạo admin_logs
    await models.AdminLog.bulkCreate([
      {
        admin_clerk_id: users[0].clerk_id,
        target_clerk_id: users[2].clerk_id,
        action: "Reviewed user profile",
        action_date: "2024-01-02"
      },
      {
        admin_clerk_id: users[0].clerk_id,
        target_clerk_id: users[1].clerk_id,
        action: "Verified company account",
        action_date: "2024-01-03"
      }
    ]);

    // Tạo gig_views
    await models.GigView.bulkCreate([
      {
        gig_id: gigs[0].id,
        view_count: 100
      },
      {
        gig_id: gigs[1].id,
        view_count: 50
      }
    ]);

    // Tạo wallet
    await models.Wallet.bulkCreate([
      {
        clerk_id: users[0].clerk_id,
        balance: 1000.0,
        currency: "USD"
      },
      {
        clerk_id: users[1].clerk_id,
        balance: 500.0,
        currency: "USD"
      },
      {
        clerk_id: users[2].clerk_id,
        balance: 200.0,
        currency: "USD"
      }
    ]);

    // Tạo withdrawal_requests
    await models.WithdrawalRequest.bulkCreate([
      {
        clerk_id: users[0].clerk_id,
        amount: 100.0,
        currency: "USD",
        request_date: "2024-01-08",
        status: "pending",
        payment_method: "PayPal"
      },
      {
        clerk_id: users[1].clerk_id,
        amount: 50.0,
        currency: "USD",
        request_date: "2024-01-09",
        status: "approved",
        payment_method: "Bank Transfer"
      }
    ]);

    // Tạo notifications
    await models.Notification.bulkCreate([
      {
        clerk_id: users[0].clerk_id,
        title: "New Order Received",
        message: "You have received a new order for Web Development services.",
        is_read: false,
        created_at: "2024-01-04",
        gig_id: gigs[0].id,
        notification_type: "order"
      },
      {
        clerk_id: users[1].clerk_id,
        title: "Order Completed",
        message: "Your logo design order has been completed.",
        is_read: true,
        created_at: "2024-01-10",
        gig_id: gigs[1].id,
        notification_type: "order_complete"
      },
      {
        clerk_id: users[2].clerk_id,
        title: "New Message",
        message: "You have received a new message regarding your order.",
        is_read: false,
        created_at: "2024-01-05",
        gig_id: gigs[0].id,
        notification_type: "message"
      }
    ]);

    // Tạo messages
    await models.Message.bulkCreate([
      {
        order_id: orders[0].id,
        ticket_id: 1,
        ticket_status: "open",
        sender_clerk_id: users[2].clerk_id,
        receiver_clerk_id: users[0].clerk_id,
        message_content: "Hi, I would like to discuss the website requirements in detail.",
        sent_at: "2024-01-04",
        is_read: false
      },
      {
        order_id: orders[0].id,
        ticket_id: 1,
        ticket_status: "open",
        sender_clerk_id: users[0].clerk_id,
        receiver_clerk_id: users[2].clerk_id,
        message_content: "Sure, I'm ready to discuss your requirements.",
        sent_at: "2024-01-04",
        is_read: true
      },
      {
        order_id: orders[1].id,
        ticket_id: 2,
        ticket_status: "closed",
        sender_clerk_id: users[2].clerk_id,
        receiver_clerk_id: users[1].clerk_id,
        message_content: "Can you make the logo more minimalist?",
        sent_at: "2024-01-05",
        is_read: true
      }
    ]);

    // Tạo saved_gigs
    await models.SavedGig.bulkCreate([
      {
        clerk_id: users[2].clerk_id,
        gig_id: gigs[0].id,
        saved_date: "2024-01-03"
      },
      {
        clerk_id: users[2].clerk_id,
        gig_id: gigs[1].id,
        saved_date: "2024-01-04"
      }
    ]);

    // Tạo payments
    await models.Payment.bulkCreate([
      {
        order_id: orders[0].id,
        buyer_clerk_id: users[2].clerk_id,
        amount: 200.0,
        payment_method: "Credit Card",
        payment_status: "completed",
        transaction_id: "TRX123456",
        created_at: "2024-01-04"
      },
      {
        order_id: orders[1].id,
        buyer_clerk_id: users[2].clerk_id,
        amount: 100.0,
        payment_method: "PayPal",
        payment_status: "pending",
        transaction_id: "TRX789012",
        created_at: "2024-01-05"
      }
    ]);

    // Tạo user_search_history
    await models.UserSearchHistory.bulkCreate([
      {
        clerk_id: users[2].clerk_id,
        search_query: "web development",
        category_id: categories[0].id,
        job_type_id: jobTypes[0].id,
        search_date: "2024-01-03"
      },
      {
        clerk_id: users[2].clerk_id,
        search_query: "logo design",
        category_id: categories[1].id,
        job_type_id: jobTypes[1].id,
        search_date: "2024-01-04"
      }
    ]);

    console.log("Thêm dữ liệu mẫu thành công");
  } catch (err) {
    console.error("Lỗi khi khởi tạo database:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    await sequelize.close();
  }
}

initDb();