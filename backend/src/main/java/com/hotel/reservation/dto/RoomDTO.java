package com.hotel.reservation.dto;

import com.hotel.reservation.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for Room entity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long id;
    private String roomNumber;
    private RoomType roomType;
    private BigDecimal price;
    private Boolean isAvailable;
    private String description;
    private String imageUrl;
    private Integer capacity;
}
