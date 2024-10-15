import FeaturedDestinationsCarousel from "@/components/FeaturedDestinations";
import PremiumPostsContainer from "@/components/posts/PremiumPostsContainer";
import TravelMap from "@/components/TravelMaps";
import TravelTrends from "@/components/TravelTrends";

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* featured destination  */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Destinations</h2>
        <FeaturedDestinationsCarousel />
      </section>

      {/* popular locations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Locations</h2>
        <TravelMap />
      </section>

      {/* search premium travel tips  */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Premium Travel Tips</h2>
        <PremiumPostsContainer />
      </section>

      {/* travel trends  */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Travel Trends</h2>
        <TravelTrends />
      </section>
    </div>
  );
}
