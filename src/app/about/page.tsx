import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Compass, Award } from "lucide-react";
import { teamMembers } from "@/constant";
import Link from "next/link";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | About Us",
  description:
    "Travel Tips And Destination Guides About Us page give you clear instruction about us",
};

// ----------------- about us page
const AboutPage = () => {
  return (
    <div className="container mx-auto py-12">
      {/* about travel tips and guide  */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          About Travel Tips & Destination Guides
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering travelers with authentic experiences and insider knowledge
          from a global community of passionate explorers.
        </p>
      </section>

      {/* our mission  */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Globe className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Connect Travelers Worldwide</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We aim to create a global network of travelers, fostering
                cultural exchange and understanding through shared experiences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Compass className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Inspire Authentic Adventures</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our platform encourages off-the-beaten-path explorations,
                helping travelers discover hidden gems and local treasures.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Build a Supportive Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We are dedicated to creating a space where travelers can share
                advice, stories, and form lasting connections.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Promote Responsible Tourism</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We advocate for sustainable and ethical travel practices,
                encouraging respect for local cultures and environments.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* our story  */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="https://s3.amazonaws.com/uploads.travelforteens.com/2018/09/05200214/BUSA_squad-2-1024x682.jpg"
              alt="Travelers exploring a new destination"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              Travel Tips & Destination Guides was born out of a shared passion
              for exploration and a desire to make travel more accessible and
              enriching for everyone. Our founders, avid travelers themselves,
              recognized the need for a platform that goes beyond typical
              tourist information.
            </p>
            <p className="text-lg mb-4">
              What started as a small blog has grown into a vibrant community of
              globetrotters, adventure seekers, and cultural enthusiasts. We
              believe that the best travel advice comes from fellow travelers
              who have walked the path before you.
            </p>
            <p className="text-lg">
              Today, we are proud to offer a space where travelers from all
              walks of life can connect, share their experiences, and inspire
              each other to explore the world in meaningful ways.
            </p>
          </div>
        </div>
      </section>

      {/* meet our team   */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers?.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* join our community  */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Become a part of our growing family of travelers. Share your stories,
          get inspired, and plan your next adventure with us.
        </p>
        <Link href={"/register"}>
          <Button size="lg">Sign Up Now</Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
