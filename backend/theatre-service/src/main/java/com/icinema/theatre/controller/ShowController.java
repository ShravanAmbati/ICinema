package com.icinema.theatre.controller;

import com.icinema.theatre.model.Show;
import com.icinema.theatre.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/shows")
@CrossOrigin(origins = "*")
public class ShowController {

    @Autowired
    private ShowRepository showRepository;

    @GetMapping
    public List<Show> getShows(
            @RequestParam(required = false) Long movieId,
            @RequestParam(required = false) Long theatreId) {
        
        List<Show> shows = showRepository.findAll();

        if (movieId != null) {
            shows = shows.stream().filter(s -> s.getMovieId().equals(movieId)).collect(Collectors.toList());
        }
        if (theatreId != null) {
            shows = shows.stream().filter(s -> s.getTheatre().getId().equals(theatreId)).collect(Collectors.toList());
        }
        return shows;
    }

    @GetMapping("/{id}")
    public Show getShowById(@PathVariable Long id) {
        return showRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Show createShow(@RequestBody Show show) {
        return showRepository.save(show);
    }
}
