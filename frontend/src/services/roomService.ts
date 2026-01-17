import apiClient from './apiService';
import { Room, RoomSearchCriteria } from '../utils/types';

export const roomService = {
  async getAllRooms(): Promise<Room[]> {
    const response = await apiClient.get<Room[]>('/rooms');
    return response.data;
  },

  async getRoomById(id: number): Promise<Room> {
    const response = await apiClient.get<Room>(`/rooms/${id}`);
    return response.data;
  },

  async searchRooms(criteria: RoomSearchCriteria): Promise<Room[]> {
    const response = await apiClient.post<Room[]>('/rooms/search', criteria);
    return response.data;
  },

  async getAvailableRooms(checkIn: string, checkOut: string): Promise<Room[]> {
    const response = await apiClient.get<Room[]>('/rooms/available', {
      params: { checkIn, checkOut }
    });
    return response.data;
  },

  async createRoom(room: Omit<Room, 'id'>): Promise<Room> {
    const response = await apiClient.post<Room>('/rooms', room);
    return response.data;
  },

  async updateRoom(id: number, room: Partial<Room>): Promise<Room> {
    const response = await apiClient.put<Room>(`/rooms/${id}`, room);
    return response.data;
  },

  async deleteRoom(id: number): Promise<void> {
    await apiClient.delete(`/rooms/${id}`);
  },

  async updateAvailability(id: number, available: boolean): Promise<Room> {
    const response = await apiClient.patch<Room>(`/rooms/${id}/availability`, null, {
      params: { available }
    });
    return response.data;
  }
};
