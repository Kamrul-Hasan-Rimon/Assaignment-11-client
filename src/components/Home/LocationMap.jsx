import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [35, 50],
  iconAnchor: [17, 50],
  popupAnchor: [0, -45],
  shadowSize: [50, 50],
});

L.Marker.prototype.options.icon = defaultIcon;

const LocationMap = () => {
  const position = [23.8103, 90.4125];

  return (
    <div className="location-section py-12 bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text">
          Visit Us in the Heart of the City
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Nestled in the vibrant heart of the city, our hotel is a haven of elegance and comfort.
          Experience seamless luxury and unmatched convenience with easy access to all major attractions.
        </p>
      </div>
      <div className="map-container mt-10 rounded-lg overflow-hidden shadow-2xl mx-auto" style={{ height: "500px", width: "90%" }}>
        <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <div className="text-black">
                <h3 className="font-bold text-lg">The Grand Luxe Hotel</h3>
                <p>Your gateway to luxury living.</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
