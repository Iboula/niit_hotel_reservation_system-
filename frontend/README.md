# Hotel Reservation System - Frontend

A modern React TypeScript frontend for the Hotel Reservation System built with Vite.

## Features

- **Authentication**: Login and Registration with JWT token management
- **Room Browsing**: Search and filter available rooms
- **Reservations**: Create and manage room reservations
- **Admin Panel**: Manage rooms, view all reservations and guests
- **Protected Routes**: Role-based access control
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Client-side validation using react-hook-form
- **Toast Notifications**: User feedback for actions

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Toastify** - Toast notifications

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RoomCard.tsx
│   │   └── ReservationCard.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Rooms.tsx
│   │   ├── RoomDetails.tsx
│   │   ├── Reservations.tsx
│   │   └── AdminPanel.tsx
│   ├── services/           # API service layer
│   │   ├── apiService.ts
│   │   ├── authService.ts
│   │   ├── roomService.ts
│   │   ├── guestService.ts
│   │   └── reservationService.ts
│   ├── context/            # React Context
│   │   └── AuthContext.tsx
│   ├── utils/              # Utilities and types
│   │   ├── types.ts
│   │   └── constants.ts
│   ├── styles/             # CSS files
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on http://localhost:8080

### Installation

1. Navigate to the frontend directory:
```bash
cd hotel-reservation-system/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Available Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/rooms` - Browse available rooms
- `/rooms/:id` - Room details and booking
- `/reservations` - User's reservations (protected)
- `/admin` - Admin panel (admin only)

## API Integration

The frontend connects to the backend API at `http://localhost:8080/api`. The base URL can be configured in `src/utils/constants.ts`.

### Authentication

JWT tokens are stored in localStorage and automatically included in API requests via Axios interceptors.

## Key Features Implementation

### Authentication Flow
- User logs in → receives JWT token → stored in localStorage
- Token is automatically attached to all API requests
- Protected routes check authentication status
- Admin routes check for ROLE_ADMIN

### Room Booking
- Users can search and filter rooms
- View room details and availability
- Create reservations with date validation
- Calculate total price based on number of nights

### Admin Features
- Create, update, and delete rooms
- View all reservations
- Confirm or cancel reservations
- View all guests

## Development Notes

- The app uses React Context for global authentication state
- Axios interceptors handle token management and error responses
- Form validation is handled by react-hook-form
- Toast notifications provide user feedback
- CSS uses custom properties for consistent theming

## Environment Variables

No environment variables required. API URL is configured in constants.

## Troubleshooting

### CORS Issues
Make sure the backend has CORS enabled for http://localhost:3000

### API Connection
Verify the backend is running on http://localhost:8080

### Authentication Issues
Clear localStorage and try logging in again:
```javascript
localStorage.clear()
```

## License

This project is part of the Hotel Reservation System.
