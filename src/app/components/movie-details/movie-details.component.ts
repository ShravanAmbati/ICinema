import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/models';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;
  userRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(m => {
      this.movie = m;
      if (!this.movie) {
        // Handle not found
        alert('Movie not found');
        this.router.navigate(['/']);
      }
    });
  }

  bookTicket() {
    if (this.movie) {
      this.router.navigate(['/movie', this.movie.movieId, 'shows']);
    }
  }

  submitRating() {
    if (this.userRating > 0 && this.userRating <= 5) {
      alert(`Thank you for rating "${this.movie?.name}" ${this.userRating} stars!`);
      // Update local storage or service if needed
    } else {
      alert('Please enter a rating between 1 and 5');
    }
  }
}
