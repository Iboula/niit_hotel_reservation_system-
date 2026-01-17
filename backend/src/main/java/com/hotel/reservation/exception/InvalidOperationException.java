package com.hotel.reservation.exception;

/**
 * Exception thrown for invalid business operations.
 */
public class InvalidOperationException extends RuntimeException {
    public InvalidOperationException(String message) {
        super(message);
    }
}
