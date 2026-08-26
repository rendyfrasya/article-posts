// types.ts

export interface Article {
  id?: number | string;
  title: string;
  content: string;
  category: string;
  status: 'Publish' | 'Draft' | 'Thrash';
  created_date?: string;
  updated_date?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  limit?: number;
  offset?: number;
  total?: number;
}