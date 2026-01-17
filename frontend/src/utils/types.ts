export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };
  message?: string;
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  user?: User;
}

export interface GuestRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  userId?: number;
}

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE'
}

export interface Room {
  id: number;
  roomNumber: string;
  roomType: RoomType;
  price: number;
  capacity: number;
  description?: string;
  imageUrl?: string;
  imageUrls?: string;
  isAvailable: boolean;
}

export interface RoomSearchCriteria {
  roomType?: RoomType;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  isAvailable?: boolean;
  checkInDate?: string;
  checkOutDate?: string;
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface Reservation {
  id: number;
  guestId: number;
  guestName: string;
  roomId: number;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfRooms: number;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
}

export interface ReservationRequest {
  guestId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfRooms: number;
  specialRequests?: string;
}
