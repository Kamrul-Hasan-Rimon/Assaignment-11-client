import React, { useEffect, useRef, useContext } from "react"; // Added useContext
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
import { ThemeContext } from "../context/ThemeProvider"; // Import ThemeContext

const LocationMap = () => {
  const mapRef = useRef(null);
  const { darkMode } = useContext(ThemeContext); // Get darkMode state

  useEffect(() => {
    if (!mapRef.current) return; // Ensure mapRef.current is available

    const mapCenter = fromLonLat([90.4125, 23.8103]); // Dhaka coordinates

    const vectorSource = new VectorSource();

    const locations = [
      {
        coordinates: [90.4125, 23.8103],
        title: "The Grand Luxe Hotel",
      },
      {
        coordinates: [90.4280, 23.8040],
        title: "Luxury Spa & Resort",
      },
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
            scale: 0.09,
          }),
        })
      );
      vectorSource.addFeature(pin);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: mapCenter,
        zoom: 14,
      }),
    });

    // Optional: Adjust map style for light/dark mode if needed
    // For OSM, the tiles are generally light. If you had a custom tile server
    // or wanted to apply a filter, you could do it here.
    // e.g., map.getLayers().forEach(layer => {
    //   if (layer instanceof TileLayer) {
    //     // layer.getSource().setAttributions('...'); // etc.
    //     // For some tile sources, you might apply CSS filters to mapRef.current
    //   }
    // });


    return () => {
      if (map) {
        map.setTarget(null); // Cleanup the map on unmount
      }
    };
  }, []); // No dependency on darkMode for map re-initialization, unless map tiles need to change

  const sectionClasses = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
    : "bg-gray-100 text-black"; // Light mode: light gray background, black text

  const paragraphClasses = darkMode
    ? "text-gray-300" // Lighter text for dark background
    : "text-gray-700"; // Darker text for light background

  return (
    <div className={`location-section py-12 ${sectionClasses}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text">
          Visit Us in the Heart of the City
        </h2>
        <p className={`mt-4 text-lg max-w-2xl mx-auto ${paragraphClasses}`}>
          Nestled in the vibrant heart of the city, our hotel is a haven of elegance and comfort.
          Experience seamless luxury and unmatched convenience with easy access to all major attractions.
        </p>
      </div>
      <div
        className={`map-container mt-10 rounded-lg overflow-hidden shadow-2xl mx-auto ${!darkMode ? 'border border-gray-300' : ''}`}
        style={{ height: "500px", width: "90%" }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default LocationMap;