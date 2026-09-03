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
    name: "Sedan",
    type: "Sedan",
    image: "/images/cars/sedan.jpeg",
    gallery: [
      "/images/cars/sedan/sedan.jpeg",
      "/images/cars/sedan/3re.jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.11 PM.jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.30 PM.jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.31 PM (1).jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.31 PM (2).jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.32 PM.jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.33 PM (1).jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.33 PM (2).jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.33 PM.jpeg",
      "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.34 PM (1).jpeg",
    ],
    features: [
      "Comfortable",
      "AC Available",
      "Clean Interior",
      "Experienced Driver",
      "Suitable for 1–4 Passengers",
    ],
  },
  {
    id: "suv",
    name: "SUV / Ertiga",
    type: "SUV",
    image: "/images/cars/ertiga.jpeg",
    gallery: [
      "/images/cars/suv/ertiga.jpeg",
      "/images/cars/suv/ertiga-2.jpeg",
      "/images/cars/suv/987uythg.jpeg",
      "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.27 PM.jpeg",
      "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.29 PM.jpeg",
      "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.32 PM (1).jpeg",
      "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.32 PM (2).jpeg",
    ],
    features: [
      "Spacious Interior",
      "AC Available",
      "Comfortable for Families",
      "Experienced Driver",
      "Suitable for Group Travel",
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

