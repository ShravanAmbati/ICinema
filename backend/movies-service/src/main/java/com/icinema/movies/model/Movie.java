package com.icinema.movies.model;

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
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ElementCollection
    private List<String> genre;

    private String language;
    private Double rating;
    private String censorRating;

    @Column(length = 1000)
    private String description;

    private String image; // URL to the image

    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    private String duration; // e.g., "2h 28m"
}
