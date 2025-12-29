package com.icinema.movies.service;

import com.icinema.movies.model.Movie;
import com.icinema.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    public List<Movie> searchMovies(String query) {
        return movieRepository.findByTitleContainingIgnoreCase(query);
    }

    public List<Movie> filterMovies(Double minRating, String genre, String language) {
        // Simple filtering logic - in a real app, use Specification or clearer query method
        List<Movie> movies = movieRepository.findAll();
        
        if (minRating != null) {
            movies = movies.stream().filter(m -> m.getRating() >= minRating).toList();
        }
        if (genre != null && !genre.isEmpty()) {
            movies = movies.stream().filter(m -> m.getGenre().contains(genre)).toList();
        }
        if (language != null && !language.isEmpty()) {
            movies = movies.stream().filter(m -> m.getLanguage().equalsIgnoreCase(language)).toList();
        }
        return movies;
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
