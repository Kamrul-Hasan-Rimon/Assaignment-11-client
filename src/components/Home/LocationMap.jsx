import React, { useEffect, useRef, useContext } from "react";
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
import { ThemeContext } from "../context/ThemeProvider"; 

const LocationMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); 
  const { darkMode } = useContext(ThemeContext);

  const mapCoordinates = [90.4125, 23.8103]; // Store coordinates for easy use

  useEffect(() => {
    // Initialize map only once
    if (mapRef.current && !mapInstance.current) {
      const mapCenter = fromLonLat(mapCoordinates);
      const vectorSource = new VectorSource();
      const locations = [
        { coordinates: [90.4125, 23.8103], title: "The Grand Luxe Hotel" },
        { coordinates: [90.4280, 23.8040], title: "Luxury Spa & Resort" },
      ];

      locations.forEach((location) => {
        const pin = new Feature({
          geometry: new Point(fromLonLat(location.coordinates)),
          title: location.title,
        });
        pin.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.07,
              anchor: [0.5, 1], 
            }),
          })
        );
        vectorSource.addFeature(pin);
      });

      const vectorLayer = new VectorLayer({ source: vectorSource });

      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() }), vectorLayer],
        view: new View({ center: mapCenter, zoom: 14 }), // Slightly more zoomed in
      });
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
    };
  }, []); 

  const sectionClasses = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
    : "bg-gray-100 text-black";
  const paragraphClasses = darkMode ? "text-gray-300" : "text-gray-700";
  const subtitleClasses = darkMode ? "text-gray-400" : "text-gray-600";
  const mapBorderColor = darkMode ? 'border-gray-700' : 'border-gray-300';

  const exploreButtonClass = "inline-block mt-6 sm:mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl";

  // Google Maps link
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${mapCoordinates[1]},${mapCoordinates[0]}`;

  return (
    <div className={`location-section py-12 md:py-20 ${sectionClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 lg:items-center">

          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text mb-3 md:mb-4">
              Visit Us
            </h2>
            <p className={`text-sm sm:text-base max-w-lg mx-auto lg:mx-0 ${subtitleClasses} mb-4 md:mb-6`}>
              Find our prime location easily and explore the vibrant surroundings.
              We are conveniently situated for both leisure and business travelers.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed ${paragraphClasses} max-w-lg mx-auto lg:mx-0`}>
              Nestled in the vibrant heart of the city, our hotel is a haven of elegance and comfort, offering seamless access to major attractions.
            </p>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={exploreButtonClass}
            >
              Explore Location
            </a>
          </div>

          <div className="lg:order-last"> {/* Ensure map is on the right on large screens */}
            <div
              className={`map-container rounded-lg overflow-hidden shadow-2xl w-full border ${mapBorderColor}`}
              style={{ height: "350px" }} // Mobile height
            >
              <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LocationMap;