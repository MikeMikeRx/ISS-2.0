# 🛰️ ISS Live Tracker - v2.0

A React application that displays the real-time location of the International Space Station (ISS) on an interactive map.

The application shows details about the current position based on geographic coordinates, along with additional information such as orbital velocity and lighting status. The lighting status indicates whether the ISS is illuminated by the Sun (potentially visible from Earth under good conditions) or passing through Earth’s shadow.

It also includes advanced data, such as astronomical time in Julian Day format and information about the current solar position.

## API
- https://api.wheretheiss.at/v1/satellites/25544

## Tech Stack
- React 19 (vite)
- TypeScript
- Axios
- Leaflet (live map)

## Screenshots

### Index page
![shot-1](./public/screenshots/Shot-1.png)
### Advanced info
![shot-2](./public/screenshots/Shot-2.png)
### Status changed
![shot-3](./public/screenshots/Shot-3.png)

## Installation & Running the Project

### Prerequisites
- Node.js (v18)
- npm or yarn

### Installation
Clone the repository and install dependencies:
- git clone: https://github.com/MikeMikeRx/ISS-2.0.git
- cd iss-live-tracker
- npm install

Start the development server
- npm run dev

The application will be available at:
- http://localhost:5173