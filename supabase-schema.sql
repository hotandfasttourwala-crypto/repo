-- Run this SQL in your Supabase SQL Editor

-- 1. Create Inquiries Table (For tracking Call/WhatsApp button clicks)
CREATE TABLE public.inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL, -- 'CALL', 'WHATSAPP', 'FORM'
  source_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Contact Submissions Table (For the Contact form)
CREATE TABLE public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  message text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: In this project, route and vehicle data is statically generated from 
-- the 'data/routes.ts' and 'data/fleet.ts' files for maximum SEO performance.
-- You can move them to Supabase in the future if you need a CMS approach.

-- 3. Set up Row Level Security (RLS) policies
-- Allow anonymous users to insert into inquiries (tracking clicks)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on inquiries" 
  ON public.inquiries FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Allow anonymous users to insert into contact_submissions (form submits)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on contact_submissions" 
  ON public.contact_submissions FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Deny read access to public (Only authenticated admins in Supabase dashboard can view the data)
CREATE POLICY "Deny public reads on inquiries" 
  ON public.inquiries FOR SELECT 
  TO public 
  USING (false);

CREATE POLICY "Deny public reads on contact_submissions" 
  ON public.contact_submissions FOR SELECT 
  TO public 
  USING (false);

-- =========================================
-- OPTION B: DYNAMIC ROUTES AND FLEET TABLES
-- =========================================

