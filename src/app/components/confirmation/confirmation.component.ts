import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  bookingData: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingData = this.bookingService.getBookingData();
  }

  ngOnDestroy(): void {
    this.bookingService.clearBooking();
  }
}
