import apiClient from './apiService';

export const imageService = {
  uploadImage: async (file: File): Promise<{ url: string; filename: string; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteImage: async (filename: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/images/${filename}`);
    return response.data;
  },

  getImageUrl: (filename: string): string => {
    return `${apiClient.defaults.baseURL}/images/${filename}`;
  },
};
