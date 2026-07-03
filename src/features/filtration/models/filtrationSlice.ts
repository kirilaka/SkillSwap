import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { UserInfo } from '@/shared/types';
import { ExchangeFilterType } from './types';
import { GenderFilterType } from './types';
import { FiltrationState } from './types';
const initialState: FiltrationState = {
  /**Выбранные id основных категорий */
  selectedCategoryIds: [],
  /**Выбранные id подкатегорий */
  selectedSubcategoryIds: [],
  /**Выбранный тип обмена */
  exchangeType: 'all',
  /**Выбранный пол автора */
  gender: 'any',
  /**Выбранный город автора */
  city: '',
  /**Значение поисковой строки */
  searchValue: '',
};

export const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    toggleCategory: (
      state,
      action: PayloadAction<{ categoryId: string; subcategoryIds: string[] }>,
    ) => {
      const { categoryId, subcategoryIds } = action.payload;

      if (state.selectedCategoryIds.includes(categoryId)) {
        state.selectedCategoryIds = state.selectedCategoryIds.filter((id) => id !== categoryId);
        state.selectedSubcategoryIds = state.selectedSubcategoryIds.filter(
          (id) => !subcategoryIds.includes(id),
        );
      } else {
        state.selectedCategoryIds.push(categoryId);
        state.selectedSubcategoryIds = Array.from(
          new Set([...state.selectedSubcategoryIds, ...subcategoryIds]),
        );
      }
    },
    toggleSubcategory: (state, action: PayloadAction<string>) => {
      const subcategoryId = action.payload;

      if (state.selectedSubcategoryIds.includes(subcategoryId)) {
        state.selectedSubcategoryIds = state.selectedSubcategoryIds.filter(
          (id) => id !== subcategoryId,
        );
      } else {
        state.selectedSubcategoryIds.push(subcategoryId);
      }
    },
    setExchangeType: (state, action: PayloadAction<ExchangeFilterType>) => {
      state.exchangeType = action.payload;
    },
    setGender: (state, action: PayloadAction<GenderFilterType>) => {
      state.gender = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  toggleCategory,
  toggleSubcategory,
  setExchangeType,
  setGender,
  setCity,
  setSearchValue,
  resetFilters,
} = filtrationSlice.actions;

export default filtrationSlice.reducer;

export const selectFiltration = (state: RootState) => state.filtration;
export const selectSelectedCategoryIds = (state: RootState) => state.filtration.selectedCategoryIds;
export const selectSelectedSubcategoryIds = (state: RootState) =>
  state.filtration.selectedSubcategoryIds;
export const selectExchangeType = (state: RootState) => state.filtration.exchangeType;
export const selectGender = (state: RootState) => state.filtration.gender;
export const selectCity = (state: RootState) => state.filtration.city;
export const selectSearchValue = (state: RootState) => state.filtration.searchValue;
export const selectAvailableCities = (state: RootState) => {
  const users = state.users.items;
  return Array.from(new Set(users.map((user: UserInfo) => user.city).filter(Boolean)));
};

export const selectFilteredSkills = (state: RootState) => {
  const users = state.users.items;
  const skills = state.skills.items ?? [];

  const { selectedCategoryIds, selectedSubcategoryIds, exchangeType, gender, city, searchValue } =
    state.filtration;

  return skills.filter((skill) => {
    const author = users.find((user) => user.id === skill.authorId);

    if (!author) {
      return false;
    }

    if (selectedCategoryIds.length > 0 && !selectedCategoryIds.includes(skill.categoryId)) {
      return false;
    }

    if (
      selectedSubcategoryIds.length > 0 &&
      !selectedSubcategoryIds.includes(skill.subcategoryId)
    ) {
      return false;
    }

    if (exchangeType !== 'all' && skill.type !== exchangeType) {
      return false;
    }

    if (gender !== 'any' && author.gender !== gender) {
      return false;
    }

    if (city && author.city !== city) {
      return false;
    }

    if (searchValue) {
      const value = searchValue.toLowerCase();

      return (
        skill.title.toLowerCase().includes(value) || skill.description.toLowerCase().includes(value)
      );
    }

    return true;
  });
};
