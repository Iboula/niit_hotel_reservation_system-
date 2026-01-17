package com.hotel.reservation.controller;

import com.hotel.reservation.dto.GuestDTO;
import com.hotel.reservation.dto.GuestRequest;
import com.hotel.reservation.service.GuestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for guest management operations.
 */
@RestController
@RequestMapping("/api/guests")
@CrossOrigin(origins = "*")
public class GuestController {

    private final GuestService guestService;

    @Autowired
    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    /**
     * Create a new guest.
     *
     * @param request the guest request
     * @return the created guest DTO
     */
    @PostMapping
    public ResponseEntity<GuestDTO> createGuest(@Valid @RequestBody GuestRequest request) {
        GuestDTO createdGuest = guestService.createGuest(request);
        return new ResponseEntity<>(createdGuest, HttpStatus.CREATED);
    }

    /**
     * Get all guests.
     *
     * @return list of all guests
     */
    @GetMapping
    public ResponseEntity<List<GuestDTO>> getAllGuests() {
        List<GuestDTO> guests = guestService.getAllGuests();
        return ResponseEntity.ok(guests);
    }

    /**
     * Get guest by ID.
     *
     * @param id the guest ID
     * @return the guest DTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<GuestDTO> getGuestById(@PathVariable Long id) {
        GuestDTO guest = guestService.getGuestById(id);
        return ResponseEntity.ok(guest);
    }

    /**
     * Update guest.
     *
     * @param id      the guest ID
     * @param request the update request
     * @return the updated guest DTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<GuestDTO> updateGuest(
            @PathVariable Long id,
            @Valid @RequestBody GuestRequest request) {
        GuestDTO updatedGuest = guestService.updateGuest(id, request);
        return ResponseEntity.ok(updatedGuest);
    }

    /**
     * Delete guest.
     *
     * @param id the guest ID
     * @return no content response
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get all guests for a specific user.
     *
     * @param userId the user ID
     * @return list of guests associated with the user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GuestDTO>> getGuestsByUser(@PathVariable Long userId) {
        List<GuestDTO> guests = guestService.getGuestsByUser(userId);
        return ResponseEntity.ok(guests);
    }
}
