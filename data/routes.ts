import { supabase } from '../lib/supabase';
import { unstable_cache } from 'next/cache';

export type RouteData = {
  slug: string;
  from: string;
  to: string;
  title: string;
  description: string;
  oneWay: {
    sedan: number | string;
    suv: number | string;
  };
  roundTrip: {
    sedan: number | string;
    suv: number | string;
    ac?: number | string;
  };
  returnAvailable: boolean;
  relatedRoutes?: string[];
  popular?: boolean;
};

export const fallbackRoutesData: RouteData[] = [
  {
    slug: "indore-to-ujjain",
    from: "Indore",
    to: "Ujjain",
    title: "Indore to Ujjain Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Ujjain taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 1350, suv: 1700 },
    roundTrip: { sedan: 2700, suv: 3200 },
    returnAvailable: true,
    relatedRoutes: ["ujjain-to-indore", "ujjain-to-omkareshwar", "indore-to-omkareshwar"],
    popular: true
  },
  {
    slug: "ujjain-to-omkareshwar",
    from: "Ujjain",
    to: "Omkareshwar",
    title: "Ujjain to Omkareshwar Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Ujjain to Omkareshwar taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2500, suv: 3000 },
    roundTrip: { sedan: 4000, suv: "Contact for current fare", ac: 4500 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-ujjain", "indore-to-omkareshwar"],
  },
  {
    slug: "indore-to-omkareshwar",
    from: "Indore",
    to: "Omkareshwar",
    title: "Indore to Omkareshwar Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Omkareshwar taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 1600, suv: 1850 },
    roundTrip: { sedan: 3000, suv: 3500 },
    returnAvailable: true,
    relatedRoutes: ["omkareshwar-to-indore", "ujjain-to-omkareshwar", "indore-to-ujjain"],
    popular: true
  },
  {
    slug: "indore-to-bhopal",
    from: "Indore",
    to: "Bhopal",
    title: "Indore to Bhopal Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Bhopal taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2500, suv: 3000 },
    roundTrip: { sedan: 5000, suv: 6000 },
    returnAvailable: true,
    relatedRoutes: ["bhopal-to-indore", "indore-to-ujjain"],
    popular: true
  },
  {
    slug: "indore-to-khandwa",
    from: "Indore",
    to: "Khandwa",
    title: "Indore to Khandwa Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Khandwa taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2300, suv: 2600 },
    roundTrip: { sedan: 3500, suv: 4000 },
    returnAvailable: true,
    relatedRoutes: ["khandwa-to-indore", "indore-to-burhanpur"],
    popular: true
  },
  {
    slug: "indore-to-burhanpur",
    from: "Indore",
    to: "Burhanpur",
    title: "Indore to Burhanpur Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Burhanpur taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 3500, suv: 4000 },
    roundTrip: { sedan: 4500, suv: 6000 },
    returnAvailable: true,
    relatedRoutes: ["burhanpur-to-indore", "indore-to-khandwa"],
    popular: true
  },
  {
    slug: "indore-to-ratlam",
    from: "Indore",
    to: "Ratlam",
    title: "Indore to Ratlam Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Ratlam taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2800, suv: 3500 },
    roundTrip: { sedan: 3800, suv: 4500 },
    returnAvailable: true,
    relatedRoutes: ["ratlam-to-indore", "indore-to-mandsaur"],
    popular: true
  },
  {
    slug: "indore-to-mandsaur",
    from: "Indore",
    to: "Mandsaur",
    title: "Indore to Mandsaur Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Mandsaur taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 3500, suv: 4500 },
    roundTrip: { sedan: 5500, suv: 7000 },
    returnAvailable: true,
    relatedRoutes: ["mandsaur-to-indore", "indore-to-neemuch", "indore-to-ratlam"],
    popular: true
  },
  {
    slug: "indore-to-neemuch",
    from: "Indore",
    to: "Neemuch",
    title: "Indore to Neemuch Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Indore to Neemuch taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 4000, suv: 5000 },
    roundTrip: { sedan: 6000, suv: 7500 },
    returnAvailable: true,
    relatedRoutes: ["neemuch-to-indore", "indore-to-mandsaur"],
    popular: true
  },
  {
    slug: "ujjain-to-indore",
    from: "Ujjain",
    to: "Indore",
    title: "Ujjain to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Ujjain to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 1350, suv: 1700 },
    roundTrip: { sedan: 2700, suv: 3200 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-ujjain", "ujjain-to-omkareshwar"],
  },
  {
    slug: "omkareshwar-to-indore",
    from: "Omkareshwar",
    to: "Indore",
    title: "Omkareshwar to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Omkareshwar to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 1600, suv: 1850 },
    roundTrip: { sedan: 3000, suv: 3500 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-omkareshwar", "ujjain-to-omkareshwar"],
  },
  {
    slug: "bhopal-to-indore",
    from: "Bhopal",
    to: "Indore",
    title: "Bhopal to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Bhopal to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2500, suv: 3000 },
    roundTrip: { sedan: 5000, suv: 6000 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-bhopal", "indore-to-ujjain"],
  },
  {
    slug: "khandwa-to-indore",
    from: "Khandwa",
    to: "Indore",
    title: "Khandwa to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Khandwa to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2300, suv: 2600 },
    roundTrip: { sedan: 3500, suv: 4000 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-khandwa", "burhanpur-to-indore"],
  },
  {
    slug: "burhanpur-to-indore",
    from: "Burhanpur",
    to: "Indore",
    title: "Burhanpur to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Burhanpur to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 3500, suv: 4000 },
    roundTrip: { sedan: 4500, suv: 6000 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-burhanpur", "khandwa-to-indore"],
  },
  {
    slug: "ratlam-to-indore",
    from: "Ratlam",
    to: "Indore",
    title: "Ratlam to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Ratlam to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 2800, suv: 3500 },
    roundTrip: { sedan: 3800, suv: 4500 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-ratlam", "mandsaur-to-indore"],
  },
  {
    slug: "mandsaur-to-indore",
    from: "Mandsaur",
    to: "Indore",
    title: "Mandsaur to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Mandsaur to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 3500, suv: 4500 },
    roundTrip: { sedan: 5500, suv: 7000 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-mandsaur", "neemuch-to-indore"],
  },
  {
    slug: "neemuch-to-indore",
    from: "Neemuch",
    to: "Indore",
    title: "Neemuch to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala",
    description: "Book Neemuch to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.",
    oneWay: { sedan: 4000, suv: 5000 },
    roundTrip: { sedan: 6000, suv: 7500 },
    returnAvailable: true,
    relatedRoutes: ["indore-to-neemuch", "mandsaur-to-indore"],
  }
];

export const getAllRoutesData = unstable_cache(
  async (): Promise<RouteData[]> => {
    try {
      const { data, error } = await supabase.from('routes').select('*');
      if (error || !data || data.length === 0) return fallbackRoutesData;

      const parsePrice = (priceStr: string | null) => {
        if (!priceStr) return undefined;
        const num = Number(priceStr);
        return isNaN(num) ? priceStr : num;
      };

      return data.map((row) => ({
        slug: row.slug,
        from: row.from_city,
        to: row.to_city,
        title: row.title,
        description: row.description,
        oneWay: { 
          sedan: parsePrice(row.price_sedan_one_way) as string | number, 
          suv: parsePrice(row.price_suv_one_way) as string | number 
        },
        roundTrip: { 
          sedan: parsePrice(row.price_sedan_round) as string | number, 
          suv: parsePrice(row.price_suv_round) as string | number,
          ...(row.price_ac_round ? { ac: parsePrice(row.price_ac_round) } : {})
        },
        returnAvailable: row.return_available,
        relatedRoutes: row.related_routes,
        popular: row.popular
      }));
    } catch (err) {
      return fallbackRoutesData;
    }
  },
  ['routes-data'],
  { revalidate: 3600, tags: ['routes'] } // Cache for 1 hour
);

export async function getRouteBySlug(slug: string): Promise<RouteData | undefined> {
  const routes = await getAllRoutesData();
  return routes.find((route) => route.slug === slug);
}

export async function getPopularRoutes(): Promise<RouteData[]> {
  const routes = await getAllRoutesData();
  const popular = routes.filter(r => r.popular);
  // fallback if none marked
  if (popular.length === 0) {
    return routes.slice(0, 8);
  }
  return popular;
}

export async function getAllOrigins(): Promise<string[]> {
  const routes = await getAllRoutesData();
  const origins = new Set(routes.map((route) => route.from));
  return Array.from(origins);
}

export async function getDestinationsByOrigin(origin: string): Promise<string[]> {
  const routes = await getAllRoutesData();
  return routes
    .filter((route) => route.from === origin)
    .map((route) => route.to);
}

export async function getRouteSlug(from: string, to: string): Promise<string | undefined> {
  const routes = await getAllRoutesData();
  const route = routes.find((r) => r.from === from && r.to === to);
  return route?.slug;
}
