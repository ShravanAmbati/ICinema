import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/models';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  bookingData: any;
  cardType: 'credit' | 'debit' = 'debit';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  discount: number = 0;
  finalAmount: number = 0;

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.bookingData = this.bookingService.getBookingData();
    if (!this.bookingData || !this.bookingData.finalBooking) {
      this.router.navigate(['/']);
      return;
    }
    this.calculateFinalAmount();
  }

  calculateFinalAmount() {
    if (this.bookingData && this.bookingData.finalBooking) {
      const amount = this.bookingData.finalBooking.totalAmount;
      if (this.cardType === 'credit') {
        this.discount = amount * 0.10;
      } else {
        this.discount = amount * 0.05;
      }
      this.finalAmount = amount - this.discount;
    }
  }

  processPayment() {
    // Validation
    const cardNum = this.cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNum)) {
      alert('Card number must be 16 digits.');
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiryDate)) {
      alert('Expiration date must be in MM/YY format.');
      return;
    }

    // Future date check
    const [month, year] = this.expiryDate.split('/').map(Number);
    const now = new Date();
    const currentYear = Number(now.getFullYear().toString().slice(-2));
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert('Card has expired.');
      return;
    }

    if (!/^\d{3}$/.test(this.cvv)) {
      alert('CVV must be 3 digits.');
      return;
    }

    // Prepare PaymentDTO
    const paymentRequest = {
      bookingId: this.bookingData.bookingId,
      cardType: this.cardType,
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv,
      seatIds: this.bookingData.selectedSeats.map((s: any) => s.seatId)
    };

    // Call Service
    this.bookingService.pay(paymentRequest).subscribe({
      next: (response) => {
        // Success
        alert(response); // "Payment Successful"
        this.router.navigate(['/confirmation']);
      },
      error: (err) => {
        console.error(err);
        alert("Payment failed: " + (err.error || "Unknown error"));
      }
    });

  }
}
