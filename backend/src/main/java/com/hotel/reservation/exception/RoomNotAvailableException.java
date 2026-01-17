package com.hotel.reservation.exception;

/**
 * Exception thrown when room is not available for booking.
 */
public class RoomNotAvailableException extends RuntimeException {
    public RoomNotAvailableException(String message) {
        super(message);
    }
}
