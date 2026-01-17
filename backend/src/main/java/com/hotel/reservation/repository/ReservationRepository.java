package com.hotel.reservation.repository;

import com.hotel.reservation.entity.Reservation;
import com.hotel.reservation.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for Reservation entity.
 * Provides CRUD operations and custom query methods for Reservation management.
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * Find all reservations for a specific guest.
     *
     * @param guestId the guest ID to search for
     * @return List of reservations for the guest
     */
    @Query("SELECT r FROM Reservation r WHERE r.guest.id = :guestId")
    List<Reservation> findByGuestId(@Param("guestId") Long guestId);

    /**
     * Find all reservations for a specific room.
     *
     * @param roomId the room ID to search for
     * @return List of reservations for the room
     */
    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId")
    List<Reservation> findByRoomId(@Param("roomId") Long roomId);

    /**
     * Find all reservations by status.
     *
     * @param status the reservation status to filter by
     * @return List of reservations matching the status
     */
    List<Reservation> findByStatus(ReservationStatus status);

    /**
     * Find all reservations with check-in dates within a specified range.
     *
     * @param startDate the start date of the range
     * @param endDate the end date of the range
     * @return List of reservations with check-in dates in the range
     */
    List<Reservation> findByCheckInDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Find all reservations for a specific guest with a specific status.
     *
     * @param guestId the guest ID to search for
     * @param status the reservation status to filter by
     * @return List of reservations for the guest with the specified status
     */
    @Query("SELECT r FROM Reservation r WHERE r.guest.id = :guestId AND r.status = :status")
    List<Reservation> findByGuestIdAndStatus(@Param("guestId") Long guestId, @Param("status") ReservationStatus status);

    /**
     * Find reservations that conflict with a given date range for a specific room.
     * Useful for checking room availability during booking.
     *
     * @param roomId the room ID to check
     * @param checkInDate the check-in date
     * @param checkOutDate the check-out date
     * @return List of conflicting reservations
     */
    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId " +
           "AND r.status != 'CANCELLED' " +
           "AND ((r.checkInDate <= :checkOutDate AND r.checkOutDate >= :checkInDate))")
    List<Reservation> findConflictingReservations(
        @Param("roomId") Long roomId,
        @Param("checkInDate") LocalDate checkInDate,
        @Param("checkOutDate") LocalDate checkOutDate
    );

    /**
     * Find reservations for a specific room within a given date range.
     * Used for checking room availability.
     *
     * @param roomId the room ID to check
     * @param checkInDate the check-in date
     * @param checkOutDate the check-out date
     * @return List of reservations within the date range
     */
    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId " +
           "AND ((r.checkInDate <= :checkOutDate AND r.checkOutDate >= :checkInDate))")
    List<Reservation> findByRoomIdAndDateRange(
        @Param("roomId") Long roomId,
        @Param("checkInDate") LocalDate checkInDate,
        @Param("checkOutDate") LocalDate checkOutDate
    );
}
