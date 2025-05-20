// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Plus, X, Upload, Info } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';
// import { useGigCreation } from '@/hooks/useGigCreation';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { DashboardSidebar } from '@/components/dashboard-sidebar';
// import { GigCreationWizard } from '@/components/gig-creation-wizard';
// import { Card } from '@/components/ui/card';

// interface Category {
//   id: number;
//   name: string;
// }

// interface SubCategory {
//   id: number;
//   name: string;
//   category_id: number;
// }

// interface JobType {
//   id: number;
//   job_type: string;
// }

// export default function CreateGigPage() {
//   const router = useRouter();
//   const { user } = useUser();
//   const {
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
//   } = useGigCreation();

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [jobTypes, setJobTypes] = useState<JobType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesRes, subCategoriesRes, jobTypesRes] = await Promise.all([
//           fetch('http://localhost:8800/api/categories'),
//           fetch('http://localhost:8800/api/subCategories'),
//           fetch('http://localhost:8800/api/job-types'),
//         ]);

//         if (!categoriesRes.ok || !subCategoriesRes.ok || !jobTypesRes.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const categoriesData = await categoriesRes.json();
//         const subCategoriesData = await subCategoriesRes.json();
//         const jobTypesData = await jobTypesRes.json();

//         // Thêm log để debug dữ liệu trả về
//         console.log('Categories Response:', categoriesData);
//         console.log('SubCategories Response:', subCategoriesData);
//         console.log('JobTypes Response:', jobTypesData);

//         if (categoriesData.success && subCategoriesData.success && jobTypesData.success) {
//           setCategories(categoriesData.categories || []);
//           setSubCategories(subCategoriesData.data || []);
//           setJobTypes(jobTypesData.jobTypes || []); // Sửa key từ 'data' thành 'jobTypes'
//         } else {
//           console.error('API response structure:', {
//             categories: categoriesData,
//             subCategories: subCategoriesData,
//             jobTypes: jobTypesData,
//           });
//           throw new Error('API response structure invalid');
//         }
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const steps = [
//     { id: 'overview', title: 'Overview', description: 'Basic information about your gig' },
//     { id: 'pricing', title: 'Pricing', description: 'Set your packages and pricing' },
//     { id: 'description', title: 'Description', description: 'Describe your service in detail' },
//     { id: 'requirements', title: 'Requirements', description: 'What you need from buyers' },
//     { id: 'gallery', title: 'Gallery', description: 'Add images and videos' },
//     { id: 'publish', title: 'Publish', description: 'Review and publish your gig' },
//   ];

//   const handleAddImage = async (file: File) => {
//     if (gallery.images.length < 5) {
//       const imageUrl = await uploadFile(file, 'image');
//       setGallery({ ...gallery, images: [...gallery.images, imageUrl] });
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     const newImages = [...gallery.images];
//     newImages.splice(index, 1);
//     setGallery({ ...gallery, images: newImages });
//   };

//   const filteredSubCategories = subCategories.filter((sub) => sub.category_id === basicInfo.category_id);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main className="flex-1 bg-gray-50 dark:bg-gray-900">
//       <div className="flex min-h-screen flex-col lg:flex-row">
//         <DashboardSidebar />

//         <div className="flex-1 p-6">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold">Create a New Gig</h1>
//             <p className="text-gray-600 dark:text-gray-400">Fill in the details to create your service offering</p>
//             {error && <p className="text-red-500">{error}</p>}
//           </div>

//           <GigCreationWizard
//             steps={steps}
//             currentStep={currentStep}
//             nextStep={nextStep}
//             prevStep={prevStep}
//             submitGig={submitGig}
//             isSubmitting={isSubmitting}
//           >
//             {/* Step 1: Overview */}
//             <div className="space-y-6">
//               <div>
//                 <Label htmlFor="gig-title" className="text-base font-medium">
//                   Gig Title
//                 </Label>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Create a catchy title that describes your service clearly
//                 </p>
//                 <Input
//                   id="gig-title"
//                   placeholder="I will design a professional logo for your business"
//                   className="h-12"
//                   value={basicInfo.title}
//                   onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="category" className="text-base font-medium">
//                   Category
//                 </Label>
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <div>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Main category</p>
//                     <Select
//                       value={basicInfo.category_id ? basicInfo.category_id.toString() : undefined}
//                       onValueChange={(value) => {
//                         const categoryId = parseInt(value);
//                         setBasicInfo({
//                           ...basicInfo,
//                           category_id: categoryId,
//                           subcategory_id: 0, // Reset subcategory khi category thay đổi
//                         });
//                       }}
//                     >
//                       <SelectTrigger id="category">
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {categories.map((category) => (
//                           <SelectItem key={category.id} value={category.id.toString()}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Subcategory</p>
//                     <Select
//                       value={basicInfo.subcategory_id ? basicInfo.subcategory_id.toString() : undefined}
//                       onValueChange={(value) =>
//                         setBasicInfo({ ...basicInfo, subcategory_id: parseInt(value) })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a subcategory" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {filteredSubCategories.length > 0 ? (
//                           filteredSubCategories.map((subCategory) => (
//                             <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
//                               {subCategory.name}
//                             </SelectItem>
//                           ))
//                         ) : (
//                           <SelectItem value="no-subcategories" disabled>
//                             No subcategories available
//                           </SelectItem>
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Job Type</p>
//                     <Select
//                       value={basicInfo.job_type_id ? basicInfo.job_type_id.toString() : undefined}
//                       onValueChange={(value) =>
//                         setBasicInfo({ ...basicInfo, job_type_id: parseInt(value) })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a job type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {jobTypes.length > 0 ? (
//                           jobTypes.map((jobType) => (
//                             <SelectItem key={jobType.id} value={jobType.id.toString()}>
//                               {jobType.job_type}
//                             </SelectItem>
//                           ))
//                         ) : (
//                           <SelectItem value="no-job-types" disabled>
//                             No job types available
//                           </SelectItem>
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="location" className="text-base font-medium">
//                   Location (Optional)
//                 </Label>
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <Input
//                     placeholder="City"
//                     value={basicInfo.city || ''}
//                     onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
//                   />
//                   <Input
//                     placeholder="Country"
//                     value={basicInfo.country || ''}
//                     onChange={(e) => setBasicInfo({ ...basicInfo, country: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="tags" className="text-base font-medium">
//                   Tags
//                 </Label>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Add up to 5 tags that best describe your gig (press Enter after each tag)
//                 </p>
//                 <Input
//                   id="tags"
//                   placeholder="e.g., logo, branding, design"
//                   className="h-12"
//                   value={basicInfo.tags.join(', ')}
//                   onChange={(e) =>
//                     setBasicInfo({
//                       ...basicInfo,
//                       tags: e.target.value.split(',').map((tag) => tag.trim()).slice(0, 5),
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             {/* Step 2: Pricing */}
//             <div>
//               <h3 className="mb-4 text-lg font-medium">Packages & Pricing</h3>
//               <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
//                 Set up your service packages with different features and price points
//               </p>

//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[800px] border-collapse">
//                   <thead>
//                     <tr className="border-b text-left">
//                       <th className="p-3"></th>
//                       <th className="p-3 text-center">Basic</th>
//                       <th className="p-3 text-center">Standard</th>
//                       <th className="p-3 text-center">Premium</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="border-b">
//                       <td className="p-3 font-medium">Package Name</td>
//                       {['Basic', 'Standard', 'Premium'].map((name, index) => (
//                         <td key={name} className="p-3">
//                           <Input
//                             placeholder={name}
//                             className="text-center"
//                             value={packages[index]?.package_name || name}
//                             onChange={(e) => {
//                               const newPackages = [...packages];
//                               newPackages[index] = {
//                                 ...newPackages[index],
//                                 package_name: e.target.value as 'Basic' | 'Standard' | 'Premium',
//                               };
//                               setPackages(newPackages);
//                             }}
//                             required
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-3 font-medium">Description</td>
//                       {['Basic', 'Standard', 'Premium'].map((name, index) => (
//                         <td key={name} className="p-3">
//                           <Textarea
//                             placeholder={`${name} package description`}
//                             className="h-20 resize-none text-center"
//                             value={packages[index]?.description || ''}
//                             onChange={(e) => {
//                               const newPackages = [...packages];
//                               newPackages[index] = { ...newPackages[index], description: e.target.value };
//                               setPackages(newPackages);
//                             }}
//                             required
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-3 font-medium">Delivery Time</td>
//                       {['Basic', 'Standard', 'Premium'].map((name, index) => (
//                         <td key={name} className="p-3">
//                           <Select
//                             value={packages[index]?.delivery_time.toString()}
//                             onValueChange={(value) => {
//                               const newPackages = [...packages];
//                               newPackages[index] = { ...newPackages[index], delivery_time: parseInt(value) };
//                               setPackages(newPackages);
//                             }}
//                           >
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="1">1 day</SelectItem>
//                               <SelectItem value="2">2 days</SelectItem>
//                               <SelectItem value="3">3 days</SelectItem>
//                               <SelectItem value="5">5 days</SelectItem>
//                               <SelectItem value="7">7 days</SelectItem>
//                               <SelectItem value="14">14 days</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </td>
//                       ))}
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-3 font-medium">Price ($)</td>
//                       {['Basic', 'Standard', 'Premium'].map((name, index) => (
//                         <td key={name} className="p-3">
//                           <Input
//                             type="number"
//                             min="5"
//                             placeholder={name === 'Basic' ? '25' : name === 'Standard' ? '50' : '100'}
//                             className="text-center"
//                             value={packages[index]?.price || ''}
//                             onChange={(e) => {
//                               const newPackages = [...packages];
//                               newPackages[index] = { ...newPackages[index], price: parseFloat(e.target.value) };
//                               setPackages(newPackages);
//                             }}
//                             required
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-3 font-medium">Revisions</td>
//                       {['Basic', 'Standard', 'Premium'].map((name, index) => (
//                         <td key={name} className="p-3">
//                           <Input
//                             type="number"
//                             min="0"
//                             placeholder="0"
//                             className="text-center"
//                             value={packages[index]?.revisions || 0}
//                             onChange={(e) => {
//                               const newPackages = [...packages];
//                               newPackages[index] = { ...newPackages[index], revisions: parseInt(e.target.value) };
//                               setPackages(newPackages);
//                             }}
//                             required
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Step 3: Description */}
//             <div className="space-y-6">
//               <div>
//                 <Label htmlFor="gig-description" className="text-base font-medium">
//                   Gig Description
//                 </Label>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Provide a detailed description of your service (min 120 characters)
//                 </p>
//                 <Textarea
//                   id="gig-description"
//                   placeholder="Describe your service in detail..."
//                   className="min-h-[200px]"
//                   value={basicInfo.description}
//                   onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="gig-faq" className="text-base font-medium">
//                   Frequently Asked Questions
//                 </Label>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Add questions and answers to help buyers understand your service better
//                 </p>
//                 <div className="space-y-4">
//                   {faqs.map((faq, index) => (
//                     <div key={index} className="rounded-md border p-4 dark:border-gray-700">
//                       <div className="mb-3">
//                         <Label htmlFor={`faq-question-${index}`}>Question</Label>
//                         <Input
//                           id={`faq-question-${index}`}
//                           placeholder="e.g., How many revisions do you offer?"
//                           className="mb-2"
//                           value={faq.question}
//                           onChange={(e) => {
//                             const newFaqs = [...faqs];
//                             newFaqs[index] = { ...faq, question: e.target.value };
//                             setFaqs(newFaqs);
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
//                         <Textarea
//                           id={`faq-answer-${index}`}
//                           placeholder="Provide a detailed answer..."
//                           className="min-h-[100px]"
//                           value={faq.answer}
//                           onChange={(e) => {
//                             const newFaqs = [...faqs];
//                             newFaqs[index] = { ...faq, answer: e.target.value };
//                             setFaqs(newFaqs);
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
//                   >
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Another FAQ
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Step 4: Requirements */}
//             <div className="space-y-6">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Label htmlFor="requirements" className="text-base font-medium">
//                     Buyer Requirements
//                   </Label>
//                   <div className="group relative">
//                     <Info className="h-4 w-4 text-gray-400" />
//                     <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-md border bg-white p-3 text-sm shadow-md group-hover:block dark:border-gray-700 dark:bg-gray-800">
//                       Ask buyers for information you need to start working on their order.
//                     </div>
//                   </div>
//                 </div>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Specify what information you need from buyers to get started
//                 </p>
//                 <div className="space-y-4">
//                   {requirements.map((req, index) => (
//                     <div key={index} className="rounded-md border p-4 dark:border-gray-700">
//                       <div className="mb-3">
//                         <Label htmlFor={`requirement-${index}`}>Requirement</Label>
//                         <Input
//                           id={`requirement-${index}`}
//                           placeholder="e.g., What is your brand name and industry?"
//                           className="mb-2"
//                           value={req.requirement}
//                           onChange={(e) => {
//                             const newRequirements = [...requirements];
//                             newRequirements[index] = { ...req, requirement: e.target.value };
//                             setRequirements(newRequirements);
//                           }}
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Switch
//                           id={`required-${index}`}
//                           checked={req.required}
//                           onCheckedChange={(checked) => {
//                             const newRequirements = [...requirements];
//                             newRequirements[index] = { ...req, required: checked };
//                             setRequirements(newRequirements);
//                           }}
//                         />
//                         <Label htmlFor={`required-${index}`}>Required</Label>
//                       </div>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => setRequirements([...requirements, { requirement: '', required: true }])}
//                   >
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Another Requirement
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Step 5: Gallery */}
//             <div className="space-y-6">
//               <div>
//                 <Label className="text-base font-medium">Gig Images</Label>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Upload high-quality images that showcase your service (max 5 images)
//                 </p>
//                 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
//                   {gallery.images.map((image, index) => (
//                     <div key={index} className="relative aspect-video rounded-md border dark:border-gray-700">
//                       <Image
//                         src={image || '/placeholder.svg'}
//                         alt={`Gig image ${index + 1}`}
//                         fill
//                         className="rounded-md object-cover"
//                       />
//                       <button
//                         type="button"
//                         className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-md dark:bg-gray-800"
//                         onClick={() => handleRemoveImage(index)}
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                   {gallery.images.length < 5 && (
//                     <button
//                       type="button"
//                       className="flex aspect-video items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
//                       onClick={() => {
//                         const input = document.createElement('input');
//                         input.type = 'file';
//                         input.accept = 'image/*';
//                         input.onchange = (e) => {
//                           const file = (e.target as HTMLInputElement).files?.[0];
//                           if (file) {
//                             handleAddImage(file);
//                           }
//                         };
//                         input.click();
//                       }}
//                     >
//                       <Plus className="h-6 w-6 text-gray-400" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="gig-video" className="text-base font-medium">
//                   Gig Video (Optional)
//                 </Label>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   Upload a video that demonstrates your service (max 75MB, mp4 format)
//                 </p>
//                 <div className="flex aspect-video flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
//                   {gallery.video ? (
//                     <video src={gallery.video} controls className="h-full w-full object-cover rounded-md" />
//                   ) : (
//                     <>
//                       <Upload className="mb-2 h-8 w-8 text-gray-400" />
//                       <p className="mb-1 text-sm font-medium">Drag and drop a video file</p>
//                       <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">or</p>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           const input = document.createElement('input');
//                           input.type = 'file';
//                           input.accept = 'video/mp4';
//                           input.onchange = async (e) => {
//                             const file = (e.target as HTMLInputElement).files?.[0];
//                             if (file) {
//                               const videoUrl = await uploadFile(file, 'video');
//                               setGallery({ ...gallery, video: videoUrl });
//                             }
//                           };
//                           input.click();
//                         }}
//                       >
//                         Browse Files
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Step 6: Publish */}
//             <div className="space-y-6">
//               <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
//                 <div className="flex items-start gap-3">
//                   <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
//                   <div>
//                     <h4 className="font-medium text-blue-700 dark:text-blue-400">Ready to publish!</h4>
//                     <p className="text-sm text-blue-600 dark:text-blue-300">
//                       Review all the information you've provided before publishing your gig. Once published, your gig
//                       will be visible to potential buyers.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Gig Summary</h3>
//                 <div className="rounded-lg border p-4 dark:border-gray-700">
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Title:</span>
//                     <span>{basicInfo.title}</span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Category:</span>
//                     <span>
//                       {categories.find((c) => c.id === basicInfo.category_id)?.name} &gt;{' '}
//                       {subCategories?.find((s) => s.id === basicInfo.subcategory_id)?.name || 'Not selected'}
//                     </span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Job Type:</span>
//                     <span>{jobTypes.find((jt) => jt.id === basicInfo.job_type_id)?.job_type || 'Not selected'}</span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Basic Package:</span>
//                     <span>${packages[0]?.price || 0}</span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Delivery Time:</span>
//                     <span>{packages[0]?.delivery_time || 0} days</span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Images:</span>
//                     <span>{gallery.images.length} uploaded</span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">Video:</span>
//                     <span>{gallery.video ? 'Uploaded' : 'Not uploaded'}</span>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <span className="font-medium">FAQs:</span>
//                     <span>{faqs.length} added</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Switch id="terms" required />
//                   <Label htmlFor="terms">
//                     I agree to the Terms of Service and understand that my gig must be approved before it appears in
//                     search results.
//                   </Label>
//                 </div>
//               </div>
//             </div>
//           </GigCreationWizard>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, X, Upload, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useGigCreation } from '@/hooks/useGigCreation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { GigCreationWizard } from '@/components/gig-creation-wizard';
import { Card } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

interface JobType {
  id: number;
  job_type: string;
}

interface GigExtra {
  id: number;
  name: string;
  description: string;
  price: number;
  delivery_time: number;
  is_selected: boolean;
}

export default function CreateGigPage() {
  const router = useRouter();
  const { user } = useUser();
  const {
    currentStep,
    basicInfo,
    packages,
    requirements,
    gallery,
    faqs,
    gigExtras,
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
  } = useGigCreation();

  const [categories, setCategories] = useState<Category[]>([]);
 
 
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraDeliveryDays, setExtraDeliveryDays] = useState<{[key: string]: number}>({});

  // State for selected extra services
  const [selectedExtras, setSelectedExtras] = useState<{ [key: number]: { price: number; delivery_time: number } }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subCategoriesRes, jobTypesRes] = await Promise.all([
          fetch('http://localhost:8800/api/categories'),
          fetch('http://localhost:8800/api/subCategories'),
          fetch('http://localhost:8800/api/job-types'),
        ]);

        if (!categoriesRes.ok || !subCategoriesRes.ok || !jobTypesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const categoriesData = await categoriesRes.json();
        const subCategoriesData = await subCategoriesRes.json();
        const jobTypesData = await jobTypesRes.json();

        // Thêm log để debug dữ liệu trả về
        console.log('Categories Response:', categoriesData);
        console.log('SubCategories Response:', subCategoriesData);
        console.log('JobTypes Response:', jobTypesData);

        if (categoriesData.success && subCategoriesData.success && jobTypesData.success) {
          setCategories(categoriesData.categories || []);
          setSubCategories(subCategoriesData.data || []);
          setJobTypes(jobTypesData.jobTypes || []); // Sửa key từ 'data' thành 'jobTypes'
        } else {
          console.error('API response structure:', {
            categories: categoriesData,
            subCategories: subCategoriesData,
            jobTypes: jobTypesData,
          });
          throw new Error('API response structure invalid');
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

//   useEffect(() => {
//   const fetchGigExtras = async () => {
//     const gigId = 1; // hoặc dynamic ID nếu có
//     try {
//       const res = await fetch(`http://localhost:8800/api/gigExtras/${gigId}`);
//       const data = await res.json();
//       // Kiểm tra nếu data là mảng mới set
//       if (Array.isArray(data)) {
//         setGigExtras(data);
//       } else {
//         console.error("GigExtras API did not return an array", data);
//         setGigExtras([]);
//       }
//     } catch (error) {
//       console.error('Failed to fetch extras:', error);
//       setGigExtras([]); // fallback để tránh lỗi render
//     }
//   };

//   fetchGigExtras();
// }, []);

  const steps = [
    { id: 'overview', title: 'Overview', description: 'Basic information about your gig' },
    { id: 'pricing', title: 'Pricing', description: 'Set your packages and pricing' },
    { id: 'description', title: 'Description', description: 'Describe your service in detail' },
    { id: 'requirements', title: 'Requirements', description: 'What you need from buyers' },
    { id: 'gallery', title: 'Gallery', description: 'Add images and videos' },
    { id: 'publish', title: 'Publish', description: 'Review and publish your gig' },
  ];

  const handleAddImage = async (file: File) => {
    if (gallery.images.length < 5) {
      const imageUrl = await uploadFile(file, 'image');
      setGallery({ ...gallery, images: [...gallery.images, imageUrl] });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...gallery.images];
    newImages.splice(index, 1);
    setGallery({ ...gallery, images: newImages });
  };

  const filteredSubCategories = subCategories.filter((sub) => sub.category_id === basicInfo.category_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create a New Gig</h1>
            <p className="text-gray-600 dark:text-gray-400">Fill in the details to create your service offering</p>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <GigCreationWizard
            steps={steps}
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            submitGig={submitGig}
            isSubmitting={isSubmitting}
          >
            {/* Step 1: Overview */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="gig-title" className="text-base font-medium">
                  Gig Title
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Create a catchy title that describes your service clearly
                </p>
                <Input
                  id="gig-title"
                  placeholder="I will design a professional logo for your business"
                  className="h-12"
                  value={basicInfo.title}
                  onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Category
                </Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Main category</p>
                    <Select
                      value={basicInfo.category_id ? basicInfo.category_id.toString() : undefined}
                      onValueChange={(value) => {
                        const categoryId = parseInt(value);
                        setBasicInfo({
                          ...basicInfo,
                          category_id: categoryId,
                          subcategory_id: 0, // Reset subcategory khi category thay đổi
                        });
                      }}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Subcategory</p>
                    <Select
                      value={basicInfo.subcategory_id ? basicInfo.subcategory_id.toString() : undefined}
                      onValueChange={(value) =>
                        setBasicInfo({ ...basicInfo, subcategory_id: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSubCategories.length > 0 ? (
                          filteredSubCategories.map((subCategory) => (
                            <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
                              {subCategory.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-subcategories" disabled>
                            No subcategories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Job Type</p>
                    <Select
                      value={basicInfo.job_type_id ? basicInfo.job_type_id.toString() : undefined}
                      onValueChange={(value) =>
                        setBasicInfo({ ...basicInfo, job_type_id: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.length > 0 ? (
                          jobTypes.map((jobType) => (
                            <SelectItem key={jobType.id} value={jobType.id.toString()}>
                              {jobType.job_type}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-job-types" disabled>
                            No job types available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Location (Optional)
                </Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="City"
                    value={basicInfo.city || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
                  />
                  <Input
                    placeholder="Country"
                    value={basicInfo.country || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, country: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags" className="text-base font-medium">
                  Tags
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Add up to 5 tags that best describe your gig (press Enter after each tag)
                </p>
                <Input
                  id="tags"
                  placeholder="e.g., logo, branding, design"
                  className="h-12"
                  value={basicInfo.tags.join(', ')}
                  onChange={(e) =>
                    setBasicInfo({
                      ...basicInfo,
                      tags: e.target.value.split(',').map((tag) => tag.trim()).slice(0, 5),
                    })
                  }
                />
              </div>
            </div>

            {/* Step 2: Pricing */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Packages & Pricing</h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Set up your service packages with different features and price points
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-3"></th>
                      <th className="p-3 text-center">Basic</th>
                      <th className="p-3 text-center">Standard</th>
                      <th className="p-3 text-center">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Package Name</td>
                      {['Basic', 'Standard', 'Premium'].map((name, index) => (
                        <td key={name} className="p-3">
                          <Input
                            placeholder={name}
                            className="text-center"
                            value={packages[index]?.package_name || name}
                            onChange={(e) => {
                              const newPackages = [...packages];
                              newPackages[index] = {
                                ...newPackages[index],
                                package_name: e.target.value as 'Basic' | 'Standard' | 'Premium',
                              };
                              setPackages(newPackages);
                            }}
                            required
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Description</td>
                      {['Basic', 'Standard', 'Premium'].map((name, index) => (
                        <td key={name} className="p-3">
                          <Textarea
                            placeholder={`${name} package description`}
                            className="h-20 resize-none text-center"
                            value={packages[index]?.description || ''}
                            onChange={(e) => {
                              const newPackages = [...packages];
                              newPackages[index] = { ...newPackages[index], description: e.target.value };
                              setPackages(newPackages);
                            }}
                            required
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Delivery Time</td>
                      {['Basic', 'Standard', 'Premium'].map((name, index) => (
                        <td key={name} className="p-3">
                          <Select
                            value={packages[index]?.delivery_time.toString()}
                            onValueChange={(value) => {
                              const newPackages = [...packages];
                              newPackages[index] = { ...newPackages[index], delivery_time: parseInt(value) };
                              setPackages(newPackages);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 day</SelectItem>
                              <SelectItem value="2">2 days</SelectItem>
                              <SelectItem value="3">3 days</SelectItem>
                              <SelectItem value="5">5 days</SelectItem>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="14">14 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Price ($)</td>
                      {['Basic', 'Standard', 'Premium'].map((name, index) => (
                        <td key={name} className="p-3">
                          <Input
                            type="number"
                            min="5"
                            placeholder={name === 'Basic' ? '25' : name === 'Standard' ? '50' : '100'}
                            className="text-center"
                            value={packages[index]?.price || ''}
                            onChange={(e) => {
                              const newPackages = [...packages];
                              newPackages[index] = { ...newPackages[index], price: parseFloat(e.target.value) };
                              setPackages(newPackages);
                            }}
                            required
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Revisions</td>
                      {['Basic', 'Standard', 'Premium'].map((name, index) => (
                        <td key={name} className="p-3">
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            className="text-center"
                            value={packages[index]?.revisions || 0}
                            onChange={(e) => {
                              const newPackages = [...packages];
                              newPackages[index] = { ...newPackages[index], revisions: parseInt(e.target.value) };
                              setPackages(newPackages);
                            }}
                            required
                          />
                        </td>
                        
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div> 
              {/* Extra Services Section */}
              <div>
              <h3 className="mb-4 text-lg font-medium">Gig Extras (Optional)</h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Add optional extras to your gig (e.g., fast delivery, extra revisions)
              </p>
              {gigExtras.map((extra, index) => (
                <div key={index} className="grid gap-4 md:grid-cols-3 mb-4">
                  <Input
                    placeholder="Extra Title (e.g., Fast Delivery)"
                    value={extra.name}
                    onChange={(e) => {
                      const newExtras = [...gigExtras];
                      newExtras[index].name = e.target.value;
                      setGigExtras(newExtras);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Price ($)"
                    value={extra.price}
                    onChange={(e) => {
                      const newExtras = [...gigExtras];
                      newExtras[index].price = parseFloat(e.target.value);
                      setGigExtras(newExtras);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Extra Delivery Time (days)"
                    value={extra.delivery_time || ''}
                    onChange={(e) => {
                      const newExtras = [...gigExtras];
                      newExtras[index].delivery_time = parseInt(e.target.value);
                      setGigExtras(newExtras);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setGigExtras([
                    ...gigExtras,
                    {
                      id: Date.now(), // Temporary unique id
                      name: '',
                      description: '',
                      price: 0,
                      delivery_time: 0,
                      is_selected: false,
                    },
                  ])
                }
              >
                Add Extra
              </Button>
            </div>

            </div>

            {/* Step 3: Description */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="gig-description" className="text-base font-medium">
                  Gig Description
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Provide a detailed description of your service (min 120 characters)
                </p>
                <Textarea
                  id="gig-description"
                  placeholder="Describe your service in detail..."
                  className="min-h-[200px]"
                  value={basicInfo.description}
                  onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="gig-faq" className="text-base font-medium">
                  Frequently Asked Questions
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Add questions and answers to help buyers understand your service better
                </p>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="rounded-md border p-4 dark:border-gray-700">
                      <div className="mb-3">
                        <Label htmlFor={`faq-question-${index}`}>Question</Label>
                        <Input
                          id={`faq-question-${index}`}
                          placeholder="e.g., How many revisions do you offer?"
                          className="mb-2"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[index] = { ...faq, question: e.target.value };
                            setFaqs(newFaqs);
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
                        <Textarea
                          id={`faq-answer-${index}`}
                          placeholder="Provide a detailed answer..."
                          className="min-h-[100px]"
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[index] = { ...faq, answer: e.target.value };
                            setFaqs(newFaqs);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another FAQ
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 4: Requirements */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="requirements" className="text-base font-medium">
                    Buyer Requirements
                  </Label>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-gray-400" />
                    <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-md border bg-white p-3 text-sm shadow-md group-hover:block dark:border-gray-700 dark:bg-gray-800">
                      Ask buyers for information you need to start working on their order.
                    </div>
                  </div>
                </div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Specify what information you need from buyers to get started
                </p>
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="rounded-md border p-4 dark:border-gray-700">
                      <div className="mb-3">
                        <Label htmlFor={`requirement-${index}`}>Requirement</Label>
                        <Input
                          id={`requirement-${index}`}
                          placeholder="e.g., What is your brand name and industry?"
                          className="mb-2"
                          value={req.requirement}
                          onChange={(e) => {
                            const newRequirements = [...requirements];
                            newRequirements[index] = { ...req, requirement: e.target.value };
                            setRequirements(newRequirements);
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`required-${index}`}
                          checked={req.required}
                          onCheckedChange={(checked) => {
                            const newRequirements = [...requirements];
                            newRequirements[index] = { ...req, required: checked };
                            setRequirements(newRequirements);
                          }}
                        />
                        <Label htmlFor={`required-${index}`}>Required</Label>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setRequirements([...requirements, { requirement: '', required: true }])}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Requirement
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 5: Gallery */}
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Gig Images</Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload high-quality images that showcase your service (max 5 images)
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {gallery.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-md border dark:border-gray-700">
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`Gig image ${index + 1}`}
                        fill
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-md dark:bg-gray-800"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {gallery.images.length < 5 && (
                    <button
                      type="button"
                      className="flex aspect-video items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleAddImage(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="gig-video" className="text-base font-medium">
                  Gig Video (Optional)
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload a video that demonstrates your service (max 75MB, mp4 format)
                </p>
                <div className="flex aspect-video flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                  {gallery.video ? (
                    <video src={gallery.video} controls className="h-full w-full object-cover rounded-md" />
                  ) : (
                    <>
                      <Upload className="mb-2 h-8 w-8 text-gray-400" />
                      <p className="mb-1 text-sm font-medium">Drag and drop a video file</p>
                      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">or</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'video/mp4';
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const videoUrl = await uploadFile(file, 'video');
                              setGallery({ ...gallery, video: videoUrl });
                            }
                          };
                          input.click();
                        }}
                      >
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Step 6: Publish */}
            <div className="space-y-6">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-400">Ready to publish!</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Review all the information you've provided before publishing your gig. Once published, your gig
                      will be visible to potential buyers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gig Summary</h3>
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Title:</span>
                    <span>{basicInfo.title}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>
                      {categories.find((c) => c.id === basicInfo.category_id)?.name} &gt;{' '}
                      {subCategories?.find((s) => s.id === basicInfo.subcategory_id)?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Job Type:</span>
                    <span>{jobTypes.find((jt) => jt.id === basicInfo.job_type_id)?.job_type || 'Not selected'}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Basic Package:</span>
                    <span>${packages[0]?.price || 0}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Delivery Time:</span>
                    <span>{packages[0]?.delivery_time || 0} days</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Images:</span>
                    <span>{gallery.images.length} uploaded</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Video:</span>
                    <span>{gallery.video ? 'Uploaded' : 'Not uploaded'}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">FAQs:</span>
                    <span>{faqs.length} added</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="terms" required />
                  <Label htmlFor="terms">
                    I agree to the Terms of Service and understand that my gig must be approved before it appears in
                    search results.
                  </Label>
                </div>
              </div>
            </div>
          </GigCreationWizard>
        </div>
      </div>
    </main>
  );
}