-- 1. Create Fleet Table
CREATE TABLE public.fleet (
  id text PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL,
  image text NOT NULL,
  gallery jsonb NOT NULL,
  features jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Routes Table
CREATE TABLE public.routes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  from_city text NOT NULL,
  to_city text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  price_sedan_one_way text NOT NULL,
  price_suv_one_way text NOT NULL,
  price_sedan_round text NOT NULL,
  price_suv_round text NOT NULL,
  price_ac_round text, -- For specific cases like Ujjain to Omkareshwar
  return_available boolean DEFAULT true,
  related_routes jsonb,
  popular boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow public read access to fleet and routes
ALTER TABLE public.fleet ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on fleet" ON public.fleet FOR SELECT TO public USING (true);

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on routes" ON public.routes FOR SELECT TO public USING (true);

-- =========================================
-- SEED DATA (Run this to populate your site!)
-- =========================================

INSERT INTO public.fleet (id, name, type, image, gallery, features) VALUES
('sedan', 'Sedan', 'Sedan', '/images/cars/sedan.jpeg', '["/images/cars/sedan/sedan.jpeg", "/images/cars/sedan/3re.jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.11 PM.jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.30 PM.jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.31 PM (1).jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.31 PM (2).jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.32 PM.jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.33 PM (1).jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.33 PM (2).jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.33 PM.jpeg", "/images/cars/sedan/WhatsApp Image 2026-09-01 at 4.21.34 PM (1).jpeg"]', '["Comfortable", "AC Available", "Clean Interior", "Experienced Driver", "Suitable for 1–4 Passengers"]'),
('suv', 'SUV / Ertiga', 'SUV', '/images/cars/ertiga.jpeg', '["/images/cars/suv/ertiga.jpeg", "/images/cars/suv/ertiga-2.jpeg", "/images/cars/suv/987uythg.jpeg", "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.27 PM.jpeg", "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.29 PM.jpeg", "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.32 PM (1).jpeg", "/images/cars/suv/WhatsApp Image 2026-09-01 at 4.21.32 PM (2).jpeg"]', '["Spacious Interior", "AC Available", "Comfortable for Families", "Experienced Driver", "Suitable for Group Travel"]');


INSERT INTO public.routes (slug, from_city, to_city, title, description, price_sedan_one_way, price_suv_one_way, price_sedan_round, price_suv_round, price_ac_round, return_available, related_routes, popular) VALUES
('indore-to-ujjain', 'Indore', 'Ujjain', 'Indore to Ujjain Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Ujjain taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '1350', '1700', '2700', '3200', null, true, '["ujjain-to-indore", "ujjain-to-omkareshwar", "indore-to-omkareshwar"]', true),
('ujjain-to-omkareshwar', 'Ujjain', 'Omkareshwar', 'Ujjain to Omkareshwar Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Ujjain to Omkareshwar taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2500', '3000', '4000', 'Contact for current fare', '4500', true, '["indore-to-ujjain", "indore-to-omkareshwar"]', false),
('indore-to-omkareshwar', 'Indore', 'Omkareshwar', 'Indore to Omkareshwar Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Omkareshwar taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '1600', '1850', '3000', '3500', null, true, '["omkareshwar-to-indore", "ujjain-to-omkareshwar", "indore-to-ujjain"]', true),
('indore-to-bhopal', 'Indore', 'Bhopal', 'Indore to Bhopal Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Bhopal taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2500', '3000', '5000', '6000', null, true, '["bhopal-to-indore", "indore-to-ujjain"]', true),
('indore-to-khandwa', 'Indore', 'Khandwa', 'Indore to Khandwa Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Khandwa taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2300', '2600', '3500', '4000', null, true, '["khandwa-to-indore", "indore-to-burhanpur"]', true),
('indore-to-burhanpur', 'Indore', 'Burhanpur', 'Indore to Burhanpur Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Burhanpur taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '3500', '4000', '4500', '6000', null, true, '["burhanpur-to-indore", "indore-to-khandwa"]', true),
('indore-to-ratlam', 'Indore', 'Ratlam', 'Indore to Ratlam Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Ratlam taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2800', '3500', '3800', '4500', null, true, '["ratlam-to-indore", "indore-to-mandsaur"]', true),
('indore-to-mandsaur', 'Indore', 'Mandsaur', 'Indore to Mandsaur Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Mandsaur taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '3500', '4500', '5500', '7000', null, true, '["mandsaur-to-indore", "indore-to-neemuch", "indore-to-ratlam"]', true),
('indore-to-neemuch', 'Indore', 'Neemuch', 'Indore to Neemuch Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Indore to Neemuch taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '4000', '5000', '6000', '7500', null, true, '["neemuch-to-indore", "indore-to-mandsaur"]', true),
('ujjain-to-indore', 'Ujjain', 'Indore', 'Ujjain to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Ujjain to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '1350', '1700', '2700', '3200', null, true, '["indore-to-ujjain", "ujjain-to-omkareshwar"]', false),
('omkareshwar-to-indore', 'Omkareshwar', 'Indore', 'Omkareshwar to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Omkareshwar to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '1600', '1850', '3000', '3500', null, true, '["indore-to-omkareshwar", "ujjain-to-omkareshwar"]', false),
('bhopal-to-indore', 'Bhopal', 'Indore', 'Bhopal to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Bhopal to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2500', '3000', '5000', '6000', null, true, '["indore-to-bhopal", "indore-to-ujjain"]', false),
('khandwa-to-indore', 'Khandwa', 'Indore', 'Khandwa to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Khandwa to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2300', '2600', '3500', '4000', null, true, '["indore-to-khandwa", "burhanpur-to-indore"]', false),
('burhanpur-to-indore', 'Burhanpur', 'Indore', 'Burhanpur to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Burhanpur to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '3500', '4000', '4500', '6000', null, true, '["indore-to-burhanpur", "khandwa-to-indore"]', false),
('ratlam-to-indore', 'Ratlam', 'Indore', 'Ratlam to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Ratlam to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '2800', '3500', '3800', '4500', null, true, '["indore-to-ratlam", "mandsaur-to-indore"]', false),
('mandsaur-to-indore', 'Mandsaur', 'Indore', 'Mandsaur to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Mandsaur to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '3500', '4500', '5500', '7000', null, true, '["indore-to-mandsaur", "neemuch-to-indore"]', false),
('neemuch-to-indore', 'Neemuch', 'Indore', 'Neemuch to Indore Taxi | One Way & Round Trip Cab | Hot and Fast Tour Wala', 'Book Neemuch to Indore taxi service with Hot and Fast Tour Wala. Sedan and SUV available for one-way and round trips. Call or WhatsApp for booking.', '4000', '5000', '6000', '7500', null, true, '["indore-to-neemuch", "mandsaur-to-indore"]', false);


-- Allow public insert/delete for Admin Panel functionality
CREATE POLICY "Allow public insert access on fleet" ON public.fleet FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public delete access on fleet" ON public.fleet FOR DELETE TO public USING (true);
CREATE POLICY "Allow public insert access on routes" ON public.routes FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public delete access on routes" ON public.routes FOR DELETE TO public USING (true);

-- =========================================
-- STORAGE BUCKETS (Run this to enable image uploads)
-- =========================================

-- Create a public bucket for car images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cars', 'cars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the bucket
CREATE POLICY "Allow public read on cars bucket" 
  ON storage.objects FOR SELECT 
  TO public 
  USING (bucket_id = 'cars');

-- Allow anonymous users to upload images (Needed since frontend uses anon key)
CREATE POLICY "Allow public uploads to cars bucket" 
  ON storage.objects FOR INSERT 
  TO public 
  WITH CHECK (bucket_id = 'cars');

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
