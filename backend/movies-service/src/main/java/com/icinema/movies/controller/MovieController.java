package com.icinema.movies.controller;

import com.icinema.movies.model.Movie;
import com.icinema.movies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "*") // Allow Angular app to access
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies(
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language) {
        if (rating != null || genre != null || language != null) {
            return movieService.filterMovies(rating, genre, language);
        }
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String query) {
        return movieService.searchMovies(query);
    }

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }
}
