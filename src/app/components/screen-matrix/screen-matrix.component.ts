import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, Movie, Seat, Show, Theatre } from 'src/app/models/models';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-screen-matrix',
  templateUrl: './screen-matrix.component.html',
  styleUrls: ['./screen-matrix.component.css']
})
export class ScreenMatrixComponent implements OnInit {
  mode: 'shows' | 'seats' = 'shows';
  movieId: number = 0;
  showId: number = 0;

  movie: Movie | undefined;
  theatres: Theatre[] = [];
  shows: Show[] = [];
  showsByTheatre: { theatre: Theatre, shows: Show[] }[] = [];

  currentShow: Show | undefined;
  seats: Seat[] = [];
  selectedSeats: Seat[] = [];
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    // Determine mode based on URL
    const url = this.route.snapshot.url[0].path;
    if (url === 'movie') {
      this.mode = 'shows';
      this.movieId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadShowsData();
    } else {
      this.mode = 'seats';
      this.showId = Number(this.route.snapshot.paramMap.get('showId'));
      this.loadSeatsData();
    }
  }

  loadShowsData() {
    this.movieService.getMovie(this.movieId).subscribe(m => this.movie = m);
    this.movieService.getTheatres(this.movieId).subscribe(theatres => {
      this.theatres = theatres;
      this.theatres.forEach(t => {
        // Backend DTO structure for TheatreDTO contains List<ShowDTOCopy> directly.
        // check TheatreDTO structure from my previous files.
        // TheatreDTO has `show: ShowDTOCopy[]`
        if (t.show && t.show.length > 0) {
          this.showsByTheatre.push({ theatre: t, shows: t.show });
        }
      });
    });
  }

  loadSeatsData() {
    // Current flow: we have showId.
    // Need show details (backend doesn't have direct getShow(id), but we can iterate or use what we have)
    // Actually backend has getSeats(showId).
    // Let's assume we pass show details via state or fetch them.
    // For now, I'll fetch seats.
    this.movieService.getSeats(this.showId).subscribe(seats => this.seats = seats);

    // I also need movie details for the header.
    // Since I don't have show details easily from just showId via API (unless I search), 
    // I might rely on data passed or generic fetch.
    // Let's try to fetch movie if we have ID stored, otherwise skip or fetch dummy.
    // But wait, the route param only has showId.
    // I can't easily get movie details from just showId with current service unless I add a method.
    // I'll skip movie title in header or store it in service.
  }

  selectShow(show: Show) {
    this.router.navigate(['/show', show.showId]);
  }

  toggleSeat(seat: Seat) {
    if (seat.booked) return;

    // Toggle logic. "selected" is not in backend DTO, so we manage it locally.
    // I can extend the seat object locally or use a set.
    const index = this.selectedSeats.findIndex(s => s.seatId === seat.seatId);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      // create a local property for UI if needed, or use a separate set
    } else {
      if (this.selectedSeats.length >= 10) {
        alert("You can only select up to 10 seats.");
        return;
      }
      this.selectedSeats.push(seat);
    }
    // Update total price locally for display?
    // Backend calculates dynamic price. I'll just sum base price for now.
    this.totalPrice = this.selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }

  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some(s => s.seatId === seat.seatId);
  }

  proceedToPayment() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const seatIds = this.selectedSeats.map(s => s.seatId);
    const request = { showId: this.showId, seatIds: seatIds };

    this.bookingService.calculateBooking(request).subscribe({
      next: (response) => {
        // Store data and navigate to summary
        this.bookingService.setBookingData({
          response: response,
          request: request,
          showId: this.showId,
          selectedSeats: this.selectedSeats
        });
        this.router.navigate(['/booking']); // To booking summary/confirmation component
      },
      error: (err) => {
        console.error(err);
        alert("Error calculating price. Please try again.");
      }
    });
  }
}
