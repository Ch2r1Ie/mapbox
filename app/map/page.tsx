"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { MdLocationSearching } from "react-icons/md";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function Page() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const locateMe = () => {
    if (!mapRef.current || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      mapRef.current!.easeTo({
        center: [coords.longitude, coords.latitude],
        zoom: 14,
        duration: 1500,
      });
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [100.5018, 13.7563],
      zoom: 3,
      attributionControl: false,
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div ref={mapContainerRef} className="w-full h-full" />

      <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="bg-white w-8 h-8 rounded shadow text-xl cursor-pointer"
        >
          +
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="bg-white w-8 h-8 rounded shadow text-xl cursor-pointer"
        >
          −
        </button>
        <button
          onClick={locateMe}
          className="w-8 h-8 rounded flex items-center justify-center bg-white cursor-pointer"
        >
          <MdLocationSearching />
        </button>
      </div>
    </div>
  );
}
