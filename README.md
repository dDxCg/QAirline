# QAirline

## Project Description

QAirline is a backend system designed to manage airline operations. It provides functionalities for user authentication, profile management, flight scheduling, plane management, seat availability, and ticket booking.

## Features and Functionality

- **User Authentication:**
  - Registration: Allows users to create new accounts with username, email, and password. Password hashing is implemented using bcrypt.
  - Login: Authenticates existing users and generates a JWT token for authorization.
  - Guest Access: Provides temporary access without registration using guest tokens.
- **Profile Management:**
  - User Information: Retrieves user profile information using account UUID.
  - Profile Update: Allows users to update their profile details, including full name, date of birth, gender, nationality, ID number, passport number, passport expiry date, and phone number.
  - Account Deletion: Allows users to delete their accounts.
- **Flight Management:**
  - Flight Creation: Enables administrators to create new flights with origin, destination, departure time, arrival time, and plane ID.
  - Flight Retrieval: Fetches all flights, flights by ID, or flights by origin and destination.
  - Flight Update: Allows administrators to update flight details.
  - Flight Deletion: Provides options for safe deletion (soft delete) and force deletion (hard delete).
- **Plane Management:**
  - Plane Creation: Enables administrators to create new plane records, including model, capacity, manufacturer, and seat map.
  - Plane Update: Allows administrators to update plane details.
  - Plane Retrieval: Fetches plane details by ID.
  - Plane Deletion: Provides options for safe deletion and force deletion.
- **Seat Management:**
  - Seat Availability: Retrieves available seats for a specific flight.
  - Price Update: Allows administrators to update seat prices by class for a flight.
- **Ticket Booking:**
  - Ticket Booking: Allows users to book tickets for a flight, specifying seat row and column.
  - Ticket Retrieval: Fetches ticket details by ID or user ID.
  - Passenger Information: Creates and retrieves passenger information associated with a ticket.
  - Ticket Deletion: Allows users to delete tickets.

## Technology Stack

- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL
  - bcrypt
  - jsonwebtoken
  - dotenv
  - helmet
  - morgan
  - compression
- **Frontend:**
  - React
  - TypeScript
  - Vite

## Prerequisites

- Node.js (v16 or higher)
- npm (or yarn)
- PostgreSQL
- dotenv for environment variables

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dDxCg/QAirline.git
    cd QAirline
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables, replacing the values with your PostgreSQL credentials:

      ```
      DB_HOST=your_db_host
      DB_PORT=your_db_port
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      JWT_SECRET=your_jwt_secret
      JWT_LOGIN_EXPIRATION=1h
      JWT_GUEST_EXPIRATION=1h
      JWT_REGISTER_EXPIRATION=1h
      PORT=5000
      ```

4.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

## Usage Guide

1.  **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**

    ```bash
    cd frontend
    npm run dev
    ```

The frontend application will be available at `http://localhost:5173` (or the port specified by Vite). The backend API will be available at `http://localhost:5000/api/...` (or the port specified in your .env file).

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication

- **Register:** `POST /api/auth/register`

  - Request Body:

    ```json
    {
      "username": "your_username",
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```

  - Response:

    ```json
    {
      "message": "Register successful"
    }
    ```

- **Login:** `POST /api/auth/login`

  - Request Body:

    ```json
    {
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```

  - Response:

    ```json
    {
      "message": "Login successful",
      "token": "your_jwt_token"
    }
    ```

- **Guest Access:** `POST /api/auth/guest`

  - Response:

    ```json
    {
      "message": "Guest access granted",
      "token": "guest_jwt_token"
    }
    ```

### Profile

- **Get User Info:** `GET /api/profile/info` (Requires authentication)

  - Request Body:

    ```json
    {
      "account_uuid": "user_uuid"
    }
    ```

  - Response:

    ```json
    {
      //user profile data
    }
    ```

