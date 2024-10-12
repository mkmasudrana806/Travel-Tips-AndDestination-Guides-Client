"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { popularLocations } from "@/constant";

export default function TravelMap() {
  //   const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">
          Map placeholder - Integration with a map library like Google Maps or
          Mapbox would go here
        </p>
      </div>
      {popularLocations?.map((location) => (
        <Popover key={location.id}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute"
              style={{
                top: `${(1 - (location.lat + 90) / 180) * 100}%`,
                left: `${((location.lng + 180) / 360) * 100}%`,
              }}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h3 className="font-bold">{location.name}</h3>
            <p>
              Lat: {location.lat}, Lng: {location.lng}
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
