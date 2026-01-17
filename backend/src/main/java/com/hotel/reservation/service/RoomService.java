package com.hotel.reservation.service;

import com.hotel.reservation.dto.RoomDTO;
import com.hotel.reservation.dto.RoomSearchCriteria;
import java.time.LocalDate;
import java.util.List;

/**
 * Service interface for Room operations.
 */
public interface RoomService {
    RoomDTO createRoom(RoomDTO roomDTO);
    RoomDTO updateRoom(Long id, RoomDTO roomDTO);
    void deleteRoom(Long id);
    RoomDTO getRoomById(Long id);
    List<RoomDTO> getAllRooms();
    List<RoomDTO> searchRooms(RoomSearchCriteria criteria);
    boolean checkAvailability(Long roomId, LocalDate checkInDate, LocalDate checkOutDate);
}
