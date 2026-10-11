import { supabase } from '../lib/supabase';
import { unstable_cache } from 'next/cache';

export type FleetCar = {
  id: string;
  name: string;
  type: string;
  image: string;
  gallery: string[];
  features: string[];
};

export const fallbackFleetData: FleetCar[] = [
  {
    id: "sedan",
    name: "Swift Dzire / Sedan",
    type: "Sedan",
    image: "/images/cars/dzire-malhar.jpeg",
    gallery: [
      "/images/cars/dzire-malhar.jpeg",
      "/images/cars/wedding-dzire.jpeg",
      "/images/cars/sedan.jpeg",
      "/images/cars/3re.jpeg",
    ],
    features: [
      "Comfortable & Clean Interior",
      "AC Available",
      "Verified & Experienced Driver",
      "Suitable for 1–4 Passengers",
      "GPS Tracked & Safe",
    ],
  },
  {
    id: "suv",
    name: "Maruti Ertiga",
    type: "SUV",
    image: "/images/cars/ertiga-highway.jpeg",
    gallery: [
      "/images/cars/ertiga-highway.jpeg",
      "/images/cars/wedding-ertiga-event.jpeg",
      "/images/cars/ertiga.jpeg",
      "/images/cars/ertiga-2.jpeg",
      "/images/cars/987uythg.jpeg",
    ],
    features: [
      "Spacious 6+1 Seating",
      "Multi-Zone AC",
      "Comfortable for Families & Groups",
      "Large Boot / Luggage Space",
      "Professional Highway Chauffeur",
    ],
  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    type: "Luxury SUV",
    image: "/images/cars/innova-crysta-hotel.jpeg",
    gallery: [
      "/images/cars/innova-crysta-hotel.jpeg",
      "/images/cars/hot-and-fast-office-crysta.jpeg",
    ],
    features: [
      "7+1 Seater with Captain Seats",
      "Premium Comfort & Luxury Ride",
      "Automatic Climate Control",
      "Ample Luggage Capacity",
      "Ideal for VIP, Outstation & Tours",
    ],
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    type: "Tempo Traveller",
    image: "/images/cars/tempo-traveller-mountains.jpeg",
    gallery: [
      "/images/cars/tempo-traveller-mountains.jpeg",
    ],
    features: [
      "12-26 Seater Luxury Seating",
      "Pushback Recliner Seats",
      "High-End Audio System",
      "Spacious Luggage Carrier",
      "Perfect for Pilgrimage & Group Tours",
    ],
  },
  {
    id: "force-urbania",
    name: "Force Urbania",
    type: "Executive Luxury Van",
    image: "/images/cars/force-urbania-hotel.jpeg",
    gallery: [
      "/images/cars/force-urbania-hotel.jpeg",
      "/images/cars/force-urbania-sunset.jpeg",
    ],
    features: [
      "13-17 Seater Executive Class",
      "Individual AC Vents & USB Ports",
      "Ultra-Smooth Air Suspension Ride",
      "Panoramic View Windows",
      "Best for Corporate VIP & Luxury Travel",
    ],
  },
];

export const getFleetData = unstable_cache(
  async (): Promise<FleetCar[]> => {
    try {
      const { data, error } = await supabase.from('fleet').select('*').order('id', { ascending: true });
      
      if (error || !data || data.length === 0) {
        return fallbackFleetData;
      }

      return data as FleetCar[];
    } catch (err) {
      console.error("Error fetching fleet, using fallback", err);
      return fallbackFleetData;
    }
  },
  ['fleet-data'],
  { revalidate: 3600, tags: ['fleet'] } // Cache for 1 hour, can be revalidated via tags
);


