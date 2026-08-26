import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const useAddArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State form sesuai kebutuhan backend artikel
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  // Definisi Mutation untuk POST data artikel
  const mutation = useMutation({
    mutationFn: async (newArticle: { title: string; content: string; category: string; status: 'Publish' | 'Draft' }) => {
      const response = await api.post('/article', newArticle);
      return response.data;
    },
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message || 'Artikel berhasil dibuat!');
        queryClient.invalidateQueries({ queryKey: ['items'] });
        setTimeout(() => {
           navigate('/'); 
        }, 300);
      } else {
         toast.error(data?.message || 'Gagal membuat artikel.');
      }
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || 'Terjadi kesalahan pada server.';
      toast.error(errorMsg);
    }
  });

  // Handler submit dengan parameter status ('Publish' atau 'Draft')
  const handleSubmit = (e: React.FormEvent, status: 'Publish' | 'Draft') => {
    e.preventDefault();
    if (mutation.isPending) return;
    
    // Validasi sederhana di frontend
    if (!title || !content || !category) {
      toast.error('Semua field wajib diisi!');
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
    isPending: mutation.isPending,
    handleSubmit,
  };
};