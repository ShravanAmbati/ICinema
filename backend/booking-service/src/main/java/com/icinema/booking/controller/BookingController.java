package com.icinema.booking.controller;

import com.icinema.booking.model.Booking;
import com.icinema.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setBookingDate(new Date());
        booking.setStatus("BOOKED");
        // In a real app, validate seats with Theatre/Seating Service here via RestTemplate/Feign
        return bookingRepository.save(booking);
    }

    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}
