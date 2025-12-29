import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, Movie, Show, Theatre, BookingPriceResponse } from 'src/app/models/models';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingData: any;
  bookingResponse: BookingPriceResponse | undefined;
  movie: Movie | undefined;
  // theatre: Theatre | undefined; // Theatre info needs to be fetched
  // show: Show | undefined;

  constructor(
    private bookingService: BookingService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookingData = this.bookingService.getBookingData();
    if (!this.bookingData) {
      alert('No booking found. Redirecting to home.');
      this.router.navigate(['/']);
      return;
    }

    this.bookingResponse = this.bookingData.response;
    const showId = this.bookingData.showId;

    // Fetch details for display.
    // In a real app we might store these in state to avoid re-fetching
    // For now, fetch generic movie info.
    // We need movieId. `bookingData` doesn't strictly have it unless we put it there in previous component.
    // Previous component `ScreenMatrix` passed `request` (showId, seats).
    // We need to fetch show -> then movie.
    // Or just use what we have if backend calculation response included it (it returns price only).

    // I will rely on fetching show details again or fixing flow later.
    // Let's safe fetch:
    this.movieService.getShow(showId).subscribe(show => {
      if (show) {
        this.movieService.getMovie(show.movieId).subscribe(m => this.movie = m);
        // Theatre info...
      }
    });
  }

  proceedToPayment() {
    // Call confirm endpoint to create booking
    this.bookingService.confirmBooking(this.bookingData.request).subscribe({
      next: (booking: Booking) => {
        // Update stored data with actual booking ID
        this.bookingService.setBookingData({
          ...this.bookingData,
          bookingId: booking.bookingId, // Backend returns bookingId
          finalBooking: booking
        });
        this.router.navigate(['/payment']);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to confirm booking. Please try again.");
      }
    });
  }
}
