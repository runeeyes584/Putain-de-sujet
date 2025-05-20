// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';

// interface BasicInfo {
//   title: string;
//   category_id: number;
//   subcategory_id: number; // Thêm subcategory_id để map với SubCategory
//   tags: string[];
//   description: string;
//   job_type_id: number; // Thêm job_type_id theo model Gig
//   city?: string;
//   country?: string;
// }

// interface Package {
//   package_name: 'Basic' | 'Standard' | 'Premium';
//   description: string;
//   delivery_time: number;
//   price: number;
//   revisions: number; // Thêm revisions theo model GigPackage
// }

// interface Requirement {
//   requirement: string;
//   required: boolean;
// }

// interface Gallery {
//   images: string[];
//   video?: string;
// }

// interface FAQ {
//   question: string;
//   answer: string;
// }

// interface gigExtra {
//   id: number;
//   gig_id: number;
//   name: string;
//   description: string;
//   price: number;
//   delivery_time: number;
//   is_selected: boolean;
// }

// export const useGigCreation = () => {
//   const router = useRouter();
//   const { user } = useUser();

//   // State cho các bước
//   const [currentStep, setCurrentStep] = useState(0);
//   const [basicInfo, setBasicInfo] = useState<BasicInfo>({
//     title: '',
//     category_id: 0,
//     subcategory_id: 0,
//     tags: [],
//     description: '',
//     job_type_id: 0, // Sẽ được gán giá trị mặc định trong bước Overview
//     city: '',
//     country: '',
//   });
//   const [packages, setPackages] = useState<Package[]>([
//     { package_name: 'Basic', description: '', delivery_time: 1, price: 0, revisions: 0 },
//     { package_name: 'Standard', description: '', delivery_time: 1, price: 0, revisions: 0 },
//     { package_name: 'Premium', description: '', delivery_time: 1, price: 0, revisions: 0 },
//   ]);
//   const [requirements, setRequirements] = useState<Requirement[]>([]);
//   const [gallery, setGallery] = useState<Gallery>({ images: [], video: '' });
//   const [faqs, setFaqs] = useState<FAQ[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [gigExtras, setGigExtras] = useState<gigExtra[]>([]);
//   const [selectedExtras, setSelectedExtras] = useState<Record<number, { price: number, delivery_time: number }>>({});


//   // Hàm upload file lên Cloudinary
//   const uploadFile = async (file: File, type: 'image' | 'video'): Promise<string> => {
//     const formData = new FormData();
//     formData.append(type === 'image' ? 'image' : 'video', file);

//     const response = await fetch('http://localhost:8800/api/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to upload ${type}`);
//     }

//     const result = await response.json();
//     if (!result.success) {
//       throw new Error(result.message || `Failed to upload ${type}`);
//     }

//     return result.imageUrl; // Cloudinary trả về secure_url
//   };

//   // Chuyển bước tiếp theo
//   const nextStep = () => {
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Quay lại bước trước
//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Hàm tạo gig
//   const submitGig = async () => {
//     if (!user) {
//       setError('User not authenticated');
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // Tạo payload cho bảng gigs
//       const gigPayload = {
//         seller_clerk_id: user.id, // Lấy từ Clerk
//         category_id: basicInfo.category_id,
//         job_type_id: basicInfo.job_type_id,
//         title: basicInfo.title,
//         description: basicInfo.description,
//         starting_price: packages[0].price, // Giá khởi điểm lấy từ package Basic
//         delivery_time: packages[0].delivery_time, // Thời gian giao hàng từ package Basic
//         gig_image: gallery.images[0] || null, // Hình ảnh đầu tiên làm gig_image
//         city: basicInfo.city || null,
//         country: basicInfo.country || null,
//         tags: basicInfo.tags,
//       };

//       // Gửi yêu cầu tạo gig
//       const gigResponse = await fetch('http://localhost:8800/api/gigs', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(gigPayload),
//       });

//       if (!gigResponse.ok) {
//         throw new Error('Failed to create gig');
//       }

//       const gigResult = await gigResponse.json();
//       if (!gigResult.success) {
//         throw new Error(gigResult.message || 'Failed to create gig');
//       }

//       const gigId = gigResult.gig.id;

