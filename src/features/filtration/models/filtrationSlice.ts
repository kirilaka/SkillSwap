import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExchangeType } from './types';
import { GenderFilter } from './types';
import { RootState } from '@/store';
import { Skill, User } from './types';
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
    toogleCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;

      if (state.selectedCategoryIds.includes(categoryId)) {
        state.selectedCategoryIds = state.selectedCategoryIds.filter((id) => id !== categoryId);
      } else {
        state.selectedCategoryIds.push(categoryId);
      }
    },
    toogleSubcategory: (state, action: PayloadAction<string>) => {
      const subcategoryId = action.payload;

      if (state.selectedSubcategoryIds.includes(subcategoryId)) {
        state.selectedSubcategoryIds = state.selectedSubcategoryIds.filter(
          (id) => id !== subcategoryId,
        );
      } else {
        state.selectedSubcategoryIds.push(subcategoryId);
      }
    },
    setExchangeType: (state, action: PayloadAction<ExchangeType>) => {
      state.exchangeType = action.payload;
    },
    setGender: (state, action: PayloadAction<GenderFilter>) => {
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
  toogleCategory,
  toogleSubcategory,
  setExchangeType,
  setGender,
  setCity,
  setSearchValue,
  resetFilters,
} = filtrationSlice.actions;

export const filtrationReducer = filtrationSlice.reducer;

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
  return Array.from(new Set(users.map((user: User) => user.city).filter(Boolean)));
};

export const selectFilteredSkills = (state: RootState) => {
  const skills = state.skills.items;
  const users = state.users.items;
  const { selectedCategoryIds, selectedSubcategoryIds, exchangeType, gender, city, searchValue } =
    state.filtration;

  return skills.filter((skill: Skill) => {
    const author = users.find((user: User) => user.id === skill.authorId);

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

    if (gender !== 'any' && author?.gender !== gender) {
      return false;
    }

    if (city && author?.city !== city) {
      return false;
    }

    if (searchValue) {
      const value = searchValue.toLowerCase();
      const matchesSearch =
        skill.title.toLowerCase().includes(value) ||
        skill.description.toLowerCase().includes(value) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(value));
      if (!matchesSearch) {
        return false;
      }
    }
    return true;
  });
};
