package com.icinema.theatre.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shows")
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long movieId; // Reference to Movie in Movie Service

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "theatre_id")
    @JsonIgnoreProperties("shows")
    private Theatre theatre;

    private String startTime; // e.g., "10:00 AM"

    @Temporal(TemporalType.DATE)
    private Date date;

    private Integer totalSeats;
    private Double price;
}
