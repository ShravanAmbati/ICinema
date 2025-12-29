package com.icinema.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long showId;
    private Long userId; // Assuming we have user ID from somewhere (simulated)

    @ElementCollection
    private List<String> seats;

    private Double totalPrice;
    private String status; // BOOKED, CANCELLED, PENDING

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookingDate;
}
