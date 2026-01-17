package com.hotel.reservation.service;

import com.hotel.reservation.dto.GuestDTO;
import com.hotel.reservation.dto.GuestRequest;
import com.hotel.reservation.entity.Guest;
import com.hotel.reservation.entity.User;
import com.hotel.reservation.exception.ResourceNotFoundException;
import com.hotel.reservation.repository.GuestRepository;
import com.hotel.reservation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service implementation for Guest operations.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;
    private final UserRepository userRepository;

    @Override
    public GuestDTO createGuest(GuestRequest request) {
        Guest guest = new Guest();
        guest.setFirstName(request.getFirstName());
        guest.setLastName(request.getLastName());
        guest.setEmail(request.getEmail());
        guest.setPhoneNumber(request.getPhoneNumber());
        guest.setAddress(request.getAddress());

        if (request.getUserId() != null) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
            guest.setUser(user);
        }

        Guest savedGuest = guestRepository.save(guest);
        return convertToDTO(savedGuest);
    }

    @Override
    public GuestDTO updateGuest(Long id, GuestRequest request) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest", "id", id));

        guest.setFirstName(request.getFirstName());
        guest.setLastName(request.getLastName());
        guest.setEmail(request.getEmail());
        guest.setPhoneNumber(request.getPhoneNumber());
        guest.setAddress(request.getAddress());

        if (request.getUserId() != null) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
            guest.setUser(user);
        } else {
            guest.setUser(null);
        }

        Guest updatedGuest = guestRepository.save(guest);
        return convertToDTO(updatedGuest);
    }

    @Override
    public void deleteGuest(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest", "id", id));
        guestRepository.delete(guest);
    }

    @Override
    @Transactional(readOnly = true)
    public GuestDTO getGuestById(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest", "id", id));
        return convertToDTO(guest);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GuestDTO> getAllGuests() {
        return guestRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<GuestDTO> getGuestsByUser(Long userId) {
        return guestRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private GuestDTO convertToDTO(Guest guest) {
        GuestDTO dto = new GuestDTO();
        dto.setId(guest.getId());
        dto.setFirstName(guest.getFirstName());
        dto.setLastName(guest.getLastName());
        dto.setEmail(guest.getEmail());
        dto.setPhoneNumber(guest.getPhoneNumber());
        dto.setAddress(guest.getAddress());
        dto.setUserId(guest.getUser() != null ? guest.getUser().getId() : null);
        return dto;
    }
}
