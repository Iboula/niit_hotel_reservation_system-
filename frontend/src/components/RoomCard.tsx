import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../utils/types';
import '../styles/RoomCard.css';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="room-card">
      {room.imageUrl && (
        <div className="room-card-image">
          <img src={room.imageUrl} alt={`Room ${room.roomNumber}`} />
        </div>
      )}
      <div className="room-card-header">
        <h3>Room {room.roomNumber}</h3>
        <span className={`room-status ${room.isAvailable ? 'available' : 'unavailable'}`}>
          {room.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="room-card-body">
        <p><strong>Type:</strong> {room.roomType}</p>
        <p><strong>Capacity:</strong> {room.capacity} guests</p>
        <p><strong>Price:</strong> {room.price} CFA/night</p>
        {room.description && <p className="room-description">{room.description}</p>}
      </div>
      <div className="room-card-footer">
        <Link to={`/rooms/${room.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
