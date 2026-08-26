import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Article } from '../types';

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const getPaginationOptions = (currentPage: number, totalPageCount: number) => {
  if (totalPageCount <= 5) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPageCount];
  }

  if (currentPage >= totalPageCount - 2) {
    return [1, '...', totalPageCount - 3, totalPageCount - 2, totalPageCount - 1, totalPageCount];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPageCount];
};

export const usePreview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery]);

  const { data: queryData, isLoading, isError, isFetching } = useQuery({
    queryKey: ['preview-articles', debouncedSearchQuery, page],
    queryFn: async () => {
      const offset = (page - 1) * limit;
      const params: any = { 
        limit, 
        offset,
        status: 'Publish'
      };
      
      if (debouncedSearchQuery) {
        params.keyword = debouncedSearchQuery;
      }
      
      const response = await api.get<any>('/article', { params });
      const payload = response.data.data; 
      
      return {
        data: payload.data as Article[], 
        total: payload.total,
        limit: payload.limit,
        offset: payload.offset
      };
    },
  });

  const data = queryData?.data || [];
  const totalItems = queryData?.total || 0;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 1;

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    limit,
    data,
    totalItems,
    totalPages,
    isFetching,
    isLoading,
    isError,
  };
};