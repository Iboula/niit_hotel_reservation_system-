package com.hotel.reservation.service;

import com.hotel.reservation.dto.GuestDTO;
import com.hotel.reservation.dto.GuestRequest;
import java.util.List;

/**
 * Service interface for Guest operations.
 */
public interface GuestService {
    GuestDTO createGuest(GuestRequest request);
    GuestDTO updateGuest(Long id, GuestRequest request);
    void deleteGuest(Long id);
    GuestDTO getGuestById(Long id);
    List<GuestDTO> getAllGuests();
    List<GuestDTO> getGuestsByUser(Long userId);
}
