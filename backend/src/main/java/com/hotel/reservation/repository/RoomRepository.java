package com.hotel.reservation.repository;

import com.hotel.reservation.entity.Room;
import com.hotel.reservation.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Room entity.
 * Provides CRUD operations and custom query methods for Room management.
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    /**
     * Find a room by its room number.
     *
     * @param roomNumber the room number to search for
     * @return Optional containing the room if found
     */
    Optional<Room> findByRoomNumber(String roomNumber);

    /**
     * Find all rooms by availability status.
     *
     * @param isAvailable the availability status to filter by
     * @return List of rooms matching the availability status
     */
    List<Room> findByIsAvailable(Boolean isAvailable);

    /**
     * Find all rooms by room type.
     *
     * @param roomType the room type to filter by
     * @return List of rooms matching the room type
     */
    List<Room> findByRoomType(RoomType roomType);

    /**
     * Find all rooms with price in the specified range.
     *
     * @param minPrice the minimum price (inclusive)
     * @param maxPrice the maximum price (inclusive)
     * @return List of rooms with price in the range
     */
    List<Room> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    /**
     * Find available rooms by room type.
     * Custom query to find rooms that are both available and of a specific type.
     *
     * @param roomType the room type to filter by
     * @param isAvailable the availability status
     * @return List of available rooms of the specified type
     */
    @Query("SELECT r FROM Room r WHERE r.roomType = :roomType AND r.isAvailable = :isAvailable")
    List<Room> findAvailableRoomsByType(@Param("roomType") RoomType roomType, @Param("isAvailable") Boolean isAvailable);
}
