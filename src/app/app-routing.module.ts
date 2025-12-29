import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ScreenMatrixComponent } from './components/screen-matrix/screen-matrix.component';
import { BookingComponent } from './components/booking/booking.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movie/:id/shows', component: ScreenMatrixComponent },
  { path: 'show/:showId', component: ScreenMatrixComponent }, // Seat selection
  { path: 'summary', component: BookingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
