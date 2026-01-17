package com.hotel.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for reservation response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {
    private ReservationDTO reservation;
    private String message;
    private Boolean success;

    public ReservationResponse(ReservationDTO reservation, String message) {
        this.reservation = reservation;
        this.message = message;
        this.success = true;
    }
}