//       // Tạo packages
//       const packagePayload = packages.map((pkg) => ({
//         gig_id: gigId,
//         package_name: pkg.package_name,
//         description: pkg.description,
//         price: pkg.price,
//         delivery_time: pkg.delivery_time,
//         revisions: pkg.revisions,
//       }));

//       await fetch('http://localhost:8800/api/gigPackages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(packagePayload),
//       });

//       // Tạo FAQs
//       if (faqs.length > 0) {
//         const faqPayload = faqs.map((faq) => ({
//           gig_id: gigId,
//           question: faq.question,
//           answer: faq.answer,
//         }));

//         await fetch('http://localhost:8800/api/gigFAQs', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(faqPayload),
//         });
//       }

//       // Tạo requirement templates
//       if (requirements.length > 0) {
//         const requirementPayload = {
//           gig_id: gigId,
//           requirements: requirements.map((req) => ({
//             requirement: req.requirement,
//             required: req.required,
//           })),
//         };

//         const requirementResponse = await fetch('http://localhost:8800/api/gigReqTemplates', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requirementPayload),
//         });

//         if (!requirementResponse.ok) {
//           throw new Error('Failed to create requirement templates');
//         }
//       }

      
//       const fetchGigExtras = async (gigId: number) => {
//         const res = await fetch(`http://localhost:8800/api/gigExtras/${gigId}`);
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setGigExtras(data);
//         }
//       };


//       // Chuyển hướng sau khi tạo thành công
//       router.push('/seller-dashboard');
//     } catch (err) {
//       setError('Failed to create gig. Please try again.');
//       console.error('Error submitting gig:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     currentStep,
//     basicInfo,
//     packages,
//     requirements,
//     gallery,
//     faqs,
//     isSubmitting,
//     error,
//     setBasicInfo,
//     setPackages,
//     setRequirements,
//     setGallery,
//     setFaqs,
//     nextStep,
//     prevStep,
//     submitGig,
//     uploadFile,
//   };
// };

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface BasicInfo {
  title: string;
  category_id: number;
  subcategory_id: number; 
  tags: string[];
  description: string;
  job_type_id: number;
  city?: string;
  country?: string;
}

interface Package {
  package_name: 'Basic' | 'Standard' | 'Premium';
  description: string;
  delivery_time: number;
  price: number;
  revisions: number;
}

interface Requirement {
  requirement: string;
  required: boolean;
}

interface Gallery {
  images: string[];
  video?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface GigExtra {
  id: number;
  name: string;
  description: string;
  price: number;
  delivery_time: number;
  is_selected: boolean;
}

export const useGigCreation = () => {
  const router = useRouter();
  const { user } = useUser();

  // State for the steps
  const [currentStep, setCurrentStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    category_id: 0,
    subcategory_id: 0,
    tags: [],
    description: '',
    job_type_id: 0,
    city: '',
    country: '',
  });
  const [packages, setPackages] = useState<Package[]>([
    { package_name: 'Basic', description: '', delivery_time: 1, price: 0, revisions: 0 },
    { package_name: 'Standard', description: '', delivery_time: 1, price: 0, revisions: 0 },
    { package_name: 'Premium', description: '', delivery_time: 1, price: 0, revisions: 0 },
  ]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [gallery, setGallery] = useState<Gallery>({ images: [], video: '' });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // New state for gig extras
  const [gigExtras, setGigExtras] = useState<GigExtra[]>([]);
  
  // Map to keep track of selected extras for each package
  const [selectedExtras, setSelectedExtras] = useState<{
    [packageName: string]: { [extraId: number]: boolean };
  }>({
    Basic: {},
    Standard: {},
    Premium: {}
  });

  // Function to handle extra selection
  const toggleExtraSelection = (packageName: 'Basic' | 'Standard' | 'Premium', extraId: number, isSelected: boolean) => {
    setSelectedExtras(prev => ({
      ...prev,
      [packageName]: {
        ...prev[packageName],
        [extraId]: isSelected
      }
    }));
  };

  // Function to add a new gig extra
  const addGigExtra = () => {
    const newExtra: GigExtra = {
      id: Date.now(), // Temporary ID
      name: '',
      description: '',
      price: 5,
      delivery_time: 1,
      is_selected: false
    };
    setGigExtras([...gigExtras, newExtra]);
  };

  // Function to update a gig extra
  const updateGigExtra = (index: number, field: keyof GigExtra, value: any) => {
    const updatedExtras = [...gigExtras];
    updatedExtras[index] = {
      ...updatedExtras[index],
      [field]: value
    };
    setGigExtras(updatedExtras);
  };

  // Function to remove a gig extra
  const removeGigExtra = (index: number) => {
    const filteredExtras = gigExtras.filter((_, i) => i !== index);
    setGigExtras(filteredExtras);
  };

  // Hàm upload file lên Cloudinary
  const uploadFile = async (file: File, type: 'image' | 'video'): Promise<string> => {
    const formData = new FormData();
    formData.append(type === 'image' ? 'image' : 'video', file);

    const response = await fetch('http://localhost:8800/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload ${type}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || `Failed to upload ${type}`);
    }

    return result.imageUrl; // Cloudinary trả về secure_url
  };

  // Chuyển bước tiếp theo
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Quay lại bước trước
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Hàm tạo gig
  const submitGig = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Tạo payload cho bảng gigs
      const gigPayload = {
        seller_clerk_id: user.id, // Lấy từ Clerk
        category_id: basicInfo.category_id,
        job_type_id: basicInfo.job_type_id,
        title: basicInfo.title,
        description: basicInfo.description,
        starting_price: packages[0].price, // Giá khởi điểm lấy từ package Basic
        delivery_time: packages[0].delivery_time, // Thời gian giao hàng từ package Basic
        gig_image: gallery.images[0] || null, // Hình ảnh đầu tiên làm gig_image
        city: basicInfo.city || null,
        country: basicInfo.country || null,
        tags: basicInfo.tags,
      };

      // Gửi yêu cầu tạo gig
      const gigResponse = await fetch('http://localhost:8800/api/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigPayload),
      });

