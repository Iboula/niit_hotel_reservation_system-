import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReservationCard from '../components/ReservationCard';
import { reservationService } from '../services/reservationService';
import { guestService } from '../services/guestService';
import { useAuth } from '../context/AuthContext';
import { Reservation } from '../utils/types';
import '../styles/Reservations.css';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadReservations = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        try {
          const guest = await guestService.getGuestByUserId(user.id);
          const data = await reservationService.getReservationsByGuest(guest.id);
          setReservations(data);
        } catch (error: any) {
          // No guest profile yet or no reservations
          if (error.message === 'No guest found for this user') {
            setReservations([]);
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [user]);

  const handleCancel = async (id: number) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await reservationService.cancelReservation(id);
        toast.success('Reservation cancelled successfully');
        loadReservations();
      } catch (error) {
        toast.error('Failed to cancel reservation');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading reservations...</div>;
  }

  return (
    <div className="reservations-container">
      <h1>My Reservations</h1>
      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>You don't have any reservations yet.</p>
          <a href="/rooms" className="btn btn-primary">Browse Rooms</a>
        </div>
      ) : (
        <div className="reservations-grid">
          {reservations.map(reservation => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