- **Update Profile:** `PUT /api/profile/update` (Requires authentication)

  - Request Body:

    ```json
    {
      "full_name": "Your Name",
      "date_of_birth": "2000-01-01",
      "gender": "Male",
      "nationality": "Your Nationality",
      "id_number": "Your ID",
      "passport_number": "Your Passport",
      "passport_expiry_date": "2025-01-01",
      "phone_number": "Your Phone",
      "account_uuid": "user_uuid"
    }
    ```

  - Response:

    ```json
    {
      "message": "Profile updated successfully",
      "token": "your_jwt_token"
    }
    ```

- **Delete Account:** `DELETE /api/profile/delete` (Requires authentication)

  - Request Body:

    ```json
    {
      "account_uuid": "user_uuid"
    }
    ```

  - Response:

    ```json
    {
      "message": "Account deleted successfully"
    }
    ```

### Flight

- **Create Flight:** `POST /api/flight/create` (Requires authentication and admin role)

  - Request Body:

    ```json
    {
      "origin": "Origin Airport",
      "destination": "Destination Airport",
      "departureTime": "2024-01-01T10:00:00.000Z",
      "arrivalTime": "2024-01-01T12:00:00.000Z",
      "plane_id": 1
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Flight created successfully.",
      "flight": {
        //flight data
      }
    }
    ```

- **Get All Flights:** `GET /api/flight/all`

  - Response:

    ```json
    {
      "success": true,
      "message": "Flights retrieved successfully.",
      "flights": [
        //array of flight data
      ]
    }
    ```

- **Get Flight by ID:** `GET /api/flight/search-id`

  - Request Body:

    ```json
    {
      "flight_id": "flight_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Get flight successfully.",
      "flight": {
        //flight data
      }
    }
    ```

- **Get Flights by Origin and Destination:** `GET /api/flight/search-locations`

  - Request Body:

    ```json
    {
      "origin": "Origin Airport",
      "destination": "Destination Airport"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Flights retrieved successfully.",
      "flights": [
        //array of flight data
      ]
    }
    ```

- **Update Flight:** `PUT /api/flight/update` (Requires authentication and admin role)

  - Request Body:

    ```json
    {
      "flightId": "flight_uuid",
      "origin": "New Origin Airport",
      "destination": "New Destination Airport",
      "departureTime": "2024-01-02T10:00:00.000Z",
      "arrivalTime": "2024-01-02T12:00:00.000Z",
      "planeId": 2,
      "status": "active"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Flight updated successfully.",
      "flight": {
        //flight data
      }
    }
    ```

- **Delete Flight (Safe):** `DELETE /api/flight/delete-safe` (Requires authentication and admin role)

  - Request Body:

    ```json
    {
      "flight_id": "flight_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Flight deleted successfully.",
      "flight": {
        //deleted flight data
      }
    }
    ```

- **Delete Flight (Force):** `DELETE /api/flight/delete-force` (Requires authentication and admin role)

  - Request Body:

    ```json
    {
      "flight_id": "flight_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Flight deleted successfully.",
      "flight": {
        //deleted flight data
      }
    }
    ```

### Plane

- **Create Plane:** `POST /api/plane/create` (Requires authentication and admin role)

  - Request Body:

    ```json
    {
      "model": "Boeing 747",
      "capacity": 400,
      "manufacturer": "Boeing",
      "seat_map": {
        "1-10": {
          "A": { "class": "economy" },
          "B": { "class": "economy" },
          "C": { "class": "economy" },
          "D": { "class": "economy" }
        }
      }
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Plane created successfully.",
      "plane": {
        //plane data
      }
    }
    ```

- **Update Plane:** `PUT /api/plane/update` (Requires authentication and admin role)

  - Request Body:

    ```json
    {
      "plane_id": 1,
      "model": "Boeing 747-8",
      "capacity": 450,
      "manufacturer": "Boeing",
      "seat_map": {
        "1-10": {
          "A": { "class": "economy" },
          "B": { "class": "economy" },
          "C": { "class": "economy" },
          "D": { "class": "economy" }
        }
      }
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Plane updated successfully.",
      "plane": {
        //plane data
      }
    }
    ```