      if (!gigResponse.ok) {
        throw new Error('Failed to create gig');
      }

      const gigResult = await gigResponse.json();
      if (!gigResult.success) {
        throw new Error(gigResult.message || 'Failed to create gig');
      }

      const gigId = gigResult.gig.id;

      // Tạo packages
      const packagePayload = packages.map((pkg) => ({
        gig_id: gigId,
        package_name: pkg.package_name,
        description: pkg.description,
        price: pkg.price,
        delivery_time: pkg.delivery_time,
        revisions: pkg.revisions,
      }));

      await fetch('http://localhost:8800/api/gigPackages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packagePayload),
      });

      // Tạo FAQs
      if (faqs.length > 0) {
        const faqPayload = faqs.map((faq) => ({
          gig_id: gigId,
          question: faq.question,
          answer: faq.answer,
        }));

        await fetch('http://localhost:8800/api/gigFAQs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(faqPayload),
        });
      }

      // Tạo requirement templates
      if (requirements.length > 0) {
        const requirementPayload = {
          gig_id: gigId,
          requirements: requirements.map((req) => ({
            requirement: req.requirement,
            required: req.required,
          })),
        };

        const requirementResponse = await fetch('http://localhost:8800/api/gigReqTemplates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requirementPayload),
        });

        if (!requirementResponse.ok) {
          throw new Error('Failed to create requirement templates');
        }
      }

      // Create gig extras
      if (gigExtras.length > 0) {
        const extrasPayload = gigExtras.map((extra) => ({
          gig_id: gigId,
          name: extra.name,
          description: extra.description || '',
          price: extra.price,
          delivery_time: extra.delivery_time,
          is_selected: extra.is_selected,
        }));

        const extrasResponse = await fetch('http://localhost:8800/api/gigExtras', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(extrasPayload),
        });

        if (!extrasResponse.ok) {
          throw new Error('Failed to create gig extras');
        }
      }

      // Chuyển hướng sau khi tạo thành công
      router.push('/seller-dashboard');
    } catch (err) {
      setError('Failed to create gig. Please try again.');
      console.error('Error submitting gig:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    basicInfo,
    packages,
    requirements,
    gallery,
    faqs,
    gigExtras,
    selectedExtras,
    isSubmitting,
    error,
    setBasicInfo,
    setPackages,
    setRequirements,
    setGallery,
    setFaqs,
    setGigExtras,
    toggleExtraSelection,
    addGigExtra,
    updateGigExtra,
    removeGigExtra,
    nextStep,
    prevStep,
    submitGig,
    uploadFile,
  };
};