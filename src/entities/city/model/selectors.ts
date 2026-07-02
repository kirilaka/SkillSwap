import { createSelector } from '@reduxjs/toolkit';
import { selectUsers } from '@/entities/user/model/usersSlice';
import { cities } from './constants';
import { UserInfo } from '@/shared/types';

export const selectAvailableFilterCities = createSelector([selectUsers], (users) => {
  // selectUsers типизирован как User[], но в данных пользователя есть поле city.
  const usersWithCity = users as UserInfo[];
  // В users.json city хранится как название города, поэтому сравниваем с city.name.
  const userCityNames = usersWithCity.map((user) => user.city).filter(Boolean);

  const uniqueCityNames = Array.from(new Set(userCityNames));

  return cities.filter((city) => uniqueCityNames.includes(city.name));
});
