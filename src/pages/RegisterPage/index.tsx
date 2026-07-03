import { SignUpProgress } from '@/features/auth/ui/SignUpProgress/SignUpProgress';
import { Step1_UserData } from '@/features/auth/ui/Step1_UserData/Step1_UserData';
import { Step2_PersonalData } from '@/features/auth/ui/Step2_PersonalData/Step2_PersonalData';
import { ProfileFormData } from '@/features/auth/model/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, SKILL_CATEGORIES } from '@/shared/lib/constants';
import styles from './RegisterPage.module.scss';
import { Step3_SkillData } from '@/features/auth/ui/Step3_SkillData/Step3_SkillData';
import { useAppDispatch } from '@/store/hooks';
import { registerWithSkillsThunk } from '@/features/auth/model/registerWithSkillsThunk';
import { skillsFilterList } from '@/features/filtration/models/artFilter';
export interface UserStep1Data {
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const getAge = (birthDate?: Date) => {
    if (!birthDate) return undefined;

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassed) {
      age -= 1;
    }

    return age;
  };

  const handleStep3Submit = async (data: ProfileFormData) => {
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

    const user = finalRegisterData.user;
    const learnSkill = finalRegisterData.learnSkill;
    const teachSkill = finalRegisterData.teachSkill;

    if (!user || !learnSkill || !teachSkill) {
      return;
    }

    if (!user.name || !user.email || !user.password) {
      return;
    }

    if (user.genderId !== 'male' && user.genderId !== 'female') {
      return;
    }
    const gender: 'male' | 'female' = user.genderId;

    if (!learnSkill.categoryId || !learnSkill.subcategoryId) {
      return;
    }

    if (!teachSkill.categoryId || !teachSkill.subcategoryId) {
      return;
    }
    const avatarUrl = user.avatar ? URL.createObjectURL(user.avatar) : '';

    const skillCategories: SKILL_CATEGORIES[] = [
      'business',
      'art',
      'language',
      'education',
      'home',
      'health',
    ];

    const getSkillCategoryData = (subcategoryId: string | null) => {
      const selectedCategoryBySubcategoryId = skillsFilterList.find((category) =>
        category.subFilters?.some((subcategory) => subcategory.id === subcategoryId),
      );

      const selectedSubcategory = selectedCategoryBySubcategoryId?.subFilters?.find(
        (subcategory) => subcategory.id === subcategoryId,
      );

      return {
        subcategory: selectedSubcategory?.label ?? '',
        subcategoryId: selectedSubcategory?.id ?? subcategoryId ?? '',
      };
    };

    const userPayload = {
      name: user.name,
      email: user.email,
      password: user.password,
      city: user.cityId ?? undefined,
      age: getAge(user.birthDate),
      gender: gender,
      avatarUrl: avatarUrl,
    };
    console.log(userPayload);

    const learnSkillPayload = {
      title: '',
      description: '',
      type: 'learn' as const,
      category: skillCategories[Number(learnSkill.categoryId) - 1],
      categoryId: learnSkill.categoryId,
      subcategory: getSkillCategoryData(learnSkill.subcategoryId).subcategory,
      subcategoryId: getSkillCategoryData(learnSkill.subcategoryId).subcategoryId,
      tags: [],
      imageUrl: null,
    };
    console.log(learnSkillPayload);

    const teachSkillPayload = {
      title: teachSkill.skillTitle,
      description: teachSkill.skillDescription,
      type: 'teach' as const,
      category: skillCategories[Number(teachSkill.categoryId) - 1],
      categoryId: teachSkill.categoryId,
      subcategory: getSkillCategoryData(teachSkill.subcategoryId).subcategory,
      subcategoryId: getSkillCategoryData(teachSkill.subcategoryId).subcategoryId,
      tags: [],
      imageUrl: teachSkill.skillImageUrl,
    };
    console.log(teachSkillPayload);

    await dispatch(
      registerWithSkillsThunk({
        user: userPayload,
        learnSkill: learnSkillPayload,
        teachSkill: teachSkillPayload,
      }),
    ).unwrap();

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
}
