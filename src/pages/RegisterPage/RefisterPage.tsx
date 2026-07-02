// import { SignUpProgress } from "@/features/auth/ui/SignUpProgress/SignUpProgress"
// import { Step1_UserData } from "@/features/auth/ui/Step1_UserData/Step1_UserData"
// import { Step2_PersonalData } from "@/features/auth/ui/Step2_PersonalData/Step2_PersonalData"
// import { ProfileFormData } from "@/features/auth/model/types"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { ROUTES } from '@/shared/lib/constants';
// import styles from './RegisterPage.module.scss'
// interface UserStep1Data {
//   email?: string,
//   password?: string
// }

// interface UserData extends UserStep1Data {
//   name?: string;
//   birthData?: Date | undefined;
//   genderId?: string | null;
//   citiId?: string | null;
//   avatar?: File | null;
// }

// interface LearnSkillData {
//   categoryId: string | null;
//   subcategoryId: string | null;
// }

// interface TeachSkillData {
//   name: string;
//   categoryId: string | null;
//   subcategoryId: string | null;
//   description: string;
//   images: File[];
// }

// interface RegisterFormData {
//   user: UserData | null,
//   learnSkill: LearnSkillData | null,
//   teachSkill: TeachSkillData | null,
// }

// export const RegisterPage = () => {
//   const navigate = useNavigate()
//   const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
//   const [registerData, setRegisterData] = useState<RegisterFormData>({
//     user: null,
//     learnSkill: null,
//     teachSkill: null,
//   });

//   const handleStep1Submit = (data: UserStep1Data) => {
//     setRegisterData((prev) => ({
//       ...prev,
//       user: {
//         ...prev.user,
//         email: data.email,
//         password: data.password
//       }
//     }))
//     setCurrentStep(2);
//   }

//   const handleStep2Submit = (data: ProfileFormData ) => {
//     setRegisterData((prev) => ({
//       ...prev,
//       user: {
//         email: prev.user?.email,
//         password: prev.user?.password,
//         name: data.name,
//         birthData: data.birthData,
//         citiId: data.citiId,
//         genderId: data.genderId,
//         avatar: data.avatar,
//       },

//       learnSkill: {
//         categoryId: data.categoryId,
//         subcategoryId: data.subcategoryId
//       }
//     }))
//     setCurrentStep(3)
//   }

//   const handleStep3Submit = (data: TeachSkillData) => {
//   const finalRegisterData: RegisterFormData = {
//     ...registerData,
//     teachSkill: data,
//   };
//   //TODO: заменить console.log на dispatch(registerWithSkillsThunk(registerData))
//   console.log(finalRegisterData);
//   navigate(ROUTES.PROFILE);
// };

//   return (
//     <main className={styles.page}>
//       <SignUpProgress step={currentStep} />
//       {currentStep === 1 && (
//         <Step1_UserData onSubmit={() => {
//           console.log('yo')
//           setCurrentStep(2)
//         }} />
//       )}

//       {currentStep === 2 && (
//         <Step2_PersonalData onSubmit={handleStep2Submit} />
//       )}

//       {currentStep == 3 && (
//         <>
//           <span>Страница в разработке</span>
//         </>
//       )}
//     </main>
//   )
// }
