package com.hotel.reservation.service;

import com.hotel.reservation.dto.ReservationDTO;
import com.hotel.reservation.dto.ReservationRequest;
import com.hotel.reservation.dto.ReservationResponse;
import com.hotel.reservation.entity.*;
import com.hotel.reservation.exception.InvalidOperationException;
import com.hotel.reservation.exception.ResourceNotFoundException;
import com.hotel.reservation.exception.RoomNotAvailableException;
import com.hotel.reservation.repository.GuestRepository;
import com.hotel.reservation.repository.ReservationRepository;
import com.hotel.reservation.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service implementation for Reservation operations.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;

    @Override
    public ReservationResponse createReservation(ReservationRequest request) {
        // Validate dates
        validateDates(request.getCheckInDate(), request.getCheckOutDate());

        // Get guest and room
        Guest guest = guestRepository.findById(request.getGuestId())
                .orElseThrow(() -> new ResourceNotFoundException("Guest", "id", request.getGuestId()));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", request.getRoomId()));

        // Check room availability
        if (!checkRoomAvailability(request.getRoomId(), request.getCheckInDate(), request.getCheckOutDate())) {
            throw new RoomNotAvailableException(
                    "Room " + room.getRoomNumber() + " is not available for the selected dates");
        }

        // Calculate total price (price per night * number of nights * number of rooms)
        BigDecimal totalPrice = calculateTotalPrice(room.getPrice(), request.getCheckInDate(), request.getCheckOutDate(), request.getNumberOfRooms());

        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setGuest(guest);
        reservation.setRoom(room);
        reservation.setCheckInDate(request.getCheckInDate());
        reservation.setCheckOutDate(request.getCheckOutDate());
        reservation.setNumberOfGuests(request.getNumberOfGuests());
        reservation.setNumberOfRooms(request.getNumberOfRooms());
        reservation.setSpecialRequests(request.getSpecialRequests());
        reservation.setTotalPrice(totalPrice);
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation = reservationRepository.save(reservation);
        ReservationDTO reservationDTO = convertToDTO(savedReservation);

        return new ReservationResponse(reservationDTO, "Reservation created successfully");
    }

    @Override
    public ReservationDTO updateReservation(Long id, ReservationRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));

        // Only allow updates for PENDING reservations
        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new InvalidOperationException("Cannot update a cancelled reservation");
        }

        // Validate dates
        validateDates(request.getCheckInDate(), request.getCheckOutDate());

        // Get guest and room
        Guest guest = guestRepository.findById(request.getGuestId())
                .orElseThrow(() -> new ResourceNotFoundException("Guest", "id", request.getGuestId()));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", request.getRoomId()));

        // Check room availability (excluding current reservation)
        if (!room.getId().equals(reservation.getRoom().getId()) || 
            !request.getCheckInDate().equals(reservation.getCheckInDate()) ||
            !request.getCheckOutDate().equals(reservation.getCheckOutDate())) {
            
            if (!checkRoomAvailability(request.getRoomId(), request.getCheckInDate(), request.getCheckOutDate())) {
                throw new RoomNotAvailableException(
                        "Room " + room.getRoomNumber() + " is not available for the selected dates");
            }
        }

        // Calculate new total price
        BigDecimal totalPrice = calculateTotalPrice(room.getPrice(), request.getCheckInDate(), request.getCheckOutDate(), request.getNumberOfRooms());

        // Update reservation
        reservation.setGuest(guest);
        reservation.setRoom(room);
        reservation.setCheckInDate(request.getCheckInDate());
        reservation.setCheckOutDate(request.getCheckOutDate());
        reservation.setNumberOfGuests(request.getNumberOfGuests());
        reservation.setNumberOfRooms(request.getNumberOfRooms());
        reservation.setSpecialRequests(request.getSpecialRequests());
        reservation.setTotalPrice(totalPrice);

        Reservation updatedReservation = reservationRepository.save(reservation);
        return convertToDTO(updatedReservation);
    }

    @Override
    public ReservationDTO cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new InvalidOperationException("Reservation is already cancelled");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        Reservation cancelledReservation = reservationRepository.save(reservation);
        return convertToDTO(cancelledReservation);
    }

    @Override
    @Transactional(readOnly = true)
    public ReservationDTO getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));
        return convertToDTO(reservation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationDTO> getReservationsByGuest(Long guestId) {
        return reservationRepository.findByGuestId(guestId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDTO confirmReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new InvalidOperationException("Cannot confirm a cancelled reservation");
        }

        if (reservation.getStatus() == ReservationStatus.CONFIRMED) {
            throw new InvalidOperationException("Reservation is already confirmed");
        }

        reservation.setStatus(ReservationStatus.CONFIRMED);
        Reservation confirmedReservation = reservationRepository.save(reservation);
        return convertToDTO(confirmedReservation);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkRoomAvailability(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Reservation> overlappingReservations = reservationRepository.findByRoomIdAndDateRange(
                roomId, checkInDate, checkOutDate);

        // Check if there are any confirmed or pending reservations
        return overlappingReservations.stream()
                .noneMatch(r -> r.getStatus() == ReservationStatus.CONFIRMED || 
                               r.getStatus() == ReservationStatus.PENDING);
    }

    private void validateDates(LocalDate checkInDate, LocalDate checkOutDate) {
        if (checkInDate.isBefore(LocalDate.now())) {
            throw new InvalidOperationException("Check-in date cannot be in the past");
        }

        if (checkOutDate.isBefore(checkInDate) || checkOutDate.equals(checkInDate)) {
            throw new InvalidOperationException("Check-out date must be after check-in date");
        }
    }

    private BigDecimal calculateTotalPrice(BigDecimal pricePerNight, LocalDate checkInDate, LocalDate checkOutDate, Integer numberOfRooms) {
        long numberOfNights = ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        return pricePerNight.multiply(BigDecimal.valueOf(numberOfNights)).multiply(BigDecimal.valueOf(numberOfRooms));
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setGuestId(reservation.getGuest().getId());
        dto.setGuestName(reservation.getGuest().getFirstName() + " " + reservation.getGuest().getLastName());
        dto.setRoomId(reservation.getRoom().getId());
        dto.setRoomNumber(reservation.getRoom().getRoomNumber());
        dto.setCheckInDate(reservation.getCheckInDate());
        dto.setCheckOutDate(reservation.getCheckOutDate());
        dto.setNumberOfGuests(reservation.getNumberOfGuests());
        dto.setNumberOfRooms(reservation.getNumberOfRooms());
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setStatus(reservation.getStatus());
        dto.setCreatedAt(reservation.getCreatedAt());
        return dto;
    }
}
