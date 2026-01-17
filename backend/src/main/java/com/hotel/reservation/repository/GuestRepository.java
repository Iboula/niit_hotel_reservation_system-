package com.hotel.reservation.repository;

import com.hotel.reservation.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Guest entity.
 * Provides CRUD operations and custom query methods for Guest management.
 */
@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {

    /**
     * Find a guest by email.
     *
     * @param email the email to search for
     * @return Optional containing the guest if found
     */
    Optional<Guest> findByEmail(String email);

    /**
     * Find a guest by phone number.
     *
     * @param phoneNumber the phone number to search for
     * @return Optional containing the guest if found
     */
    Optional<Guest> findByPhoneNumber(String phoneNumber);

    /**
     * Find all guests associated with a specific user.
     *
     * @param userId the user ID to search for
     * @return List of guests associated with the user
     */
    @Query("SELECT g FROM Guest g WHERE g.user.id = :userId")
    List<Guest> findByUserId(@Param("userId") Long userId);
}
