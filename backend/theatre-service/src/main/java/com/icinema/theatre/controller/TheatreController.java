package com.icinema.theatre.controller;

import com.icinema.theatre.model.Show;
import com.icinema.theatre.model.Theatre;
import com.icinema.theatre.repository.ShowRepository;
import com.icinema.theatre.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/theatres")
@CrossOrigin(origins = "*")
public class TheatreController {

    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private ShowRepository showRepository;

    @GetMapping
    public List<Theatre> getTheatres(@RequestParam(required = false) Long movieId) {
        if (movieId != null) {
            // Find theatres showing this movie
            return showRepository.findByMovieId(movieId).stream()
                    .map(Show::getTheatre)
                    .distinct()
                    .collect(Collectors.toList());
        }
        return theatreRepository.findAll();
    }

    @PostMapping
    public Theatre createTheatre(@RequestBody Theatre theatre) {
        return theatreRepository.save(theatre);
    }
}
