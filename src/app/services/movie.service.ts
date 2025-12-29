import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, Show, Theatre, Seat } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }

  // Note: Backend endpoint is /api/Alltheatres/shows/{movieId} and returns TheatreDTO[]
  getTheatres(movieId: number): Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${this.baseUrl}/Alltheatres/shows/${movieId}`);
  }

  // Note: Backend TheatreDTO contains List<ShowDTOCopy>.
  // But we might need standard shows for a specific theatre?
  // Backend has: /api/Alltheatres/theatres/{theatreId}/shows -> returns ShowDTOCopy[]
  getShows(theatreId: number): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.baseUrl}/Alltheatres/theatres/${theatreId}/shows`);
  }

  getShow(showId: number): Observable<Show> {
    return this.http.get<Show>(`${this.baseUrl}/seats/show/${showId}`);
  }

  // Backend: /api/seats/{showId} -> returns SeatDTOCopy[]
  getSeats(showId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.baseUrl}/seats/${showId}`);
  }
}
