import { SignUpProgress } from '@/features/auth/ui/SignUpProgress/SignUpProgress';
import { Step1_UserData } from '@/features/auth/ui/Step1_UserData/Step1_UserData';
import { Step2_PersonalData } from '@/features/auth/ui/Step2_PersonalData/Step2_PersonalData';
import { ProfileFormData } from '@/features/auth/model/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';
import styles from './RegisterPage.module.scss';
import { Step3_SkillData } from '@/features/auth/ui/Step3_SkillData/Step3_SkillData';
interface UserStep1Data {
  email?: string;
  password?: string;
}

interface UserData extends UserStep1Data {
  name?: string;
  birthDate?: Date;
  genderId?: string | null;
  cityId?: string | null;
  avatar?: File | null;
}

interface LearnSkillData {
  categoryId: string | null;
  subcategoryId: string | null;
}

interface TeachSkillData {
  skillTitle: string;
  categoryId: string | null;
  subcategoryId: string | null;
  skillDescription: string;
  skillImageUrl: string[] | null;
}

interface RegisterFormData {
  user: UserData | null;
  learnSkill: LearnSkillData | null;
  teachSkill: TeachSkillData | null;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    user: null,
    learnSkill: null,
    teachSkill: null,
  });

  const handleStep1Submit = (data: UserStep1Data) => {
    setRegisterData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        email: data.email,
        password: data.password,
      },
    }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: ProfileFormData) => {
    setRegisterData((prev) => ({
      ...prev,
      user: {
        email: prev.user?.email,
        password: prev.user?.password,
        name: data.name,
        birthDate: data.birthDate,
        cityId: data.cityId,
        genderId: data.genderId,
        avatar: data.avatar,
      },

      learnSkill: {
        categoryId: data.categoryId.learn,
        subcategoryId: data.subcategoryId.learn,
      },
    }));

    setCurrentStep(3);
  };
  const handlePrevButtonClickStep2 = () => {
    setCurrentStep(1);
  };

  const handlePrevButtonClickStep3 = () => {
    setCurrentStep(2);
  };

  const handleStep3Submit = (data: ProfileFormData) => {
    const finalRegisterData: RegisterFormData = {
      ...registerData,
      teachSkill: {
        categoryId: data.categoryId.teach,
        subcategoryId: data.subcategoryId.teach,
        skillTitle: data.skillTitle,
        skillDescription: data.skillDescription,
        skillImageUrl: data.skillImageUrl,
      },
    };

    //TODO: заменить console.log на dispatch(registerWithSkillsThunk(registerData))
    console.log(finalRegisterData);
    navigate(ROUTES.PROFILE);
  };

  return (
    <main className={styles.page}>
      <SignUpProgress step={currentStep} />
      {currentStep === 1 && <Step1_UserData onSubmit={handleStep1Submit} />}

      {currentStep === 2 && (
        <Step2_PersonalData
          onSubmit={handleStep2Submit}
          onPrevButtonClick={handlePrevButtonClickStep2}
        />
      )}

      {currentStep == 3 && (
        <Step3_SkillData
          onSubmit={handleStep3Submit}
          onPrevButtonClick={handlePrevButtonClickStep3}
        />
      )}
    </main>
  );
};
