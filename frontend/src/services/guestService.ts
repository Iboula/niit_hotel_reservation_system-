import apiClient from './apiService';
import { Guest, GuestRequest } from '../utils/types';

export const guestService = {
  async getAllGuests(): Promise<Guest[]> {
    const response = await apiClient.get<Guest[]>('/guests');
    return response.data;
  },

  async getGuestById(id: number): Promise<Guest> {
    const response = await apiClient.get<Guest>(`/guests/${id}`);
    return response.data;
  },

  async createGuest(guest: GuestRequest): Promise<Guest> {
    const response = await apiClient.post<Guest>('/guests', guest);
    return response.data;
  },

  async updateGuest(id: number, guest: Partial<GuestRequest>): Promise<Guest> {
    const response = await apiClient.put<Guest>(`/guests/${id}`, guest);
    return response.data;
  },

  async deleteGuest(id: number): Promise<void> {
    await apiClient.delete(`/guests/${id}`);
  },

  async getGuestByUserId(userId: number): Promise<Guest> {
    const response = await apiClient.get<Guest[]>(`/guests/user/${userId}`);
    // Return first guest or throw error if no guest found
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    throw new Error('No guest found for this user');
  }
};
