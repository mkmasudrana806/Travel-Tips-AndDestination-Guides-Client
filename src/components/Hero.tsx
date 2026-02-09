import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-center text-white">
      <Image
        src="/hero-image.png"
        alt="Travel destination"
        priority
        sizes="100vw"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 space-y-4">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Join our community of travel enthusiasts and explore the world through
          their eyes.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">Start Your Journey</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
