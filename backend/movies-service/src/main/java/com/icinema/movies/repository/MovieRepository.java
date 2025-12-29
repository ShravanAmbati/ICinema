package com.icinema.movies.repository;

import com.icinema.movies.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByGenreContaining(String genre);
    List<Movie> findByLanguage(String language);
    List<Movie> findByRatingGreaterThanEqual(Double rating);
}
