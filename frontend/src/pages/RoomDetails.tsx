import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { roomService } from '../services/roomService';
import { guestService } from '../services/guestService';
import { reservationService } from '../services/reservationService';
import { useAuth } from '../context/AuthContext';
import { Room, Guest, ReservationRequest } from '../utils/types';
import '../styles/RoomDetails.css';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Omit<ReservationRequest, 'guestId' | 'roomId'>>();

  const getImageUrls = (room: Room): string[] => {
    if (room.imageUrls) {
      try {
        return JSON.parse(room.imageUrls);
      } catch (e) {
        console.error('Error parsing imageUrls:', e);
      }
    }
    return room.imageUrl ? [room.imageUrl] : [];
  };

  const images = room ? getImageUrls(room) : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (id) {
          const roomData = await roomService.getRoomById(parseInt(id));
          setRoom(roomData);
        }
        
        if (user?.id) {
          try {
            const guestData = await guestService.getGuestByUserId(user.id);
            setGuest(guestData);
          } catch (error) {
            // Guest profile doesn't exist yet
            console.log('Guest profile not found');
          }
        }
      } catch (error) {
        toast.error('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, user]);

  const calculateTotalPrice = () => {
    const checkIn = watch('checkInDate');
    const checkOut = watch('checkOutDate');
    const numberOfRooms = watch('numberOfRooms');
    
    if (checkIn && checkOut && room && numberOfRooms) {
      const days = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days * room.price * numberOfRooms : 0;
    }
    return 0;
  };

  const onSubmit = async (data: Omit<ReservationRequest, 'guestId' | 'roomId'>) => {
    if (!isAuthenticated) {
      toast.error('Please login to make a reservation');
      navigate('/login');
      return;
    }

    if (!room) return;

    try {
      let guestId = guest?.id;

      // Create guest profile if it doesn't exist
      if (!guestId && user) {
        console.log('Creating guest profile for user:', user);
        
        const firstName = user.firstName || user.username.split('.')[0] || 'Guest';
        const lastName = user.lastName || user.username.split('.')[1] || 'User';
        
        const newGuest = await guestService.createGuest({
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          phoneNumber: '+221-000-0000', // Default phone number
          address: 'Dakar, Sénégal',
          userId: user.id,
        });
        console.log('Guest created:', newGuest);
        guestId = newGuest.id;
        setGuest(newGuest);
      }

      if (!guestId) {
        toast.error('Unable to create guest profile');
        return;
      }

      const reservation: ReservationRequest = {
        ...data,
        guestId: guestId,
        roomId: room.id,
      };

      console.log('Creating reservation:', reservation);
      await reservationService.createReservation(reservation);
      toast.success('Reservation created successfully!');
      navigate('/reservations');
    } catch (error: any) {
      console.error('Reservation error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create reservation';
      if (errorMessage.includes('not available')) {
        toast.error(`This room is not available for the selected dates. Please choose different dates or another room.`);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!room) {
    return <div className="error">Room not found</div>;
  }

  const totalPrice = calculateTotalPrice();

  return (
    <div className="room-details-container">
      <div className="room-details">
        <h1>Room {room.roomNumber}</h1>
        {images.length > 0 && (
          <div className="room-image-carousel">
            <div className="room-image">
              <img src={images[currentImageIndex]} alt={`Room ${room.roomNumber} - Image ${currentImageIndex + 1}`} />
            </div>
            {images.length > 1 && (
              <>
                <button className="carousel-btn prev" onClick={previousImage}>
                  ❮
                </button>
                <button className="carousel-btn next" onClick={nextImage}>
                  ❯
                </button>
                <div className="carousel-indicators">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <div className="room-info">
          <div className="info-section">
            <h2>Room Information</h2>
            <p><strong>Type:</strong> {room.roomType}</p>
            <p><strong>Capacity:</strong> {room.capacity} guests</p>
            <p><strong>Price:</strong> {room.price} CFA per night</p>
            <p><strong>Status:</strong> 
              <span className={`status ${room.isAvailable ? 'available' : 'unavailable'}`}>
                {room.isAvailable ? ' Available' : ' Unavailable'}
              </span>
            </p>
            {room.description && (
              <>
                <h3>Description</h3>
                <p>{room.description}</p>
              </>
            )}
          </div>

          {room.isAvailable && isAuthenticated && (
            <div className="reservation-section">
              <h2>Make a Reservation</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="checkInDate">Check-in Date</label>
                  <input
                    id="checkInDate"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('checkInDate', { required: 'Check-in date is required' })}
                    className={errors.checkInDate ? 'error' : ''}
                  />
                  {errors.checkInDate && <span className="error-message">{errors.checkInDate.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="checkOutDate">Check-out Date</label>
                  <input
                    id="checkOutDate"
                    type="date"
                    min={watch('checkInDate') || new Date().toISOString().split('T')[0]}
                    {...register('checkOutDate', { 
                      required: 'Check-out date is required',
                      validate: value => new Date(value) > new Date(watch('checkInDate')) || 'Check-out must be after check-in'
                    })}
                    className={errors.checkOutDate ? 'error' : ''}
                  />
                  {errors.checkOutDate && <span className="error-message">{errors.checkOutDate.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="numberOfGuests">Number of Guests</label>
                  <input
                    id="numberOfGuests"
                    type="number"
                    min="1"
                    max={room.capacity}
                    {...register('numberOfGuests', { 
                      required: 'Number of guests is required',
                      valueAsNumber: true,
                      min: { value: 1, message: 'At least 1 guest required' },
                      max: { value: room.capacity, message: `Maximum ${room.capacity} guests allowed` }
                    })}
                    className={errors.numberOfGuests ? 'error' : ''}
                  />
                  {errors.numberOfGuests && <span className="error-message">{errors.numberOfGuests.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="numberOfRooms">Number of Rooms</label>
                  <input
                    id="numberOfRooms"
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    {...register('numberOfRooms', { 
                      required: 'Number of rooms is required',
                      valueAsNumber: true,
                      min: { value: 1, message: 'At least 1 room required' },
                      max: { value: 10, message: 'Maximum 10 rooms allowed' }
                    })}
                    className={errors.numberOfRooms ? 'error' : ''}
                  />
                  {errors.numberOfRooms && <span className="error-message">{errors.numberOfRooms.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests (Optional)</label>
                  <textarea
                    id="specialRequests"
                    rows={4}
                    {...register('specialRequests')}
                  />
                </div>

                {totalPrice > 0 && (
                  <div className="total-price">
                    <strong>Total Price: {totalPrice.toFixed(2)} CFA</strong>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-block">
                  Book Now
                </button>
              </form>
            </div>
          )}

          {!isAuthenticated && (
            <div className="login-prompt">
              <p>Please <a href="/login">login</a> to make a reservation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
