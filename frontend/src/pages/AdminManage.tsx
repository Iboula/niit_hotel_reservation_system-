import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { roomService } from '../services/roomService';
import { reservationService } from '../services/reservationService';
import { guestService } from '../services/guestService';
import { imageService } from '../services/imageService';
import { Room, Reservation, Guest, RoomType } from '../utils/types';
import '../styles/AdminManage.css';

type TabType = 'rooms' | 'reservations' | 'guests';

const AdminManage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'rooms');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Omit<Room, 'id'>>();

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await roomService.getAllRooms();
      setRooms(data);
    } catch (error) {
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getAllReservations();
      setReservations(data);
    } catch (error) {
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  const loadGuests = async () => {
    try {
      setLoading(true);
      const data = await guestService.getAllGuests();
      setGuests(data);
    } catch (error) {
      toast.error('Failed to load guests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    if (activeTab === 'rooms') loadRooms();
    else if (activeTab === 'reservations') loadReservations();
    else if (activeTab === 'guests') loadGuests();
  }, [activeTab]);

  const onSubmitRoom = async (data: Omit<Room, 'id'>) => {
    try {
      if (editingRoom) {
        await roomService.updateRoom(editingRoom.id, data);
        toast.success('Room updated successfully');
      } else {
        await roomService.createRoom(data);
        toast.success('Room created successfully');
      }
      reset();
      setEditingRoom(null);
      loadRooms();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save room');
    }
  };

  const handleDeleteRoom = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await roomService.deleteRoom(id);
        toast.success('Room deleted successfully');
        loadRooms();
      } catch (error) {
        toast.error('Failed to delete room');
      }
    }
  };

  const handleToggleAvailability = async (room: Room) => {
    try {
      await roomService.updateAvailability(room.id, !room.isAvailable);
      toast.success('Room availability updated');
      loadRooms();
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  const handleConfirmReservation = async (id: number) => {
    try {
      await reservationService.confirmReservation(id);
      toast.success('Reservation confirmed');
      loadReservations();
    } catch (error) {
      toast.error('Failed to confirm reservation');
    }
  };

  const handleCancelReservation = async (id: number) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await reservationService.cancelReservation(id);
        toast.success('Reservation cancelled');
        loadReservations();
      } catch (error) {
        toast.error('Failed to cancel reservation');
      }
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    reset(room);
    setImagePreview(room.imageUrl || null);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    try {
      setUploadingImage(true);
      const response = await imageService.uploadImage(file);
      // Use the URL returned from the backend directly
      const imageUrl = response.url;
      setValue('imageUrl', imageUrl);
      setImagePreview(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
    setImagePreview(null);
    reset({
      roomNumber: '',
      roomType: RoomType.SINGLE,
      price: 0,
      capacity: 1,
      description: '',
      isAvailable: true
    });
  };

  return (
    <div className="admin-panel">
      <h1>🛠️ Gestion de l'Hôtel</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'rooms' ? 'active' : ''}
          onClick={() => setActiveTab('rooms')}
        >
          Rooms
        </button>
        <button 
          className={activeTab === 'reservations' ? 'active' : ''}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
        <button 
          className={activeTab === 'guests' ? 'active' : ''}
          onClick={() => setActiveTab('guests')}
        >
          Guests
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'rooms' && (
          <div className="rooms-section">
            <div className="room-form-section">
              <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <form onSubmit={handleSubmit(onSubmitRoom)} className="room-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                      id="roomNumber"
                      type="text"
                      {...register('roomNumber', { required: 'Room number is required' })}
                      className={errors.roomNumber ? 'error' : ''}
                    />
                    {errors.roomNumber && <span className="error-message">{errors.roomNumber.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="roomType">Type</label>
                    <select id="roomType" {...register('roomType', { required: 'Type is required' })}>
                      {Object.values(RoomType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price per Night</label>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price', { 
                        required: 'Price is required',
                        valueAsNumber: true,
                        min: { value: 0, message: 'Price must be positive' }
                      })}
                      className={errors.price ? 'error' : ''}
                    />
                    {errors.price && <span className="error-message">{errors.price.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      id="capacity"
                      type="number"
                      {...register('capacity', { 
                        required: 'Capacity is required',
                        valueAsNumber: true,
                        min: { value: 1, message: 'Capacity must be at least 1' }
                      })}
                      className={errors.capacity ? 'error' : ''}
                    />
                    {errors.capacity && <span className="error-message">{errors.capacity.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    {...register('description')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    {...register('imageUrl')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageUpload">Or Upload Image</label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <span className="upload-status">Uploading...</span>}
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      {...register('isAvailable')}
                    />
                    Available
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingRoom ? 'Update Room' : 'Add Room'}
                  </button>
                  {editingRoom && (
                    <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rooms-list-section">
              <h2>All Rooms</h2>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <div className="rooms-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Room #</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map(room => (
                        <tr key={room.id}>
                          <td>{room.roomNumber}</td>
                          <td>{room.roomType}</td>
                          <td>{room.price} CFA</td>
                          <td>{room.capacity}</td>
                          <td>
                            <span className={`status ${room.isAvailable ? 'available' : 'unavailable'}`}>
                              {room.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td className="actions">
                            <button onClick={() => handleEditRoom(room)} className="btn-small btn-info">
                              Edit
                            </button>
                            <button onClick={() => handleToggleAvailability(room)} className="btn-small btn-warning">
                              Toggle
                            </button>
                            <button onClick={() => handleDeleteRoom(room.id)} className="btn-small btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="reservations-section">
            <h2>All Reservations</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : reservations.length === 0 ? (
              <p>No reservations found</p>
            ) : (
              <div className="reservations-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(reservation => (
                      <tr key={reservation.id}>
                        <td>#{reservation.id}</td>
                        <td>{reservation.guestName}</td>
                        <td>
                          Room #{reservation.roomNumber}
                        </td>
                        <td>{new Date(reservation.checkInDate).toLocaleDateString('fr-FR')}</td>
                        <td>{new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}</td>
                        <td>{reservation.totalPrice.toFixed(2)} CFA</td>
                        <td>
                          <span className={`status status-${reservation.status.toLowerCase()}`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="actions">
                          {reservation.status === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => handleConfirmReservation(reservation.id)}
                                className="btn-small btn-success"
                                title="Confirmer"
                              >
                                ✓
                              </button>
                              <button 
                                onClick={() => handleCancelReservation(reservation.id)}
                                className="btn-small btn-danger"
                                title="Annuler"
                              >
                                ✗
                              </button>
                            </>
                          )}
                          {reservation.status === 'CONFIRMED' && (
                            <button 
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="btn-small btn-warning"
                              title="Annuler"
                            >
                              Annuler
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'guests' && (
          <div className="guests-section">
            <h2>All Guests</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="guests-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map(guest => (
                      <tr key={guest.id}>
                        <td>{guest.id}</td>
                        <td>{guest.firstName} {guest.lastName}</td>
                        <td>{guest.email}</td>
                        <td>{guest.phoneNumber}</td>
                        <td>{guest.address || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManage;
