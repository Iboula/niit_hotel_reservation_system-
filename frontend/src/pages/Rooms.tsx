import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import RoomCard from '../components/RoomCard';
import { roomService } from '../services/roomService';
import { Room, RoomSearchCriteria, RoomType } from '../utils/types';
import '../styles/Rooms.css';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<RoomSearchCriteria>();

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

  useEffect(() => {
    loadRooms();
  }, []);

  const onSearch = async (criteria: RoomSearchCriteria) => {
    try {
      setLoading(true);
      const data = await roomService.searchRooms(criteria);
      setRooms(data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    loadRooms();
  };

  return (
    <div className="rooms-container">
      <h1>Available Rooms</h1>
      
      <div className="search-section">
        <h2>Search Rooms</h2>
        <form onSubmit={handleSubmit(onSearch)} className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="roomType">Room Type</label>
              <select id="roomType" {...register('roomType')}>
                <option value="">All Types</option>
                {Object.values(RoomType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="minPrice">Min Price</label>
              <input
                id="minPrice"
                type="number"
                step="0.01"
                placeholder="Min"
                {...register('minPrice', { valueAsNumber: true })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxPrice">Max Price</label>
              <input
                id="maxPrice"
                type="number"
                step="0.01"
                placeholder="Max"
                {...register('maxPrice', { valueAsNumber: true })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="minCapacity">Capacity</label>
              <input
                id="minCapacity"
                type="number"
                placeholder="Guests"
                {...register('minCapacity', { valueAsNumber: true })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="isAvailable">Availability</label>
              <select id="isAvailable" {...register('isAvailable', {
                setValueAs: (value) => value === '' ? null : value === 'true'
              })}>
                <option value="">All</option>
                <option value="true">Available Only</option>
                <option value="false">Unavailable Only</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Search</button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="loading">Loading rooms...</div>
      ) : (
        <div className="rooms-grid">
          {rooms.length === 0 ? (
            <p className="no-results">No rooms found</p>
          ) : (
            rooms.map(room => <RoomCard key={room.id} room={room} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Rooms;
