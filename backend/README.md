# I-Cinema Backend

This folder contains the microservices for the I-Cinema application.

## Structure
- **gateway-service**: Spring Cloud Gateway (Port 8080). Acts as the entry point API Gateway.
- **movies-service**: Manages movies (Port 8081).
- **theatre-service**: Manages theatres and shows (Port 8082).
- **booking-service**: Manages bookings (Port 8083).

## Prerequisites
- Java 17+
- Maven
- MySQL Database (Ensure databases `icinema_movies`, `icinema_theatre`, `icinema_booking` exist or user has create permissions)
- Consul (Optional, but configured for service discovery. If not running, access services directly or via Gateway if fallback is configured).

## How to Run
For each service, navigate to the directory and run:

```bash
mvn spring-boot:run
```

## API Endpoints (via Gateway)

- **Movies**: `http://localhost:8080/movies`
- **Theatres**: `http://localhost:8080/theatres`
- **Shows**: `http://localhost:8080/shows`
- **Bookings**: `http://localhost:8080/bookings`

## Implementation Notes
- **Movies Service**: Implements CRUD and Search/Filter logic.
- **Theatre Service**: Implements Theatres and Shows logic.
- **Booking Service**: Implements Booking logic.
- **Seating**: Currently simplified within Theatre/Booking services.
