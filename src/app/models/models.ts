// Matches MovieDTOCopy
export interface Movie {
  movieId: number;
  name: string;
  language: string;
  releaseDate: string | Date; // Backend sends "yyyy-MM-dd"
  genre: string; // Backend sends comma separated string? or just string
  rating: number;
  censorRating: string;
  description: string;
  userRating?: number;
  // image: string; // Backend DTO doesn't have image? We might need to handle this.
}

// Matches TheatreDTO
export interface Theatre {
  theatreId: number;
  theatreName: string;
  location: string;
  movieId?: number;
  show?: Show[];
}

// Matches ShowDTOCopy
export interface Show {
  showId: number;
  showTime: string;
  showDate: string | Date;
  theatreId: number;
  movieId: number; // Added from backend update
}

// Matches SeatDTOCopy
export interface Seat {
  seatId: number;
  seatNumber: string;
  seatType: string;
  price: number;
  booked: boolean;
}

// Responses
export interface BookingPriceResponse {
  baseAmount: number;
  convenienceFee: number;
  gst: number;
  totalAmount: number;
}

// Requests
export interface SeatSelectionRequest {
  showId: number;
  seatIds: number[];
}

export interface PaymentRequest {
  bookingId: number;
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  seatIds: number[];
}

export interface Booking {
  bookingId?: number;
  showId?: number;
  numberOfSeats?: number;
  seatAmount?: number;
  convenienceFee?: number;
  gst?: number;
  totalAmount?: number;
  bookingStatus?: string;
}

