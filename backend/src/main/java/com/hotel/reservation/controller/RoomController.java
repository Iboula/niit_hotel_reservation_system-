package com.hotel.reservation.controller;

import com.hotel.reservation.dto.RoomDTO;
import com.hotel.reservation.dto.RoomSearchCriteria;
import com.hotel.reservation.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * REST Controller for room management operations.
 */
@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /**
     * Create a new room.
     *
     * @param roomDTO the room data
     * @return the created room DTO
     */
    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@Valid @RequestBody RoomDTO roomDTO) {
        RoomDTO createdRoom = roomService.createRoom(roomDTO);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    /**
     * Get all rooms.
     *
     * @return list of all rooms
     */
    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        List<RoomDTO> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    /**
     * Get room by ID.
     *
     * @param id the room ID
     * @return the room DTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) {
        RoomDTO room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    /**
     * Update room.
     *
     * @param id      the room ID
     * @param roomDTO the updated room data
     * @return the updated room DTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<RoomDTO> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody RoomDTO roomDTO) {
        RoomDTO updatedRoom = roomService.updateRoom(id, roomDTO);
        return ResponseEntity.ok(updatedRoom);
    }

    /**
     * Delete room.
     *
     * @param id the room ID
     * @return no content response
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Search rooms based on criteria.
     *
     * @param criteria the search criteria
     * @return list of matching rooms
     */
    @PostMapping("/search")
    public ResponseEntity<List<RoomDTO>> searchRooms(@RequestBody RoomSearchCriteria criteria) {
        List<RoomDTO> rooms = roomService.searchRooms(criteria);
        return ResponseEntity.ok(rooms);
    }

    /**
     * Search rooms based on criteria (GET version).
     *
     * @param criteria the search criteria
     * @return list of matching rooms
     */
    @GetMapping("/search")
    public ResponseEntity<List<RoomDTO>> searchRoomsGet(@Valid @ModelAttribute RoomSearchCriteria criteria) {
        List<RoomDTO> rooms = roomService.searchRooms(criteria);
        return ResponseEntity.ok(rooms);
    }

    /**
     * Check room availability.
     *
     * @param roomId       the room ID
     * @param checkInDate  the check-in date
     * @param checkOutDate the check-out date
     * @return availability status
     */
    @GetMapping("/available")
    public ResponseEntity<Boolean> checkAvailability(
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        boolean isAvailable = roomService.checkAvailability(roomId, checkInDate, checkOutDate);
        return ResponseEntity.ok(isAvailable);
    }
}
