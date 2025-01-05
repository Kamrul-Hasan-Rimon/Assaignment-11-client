import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

const LocationMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapCenter = fromLonLat([90.4125, 23.8103]); // Dhaka coordinates

    // Create a vector source and layer for pins
    const vectorSource = new VectorSource();

    // Add pins (markers) to the vector source
    const locations = [
      {
        coordinates: [90.4125, 23.8103], // Dhaka
        title: "The Grand Luxe Hotel",
      },
      {
        coordinates: [90.4280, 23.8040], // Nearby location
        title: "Luxury Spa & Resort",
      },
    ];

    locations.forEach((location) => {
      const pin = new Feature({
        geometry: new Point(fromLonLat(location.coordinates)),
        title: location.title,
      });

      // Style the pin (custom marker icon)
      pin.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Custom pin icon URL
            scale: 0.09, // Resize the icon
          }),
        })
      );

      vectorSource.addFeature(pin);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Create and initialize the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap base layer
        }),
        vectorLayer, // Add the vector layer with pins
      ],
      view: new View({
        center: mapCenter,
        zoom: 14,
      }),
    });

    return () => map.setTarget(null); // Cleanup the map on unmount
  }, []);

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
      <div
        className="map-container mt-10 rounded-lg overflow-hidden shadow-2xl mx-auto"
        style={{ height: "500px", width: "90%" }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default LocationMap;
