-- Seed Data for Hotel Reservation System
-- Password for all users: "password" (BCrypt encoded)

-- Insert Users (password: "password")
INSERT INTO users (id, username, email, password, first_name, last_name, role, created_at) VALUES
(1, 'admin', 'admin@hotel.com', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Admin', 'Hotel', 'ADMIN', NOW()),
(2, 'john.doe', 'john.doe@email.com', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'John', 'Doe', 'USER', NOW()),
(3, 'jane.smith', 'jane.smith@email.com', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Jane', 'Smith', 'USER', NOW()),
(4, 'bob.wilson', 'bob.wilson@email.com', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Bob', 'Wilson', 'USER', NOW()),
-- Utilisateurs sénégalais
(5, 'mamadou.diop', 'mamadou.diop@hotel.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Mamadou', 'Diop', 'ADMIN', NOW()),
(6, 'fatou.sall', 'fatou.sall@hotel.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Fatou', 'Sall', 'ADMIN', NOW()),
(7, 'aminata.ndiaye', 'aminata.ndiaye@email.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Aminata', 'Ndiaye', 'USER', NOW()),
(8, 'ousmane.ba', 'ousmane.ba@email.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Ousmane', 'Ba', 'USER', NOW()),
(9, 'aissatou.fall', 'aissatou.fall@email.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Aissatou', 'Fall', 'USER', NOW()),
(10, 'ibrahima.sy', 'ibrahima.sy@email.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Ibrahima', 'Sy', 'USER', NOW()),
(11, 'mariama.toure', 'mariama.toure@email.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Mariama', 'Touré', 'USER', NOW()),
(12, 'cheikh.mbaye', 'cheikh.mbaye@hotel.sn', '$2a$10$FXkmh136jOcashuTMahHSemYnYh7oAsjDZwZGqYeVCHbnRZVyrTaG', 'Cheikh', 'Mbaye', 'ADMIN', NOW());

-- Insert Rooms
INSERT INTO rooms (id, room_number, room_type, price, is_available, description, image_url, image_urls, capacity) VALUES
-- Single Rooms
(1, '101', 'SINGLE', 15000.00, true, 'Cozy single room with a comfortable bed, desk, and en-suite bathroom. Perfect for solo travelers.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', '["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800","https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"]', 1),
(2, '102', 'SINGLE', 18000.00, true, 'Single room with city view, work desk, and free Wi-Fi. Includes complimentary breakfast.', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', '["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800","https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"]', 1),
(3, '103', 'SINGLE', 15000.00, true, 'Compact single room with modern amenities and air conditioning.', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', '["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"]', 1),

-- Double Rooms
(4, '201', 'DOUBLE', 30000.00, true, 'Spacious double room with queen-size bed, seating area, and mini-bar.', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', '["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800","https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800","https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"]', 2),
(5, '202', 'DOUBLE', 35000.00, true, 'Double room with balcony and garden view. Includes satellite TV and safe.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', '["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"]', 2),
(6, '203', 'DOUBLE', 30000.00, true, 'Elegant double room with modern décor and premium bedding.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800","https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"]', 2),
(7, '204', 'DOUBLE', 40000.00, true, 'Double room with ocean view and private balcony. Perfect for couples.', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', '["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"]', 2),

-- Suite Rooms
(8, '301', 'SUITE', 65000.00, true, 'Luxury suite with separate living room, king-size bed, and marble bathroom with jacuzzi.', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800', '["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800","https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800","https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]', 3),
(9, '302', 'SUITE', 75000.00, true, 'Executive suite with panoramic city views, work area, and complimentary room service.', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', '["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800","https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"]', 3),
(10, '303', 'SUITE', 70000.00, true, 'Family suite with two bedrooms, kitchenette, and dining area.', 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800', '["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"]', 4),

-- Deluxe Rooms
(11, '401', 'DELUXE', 50000.00, true, 'Deluxe room with premium amenities, king-size bed, and spa bathroom.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800', '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"]', 2),
(12, '402', 'DELUXE', 55000.00, true, 'Deluxe room with terrace, outdoor seating, and mountain views.', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', '["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800","https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]', 2),
(13, '403', 'DELUXE', 60000.00, true, 'Deluxe corner room with extra space, walk-in closet, and luxury linens.', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800","https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"]', 2),

-- Additional rooms
(14, '104', 'SINGLE', 15000.00, false, 'Single room currently under maintenance.', 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800', '["https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800","https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"]', 1),
(15, '205', 'DOUBLE', 35000.00, true, 'Double room with artistic décor and complimentary wine.', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800', '["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800","https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"]', 2);

-- Insert Guests
INSERT INTO guests (id, first_name, last_name, email, phone_number, address, user_id) VALUES
(1, 'John', 'Doe', 'john.doe@email.com', '+1-555-0101', '123 Main St, New York, NY 10001', 2),
(2, 'Jane', 'Smith', 'jane.smith@email.com', '+1-555-0102', '456 Oak Ave, Los Angeles, CA 90001', 3),
(3, 'Bob', 'Wilson', 'bob.wilson@email.com', '+1-555-0103', '789 Pine Rd, Chicago, IL 60601', 4),
(4, 'Alice', 'Johnson', 'alice.j@email.com', '+1-555-0104', '321 Elm St, Houston, TX 77001', NULL),
(5, 'Michael', 'Brown', 'michael.b@email.com', '+1-555-0105', '654 Maple Dr, Phoenix, AZ 85001', NULL),
(6, 'Sarah', 'Davis', 'sarah.d@email.com', '+1-555-0106', '987 Cedar Ln, Philadelphia, PA 19101', NULL);

-- Insert Reservations
-- Past reservations (COMPLETED)
INSERT INTO reservations (id, guest_id, room_id, check_in_date, check_out_date, number_of_guests, number_of_rooms, total_price, status, created_at) VALUES
(1, 1, 1, DATE_SUB(CURDATE(), INTERVAL 30 DAY), DATE_SUB(CURDATE(), INTERVAL 27 DAY), 1, 1, 45000.00, 'COMPLETED', DATE_SUB(NOW(), INTERVAL 35 DAY)),
(2, 2, 4, DATE_SUB(CURDATE(), INTERVAL 20 DAY), DATE_SUB(CURDATE(), INTERVAL 17 DAY), 2, 1, 90000.00, 'COMPLETED', DATE_SUB(NOW(), INTERVAL 25 DAY));

-- Current/Future reservations (CONFIRMED)
INSERT INTO reservations (id, guest_id, room_id, check_in_date, check_out_date, number_of_guests, number_of_rooms, total_price, status, created_at) VALUES
(3, 3, 8, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 8 DAY), 2, 1, 195000.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(4, 1, 5, DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 14 DAY), 2, 1, 140000.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(5, 4, 11, DATE_ADD(CURDATE(), INTERVAL 15 DAY), DATE_ADD(CURDATE(), INTERVAL 18 DAY), 2, 1, 150000.00, 'CONFIRMED', NOW());

-- Pending reservations
INSERT INTO reservations (id, guest_id, room_id, check_in_date, check_out_date, number_of_guests, number_of_rooms, total_price, status, created_at) VALUES
(6, 5, 6, DATE_ADD(CURDATE(), INTERVAL 20 DAY), DATE_ADD(CURDATE(), INTERVAL 22 DAY), 2, 1, 60000.00, 'PENDING', NOW()),
(7, 6, 12, DATE_ADD(CURDATE(), INTERVAL 25 DAY), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 2, 2, 550000.00, 'PENDING', NOW());

-- Cancelled reservation
INSERT INTO reservations (id, guest_id, room_id, check_in_date, check_out_date, number_of_guests, number_of_rooms, total_price, status, created_at) VALUES
(8, 2, 7, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 2, 1, 120000.00, 'CANCELLED', DATE_SUB(NOW(), INTERVAL 3 DAY));

-- Reset auto-increment counters
ALTER TABLE users AUTO_INCREMENT = 5;
ALTER TABLE rooms AUTO_INCREMENT = 16;
ALTER TABLE guests AUTO_INCREMENT = 7;
ALTER TABLE reservations AUTO_INCREMENT = 9;
