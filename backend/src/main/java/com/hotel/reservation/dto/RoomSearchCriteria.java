package com.hotel.reservation.dto;

import com.hotel.reservation.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for room search criteria.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomSearchCriteria {
    private RoomType roomType;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Integer minCapacity;
    private Boolean isAvailable;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}
