import React from 'react';
import { Reservation } from '../utils/types';
import '../styles/ReservationCard.css';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (id: number) => void;
  showActions?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, 
  onCancel,
  showActions = true 
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'status-confirmed';
      case 'PENDING': return 'status-pending';
      case 'CANCELLED': return 'status-cancelled';
      case 'COMPLETED': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="reservation-card">
      <div className="reservation-header">
        <h3>Reservation #{reservation.id}</h3>
        <span className={`reservation-status ${getStatusClass(reservation.status)}`}>
          {reservation.status}
        </span>
      </div>
      <div className="reservation-body">
        <p><strong>Room:</strong> {reservation.roomNumber}</p>
        <p><strong>Guest:</strong> {reservation.guestName}</p>
        <p><strong>Check-in:</strong> {new Date(reservation.checkInDate).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> {new Date(reservation.checkOutDate).toLocaleDateString()}</p>
        <p><strong>Total Price:</strong> {reservation.totalPrice.toFixed(2)} CFA</p>
      </div>
      {showActions && reservation.status === 'PENDING' && onCancel && (
        <div className="reservation-footer">
          <button 
            onClick={() => onCancel(reservation.id)} 
            className="btn btn-danger"
          >
            Cancel Reservation
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
