import { Injectable } from '@angular/core';
import { Booking, SeatSelectionRequest, BookingPriceResponse } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/booking';
  private currentBooking: any | null = null; // Store temp data if needed

  constructor(private http: HttpClient) { }

  calculateBooking(request: SeatSelectionRequest): Observable<BookingPriceResponse> {
    return this.http.post<BookingPriceResponse>(`${this.baseUrl}/calculate`, request);
  }

  confirmBooking(request: SeatSelectionRequest): Observable<Booking> {
    // NOTE: backend confirm returns Booking entity.
    // But we ideally need to pass payment info later?
    // The current backend flow seems to be: Select Seats -> Calculate -> Confirm (create booking PENDING) -> Pay.
    return this.http.post<Booking>(`${this.baseUrl}/confirm`, request);
  }

  // Helper to store partial state across components if needed
  setBookingData(data: any) {
    this.currentBooking = data;
    localStorage.setItem('current_booking', JSON.stringify(data));
  }

  getBookingData() {
    if (!this.currentBooking) {
      const stored = localStorage.getItem('current_booking');
      if (stored) {
        this.currentBooking = JSON.parse(stored);
      }
    }
    return this.currentBooking;
  }

  pay(paymentRequest: any): Observable<string> {
    // Backend returns plain string
    return this.http.post('http://localhost:8080/payment/pay', paymentRequest, { responseType: 'text' });
  }

  clearBooking() {
    this.currentBooking = null;
    localStorage.removeItem('current_booking');
  }
}
