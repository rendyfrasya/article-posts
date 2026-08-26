import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; 
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const useEditArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>(); 

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const { data: articleData, isLoading: isLoadingArticle, isError: isErrorArticle } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await api.get<any>(`/article/${id}`);
      return response.data.data || response.data; 
    },
    enabled: !!id, 
  });

  useEffect(() => {
    if (articleData) {
      setTitle(articleData.title || '');
      setContent(articleData.content || '');
      setCategory(articleData.category || '');
    }
  }, [articleData]);

  useEffect(() => {
    if (isErrorArticle) {
      toast.error('Gagal mengambil data artikel atau artikel tidak ditemukan.');
      navigate('/');
    }
  }, [isErrorArticle, navigate]);

  const mutation = useMutation({
    mutationFn: async (payload: { title: string; content: string; category: string; status: 'Publish' | 'Draft' }) => {
      const response = await api.put(`/article/${id}`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message || 'Artikel berhasil diperbarui!');
        queryClient.invalidateQueries({ queryKey: ['items'] });
        queryClient.invalidateQueries({ queryKey: ['article', id] });
        setTimeout(() => {
           navigate('/'); 
        }, 300);
      } else {
         toast.error(data?.message || 'Gagal memperbarui artikel.');
      }
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || 'Terjadi kesalahan pada server.';
      toast.error(errorMsg);
    }
  });

  const handleSubmit = (e: React.FormEvent, status: 'Publish' | 'Draft') => {
    e.preventDefault();
    if (mutation.isPending) return;
    
    if (!title || !content || !category) {
      toast.error('Semua field wajib diisi dengan benar!');
      return;
    }

    const payload = {
      title,
      content,
      category,
      status,
    };

    mutation.mutate(payload);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    isLoadingArticle,
    isPending: mutation.isPending,
    handleSubmit,
  };
};