- **Get Plane by ID:** `GET /api/plane/:plane_id` (Requires authentication and admin role)

  - Parameters:

    - `plane_id`: The ID of the plane to retrieve.

  - Response:

    ```json
    {
      "success": true,
      "plane": {
        //plane data
      }
    }
    ```

- **Delete Plane (Safe):** `DELETE /api/plane/delete-safe/:plane_id` (Requires authentication and admin role)

  - Parameters:

    - `plane_id`: The ID of the plane to delete.

  - Response:

    ```json
    {
      "success": true,
      "message": "Plane deleted successfully."
    }
    ```

- **Delete Plane (Force):** `DELETE /api/plane/delete-force/:plane_id` (Requires authentication and admin role)

  - Parameters:

    - `plane_id`: The ID of the plane to delete.

  - Response:

    ```json
    {
      "success": true,
      "message": "Plane deleted successfully."
    }
    ```

### Seat

- **Get Available Seats:** `GET /api/seat/available-seats`

  - Request Body:

    ```json
    {
      "flight_uuid": "flight_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Seats get successfully.",
      "seats": [
        //array of seat objects
      ]
    }
    ```

- **Update Price by Class:** `PUT /api/seat/update-price`

  - Request Body:

    ```json
    {
      "flight_uuid": "flight_uuid",
      "seat_class": "economy",
      "price": 150.0
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Seats price updated successfully.",
      "seat": {
        // seat data
      }
    }
    ```

### Booking

- **Book Ticket:** `POST /api/ticket/booking`

  - Request Body (Example for creating a new passenger info):

    ```json
    {
      "is_fetch": false,
      "flight_uuid": "flight_uuid",
      "seat_row": 1,
      "seat_column": "A",
      "user_uuid": "user_uuid",
      "full_name": "Your Name",
      "email": "your_email@example.com",
      "phone_number": "Your Phone",
      "date_of_birth": "2000-01-01",
      "gender": "Male",
      "nationality": "Your Nationality",
      "id_number": "Your ID",
      "passport_number": "Your Passport",
      "passport_expiry_date": "2025-01-01"
    }
    ```

  - Request Body (Example for fetching existing passenger info):

    ```json
    {
      "is_fetch": true,
      "flight_uuid": "flight_uuid",
      "seat_row": 1,
      "seat_column": "A",
      "user_uuid": "user_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Booking successful",
      "ticket": {
        "seat_row": 1,
        "seat_column": "A",
        "price": 150.0,
        "flight_uuid": "flight_uuid",
        "ticket_uuid": "ticket_uuid"
      }
    }
    ```

- **Get Ticket by ID:** `GET /api/ticket/get-id`

  - Request Body:

    ```json
    {
      "ticket_id": "ticket_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Ticket retrieved successfully",
      "ticket": [
        // array of ticket objects
      ]
    }
    ```

- **Get Tickets by User ID:** `GET /api/ticket/user-tickets` (Requires authentication and user/admin role)

  - Request Body:

    ```json
    {
      "user_id": "user_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Tickets retrieved successfully",
      "tickets": [
        //array of ticket objects
      ]
    }
    ```

- **Get Passenger by Ticket ID:** `GET /api/ticket/passenger`

  - Request Body:

    ```json
    {
      "ticket_id": "ticket_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Passenger retrieved successfully",
      "passenger": {
        "full_name": "Your Name",
        "email": "your_email@example.com",
        "phone_number": "Your Phone",
        "date_of_birth": "2000-01-01",
        "gender": "Male",
        "nationality": "Your Nationality",
        "id_number": "Your ID",
        "passport_number": "Your Passport",
        "passport_expiry_date": "2025-01-01"
      }
    }
    ```

- **Delete Ticket:** `DELETE /api/ticket/delete`

  - Request Body:

    ```json
    {
      "ticket_id": "ticket_uuid"
    }
    ```

  - Response:

    ```json
    {
      "success": true,
      "message": "Ticket deleted successfully"
    }
    ```

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

## License Information

License not specified.

## Contact/Support Information

For questions or support, please contact: [dDxCg](https://github.com/dDxCg).
