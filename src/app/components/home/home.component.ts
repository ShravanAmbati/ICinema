import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/models';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  // Filters
  selectedGenre: string = '';
  selectedLanguage: string = '';
  selectedRating: number = 0;
  searchQuery: string = '';
  isSidebarOpen: boolean = true;

  genres: string[] = ['Action', 'Sci-Fi', 'Drama', 'Crime', 'Thriller', 'Adventure'];
  languages: string[] = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada'];

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;

      this.route.queryParams.subscribe(params => {
        if (params['q']) {
          this.searchQuery = params['q'];
          this.applyFilters();
        }
      });
    });
  }

  applyFilters() {
    this.filteredMovies = this.movies.filter(movie => {
      let matchesSearch = true;
      let matchesGenre = true;
      let matchesLanguage = true;
      let matchesRating = true;

      if (this.searchQuery) {
        matchesSearch = movie.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      }

      if (this.selectedGenre) {
        // Backend genre is a string (e.g. "Action, Drama" or just "Action")
        // We check if it contains the selected genre
        matchesGenre = movie.genre.includes(this.selectedGenre);
      }

      if (this.selectedLanguage) {
        matchesLanguage = movie.language === this.selectedLanguage;
      }

      if (this.selectedRating > 0) {
        matchesRating = movie.rating >= this.selectedRating;
      }

      return matchesSearch && matchesGenre && matchesLanguage && matchesRating;
    });
  }

  clearFilters() {
    this.selectedGenre = '';
    this.selectedLanguage = '';
    this.selectedRating = 0;
    this.searchQuery = '';
    this.filteredMovies = this.movies;
  }
}
