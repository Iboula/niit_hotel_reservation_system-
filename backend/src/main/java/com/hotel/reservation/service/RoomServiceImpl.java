package com.hotel.reservation.service;

import com.hotel.reservation.dto.RoomDTO;
import com.hotel.reservation.dto.RoomSearchCriteria;
import com.hotel.reservation.entity.Reservation;
import com.hotel.reservation.entity.ReservationStatus;
import com.hotel.reservation.entity.Room;
import com.hotel.reservation.exception.ResourceAlreadyExistsException;
import com.hotel.reservation.exception.ResourceNotFoundException;
import com.hotel.reservation.repository.ReservationRepository;
import com.hotel.reservation.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service implementation for Room operations.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public RoomDTO createRoom(RoomDTO roomDTO) {
        // Check if room number already exists
        if (roomRepository.findByRoomNumber(roomDTO.getRoomNumber()).isPresent()) {
            throw new ResourceAlreadyExistsException("Room", "roomNumber", roomDTO.getRoomNumber());
        }

        Room room = new Room();
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setPrice(roomDTO.getPrice());
        room.setIsAvailable(roomDTO.getIsAvailable() != null ? roomDTO.getIsAvailable() : true);
        room.setDescription(roomDTO.getDescription());
        room.setCapacity(roomDTO.getCapacity());

        Room savedRoom = roomRepository.save(room);
        return convertToDTO(savedRoom);
    }

    @Override
    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));

        // Check if new room number is already taken by another room
        if (!room.getRoomNumber().equals(roomDTO.getRoomNumber())) {
            roomRepository.findByRoomNumber(roomDTO.getRoomNumber()).ifPresent(existingRoom -> {
                throw new ResourceAlreadyExistsException("Room", "roomNumber", roomDTO.getRoomNumber());
            });
        }

        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setPrice(roomDTO.getPrice());
        room.setIsAvailable(roomDTO.getIsAvailable());
        room.setDescription(roomDTO.getDescription());
        room.setImageUrl(roomDTO.getImageUrl());
        room.setCapacity(roomDTO.getCapacity());

        Room updatedRoom = roomRepository.save(room);
        return convertToDTO(updatedRoom);
    }

    @Override
    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
        roomRepository.delete(room);
    }

    @Override
    @Transactional(readOnly = true)
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
        return convertToDTO(room);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoomDTO> searchRooms(RoomSearchCriteria criteria) {
        List<Room> rooms = roomRepository.findAll();

        return rooms.stream()
                .filter(room -> criteria.getRoomType() == null || room.getRoomType().equals(criteria.getRoomType()))
                .filter(room -> criteria.getMinPrice() == null || room.getPrice().compareTo(criteria.getMinPrice()) >= 0)
                .filter(room -> criteria.getMaxPrice() == null || room.getPrice().compareTo(criteria.getMaxPrice()) <= 0)
                .filter(room -> criteria.getMinCapacity() == null || room.getCapacity() >= criteria.getMinCapacity())
                .filter(room -> criteria.getIsAvailable() == null || room.getIsAvailable().equals(criteria.getIsAvailable()))
                .filter(room -> {
                    if (criteria.getCheckInDate() != null && criteria.getCheckOutDate() != null) {
                        return checkAvailability(room.getId(), criteria.getCheckInDate(), criteria.getCheckOutDate());
                    }
                    return true;
                })
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkAvailability(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Reservation> overlappingReservations = reservationRepository.findByRoomIdAndDateRange(
                roomId, checkInDate, checkOutDate);

        // Check if there are any confirmed or pending reservations
        return overlappingReservations.stream()
                .noneMatch(r -> r.getStatus() == ReservationStatus.CONFIRMED || 
                               r.getStatus() == ReservationStatus.PENDING);
    }

    private RoomDTO convertToDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setId(room.getId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setRoomType(room.getRoomType());
        dto.setPrice(room.getPrice());
        dto.setIsAvailable(room.getIsAvailable());
        dto.setDescription(room.getDescription());
        dto.setImageUrl(room.getImageUrl());
        dto.setCapacity(room.getCapacity());
        return dto;
    }
}
