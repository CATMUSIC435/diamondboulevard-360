"use client";
import { useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const Mapbox = ({ lat = 10.82893655810392, lng = 106.71405486301626  }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const markersRef = useRef([]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/standard",
      center: [lng, lat],
      zoom: 15,
    });

    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className="relative h-[75vh] max-w-6xl w-full rounded-md overflow-hidden">
      <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
    </div>
  );
};

