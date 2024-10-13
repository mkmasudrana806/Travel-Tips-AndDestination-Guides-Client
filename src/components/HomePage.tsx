import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ThumbsUp, Users } from "lucide-react";
import PremiumContentPage from "./posts/PremiumPosts";
import TopTreavelPosts from "./posts/TopTreavelPosts";

export default async function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center text-white">
        <Image
          src="https://www.thenexttrip.xyz/wp-content/uploads/2024/07/Canyonlands-National-Park-Uta-1536x864.jpg"
          alt="Travel destination"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join our community of travel enthusiasts and explore the world
            through their eyes.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">
          Featured Travel Tips & Guides
        </h2>
        <TopTreavelPosts />
      </section>

      {/* Featured Posts Section */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">
          Premium Travel Tips & Guides
        </h2>
        <PremiumContentPage />
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
