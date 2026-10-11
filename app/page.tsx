import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Fleet from "../components/Fleet";
import RentalBanner from "../components/RentalBanner";
import PopularRoutes from "../components/PopularRoutes";
import PricingTable from "../components/PricingTable";
import GoogleReviews from "../components/GoogleReviews";
import WhyChooseUs from "../components/WhyChooseUs";
import BookingAndContact from "../components/BookingAndContact";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Elite Travel Services (6 cards) */}
      <Services />

      {/* 4. Luxury Fleet */}
      <Fleet />

      {/* 5. Special Rental Package Banner */}
      <RentalBanner />

      {/* 6. Popular Outstation Routes */}
      <PopularRoutes />

      {/* 7. Local Pricing Overview Table */}
      <PricingTable />

      {/* 8. Google Reviews */}
      <GoogleReviews />

      {/* 9. The Advantage (10 features grid) */}
      <WhyChooseUs />

      {/* 10. WhatsApp Instant Booking Form & Google Map */}
      <BookingAndContact />

      {/* 11. FAQ */}
      <FAQ />
    </>
  );
}
