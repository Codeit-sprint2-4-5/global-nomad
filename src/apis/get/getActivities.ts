import { GetActivitiesList } from '@/types';
import { instance } from '../axios';

interface getActivitiesType {
  totalCount: number;
  activities: GetActivitiesList[];
}

export const getPopularActivities = async () => {
  const { data } = await instance.get<getActivitiesType>('/activities', {
    params: {
      method: 'offset',
      sort: 'most_reviewed',
      size: 10,
    },
  });
  return data;
};

export const getActivities = async ({ currentPage, currentSize, category='', filter='' }: { currentPage: number, currentSize: number, category: string, filter: string }) => {
  const params: {
    method: string;
    page: number;
    size: number;
    category?: string;
    sort?: string;
  } = {
    method: 'offset',
    page: currentPage,
    size: currentSize,
  };

  if (!!category) {
    params.category = category;
  }

  if (!!filter) {
    params.sort = filter;
  }

  const { data } = await instance.get<getActivitiesType>(`/activities`, { params });
  return data;
};

export const getSearchActivities = async ({ currentPage, currentSize, keyword }: { currentPage: number, currentSize: number, keyword: string }) => {
  const params: {
    method: string;
    page: number;
    size: number;
    keyword?: string;
  } = {
    method: 'offset',
    page: currentPage,
    size: currentSize,
  };

  if (!!keyword) {
    params.keyword = keyword;
  }

  const { data } = await instance.get<getActivitiesType>('/activities', { params });
  return data;
}