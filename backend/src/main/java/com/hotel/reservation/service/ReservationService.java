package com.hotel.reservation.service;

import com.hotel.reservation.dto.ReservationDTO;
import com.hotel.reservation.dto.ReservationRequest;
import com.hotel.reservation.dto.ReservationResponse;
import java.time.LocalDate;
import java.util.List;

/**
 * Service interface for Reservation operations.
 */
public interface ReservationService {
    ReservationResponse createReservation(ReservationRequest request);
    ReservationDTO updateReservation(Long id, ReservationRequest request);
    ReservationDTO cancelReservation(Long id);
    ReservationDTO getReservationById(Long id);
    List<ReservationDTO> getAllReservations();
    List<ReservationDTO> getReservationsByGuest(Long guestId);
    ReservationDTO confirmReservation(Long id);
    boolean checkRoomAvailability(Long roomId, LocalDate checkInDate, LocalDate checkOutDate);
}
