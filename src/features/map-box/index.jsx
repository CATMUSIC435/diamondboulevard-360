"use client";
import { useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const Mapbox = ({ lat = 10.94510184584269, lng = 106.70748149217238  }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const markerRef = useRef([]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/standard",
      center: [lng, lat],
      zoom: 15,
    });

mapRef.current.on("load", () => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div class="relative flex h-10 w-10 items-center justify-center">
          <div class="absolute h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75"></div>
          <div class="relative h-4 w-4 rounded-full bg-indigo-600 border-2 border-white shadow-lg"></div>
        </div>
      `;

      markerRef.current = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3 style="color: black; font-weight: bold;">Diamond Boulevard</h3><p style="color: gray; font-size: 12px;">Vị trí dự án</p>`)
        )
        .addTo(mapRef.current);
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div className="relative h-[75vh] max-w-6xl w-full rounded-md overflow-hidden">
      <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
    </div>
  );
};

