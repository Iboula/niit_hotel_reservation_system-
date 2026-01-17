import apiClient from './apiService';
import { Reservation, ReservationRequest } from '../utils/types';

export const reservationService = {
  async getAllReservations(): Promise<Reservation[]> {
    const response = await apiClient.get<Reservation[]>('/reservations');
    return response.data;
  },

  async getReservationById(id: number): Promise<Reservation> {
    const response = await apiClient.get<Reservation>(`/reservations/${id}`);
    return response.data;
  },

  async createReservation(reservation: ReservationRequest): Promise<Reservation> {
    const response = await apiClient.post<Reservation>('/reservations', reservation);
    return response.data;
  },

  async updateReservation(id: number, reservation: Partial<ReservationRequest>): Promise<Reservation> {
    const response = await apiClient.put<Reservation>(`/reservations/${id}`, reservation);
    return response.data;
  },

  async cancelReservation(id: number): Promise<Reservation> {
    const response = await apiClient.put<Reservation>(`/reservations/${id}/cancel`);
    return response.data;
  },

  async confirmReservation(id: number): Promise<Reservation> {
    const response = await apiClient.put<Reservation>(`/reservations/${id}/confirm`);
    return response.data;
  },

  async getReservationsByGuest(guestId: number): Promise<Reservation[]> {
    const response = await apiClient.get<Reservation[]>(`/reservations/guest/${guestId}`);
    return response.data;
  },

  async getReservationsByRoom(roomId: number): Promise<Reservation[]> {
    const response = await apiClient.get<Reservation[]>(`/reservations/room/${roomId}`);
    return response.data;
  }
};
