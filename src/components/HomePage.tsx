import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ThumbsUp, Users } from "lucide-react";
import PremiumPostsContainer from "./posts/PremiumPostsContainer";
import TopTreavelPostsContainer from "./posts/TopTravelPostsContainer";
import Hero from "./Hero";

export default async function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />

      {/* Featured Posts Section */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">
          Featured Travel Tips & Guides
        </h2>
        <TopTreavelPostsContainer />
      </section>

      {/* premium Posts Section */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">
          Premium Travel Tips & Guides
        </h2>
        <PremiumPostsContainer />
      </section>

      {/* About Us Section */}
      <section className="bg-muted p-5">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4">
            About Travel Tips & Guides
          </h2>
          <p className="text-lg max-w-3xl">
            We are a passionate community of globetrotters, adventure seekers,
            and culture enthusiasts. Our platform is designed to connect
            travelers from all walks of life, allowing them to share their
            experiences, tips, and insights with fellow explorers.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">Why Join Our Community?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Discover New Destinations",
              description:
                "Explore hidden gems and popular spots through the eyes of fellow travelers.",
            },
            {
              icon: ThumbsUp,
              title: "Share Your Experiences",
              description:
                "Post your own travel stories, tips, and recommendations to help others.",
            },
            {
              icon: Users,
              title: "Connect with Travelers",
              description:
                "Follow other adventurers and engage in discussions about your favorite destinations.",
            },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container space-y-4">
          <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-xl">
            Join our community today and share your travel experiences with the
            world.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
