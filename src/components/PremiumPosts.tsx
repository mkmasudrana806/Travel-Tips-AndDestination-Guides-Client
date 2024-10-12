"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, Star, ThumbsUp, MessageCircle } from "lucide-react";
import { premiumContent } from "@/constant";

export default function PremiumContentPage() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to check user's premium status
    const checkPremiumStatus = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsPremiumUser(Math.random() < 0.5); // Randomly set premium status for demonstration
      setIsLoading(false);
    };
    checkPremiumStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      {!isPremiumUser && (
        <Alert variant="default" className="mb-8">
          <Star className="h-4 w-4" />
          <AlertTitle>Unlock Premium Content</AlertTitle>
          <AlertDescription>
            Upgrade your account to access exclusive travel guides, insider
            tips, and luxury experiences.
            <Button variant="outline" className="ml-4" asChild>
              <Link href="/upgrade">Upgrade Now</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {premiumContent?.map((content) => (
          <Card key={content.id} className={!isPremiumUser ? "opacity-60" : ""}>
            <CardHeader>
              <div className="relative">
                <Image
                  src={content.image}
                  alt={content.title}
                  width={300}
                  height={200}
                  className="rounded-md mb-4"
                />
                <Badge variant="secondary" className="absolute top-2 right-2">
                  Premium
                </Badge>
              </div>
              <CardTitle>{content.title}</CardTitle>
              <CardDescription>By {content.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">
                Experience the ultimate travel adventure with our exclusive
                premium guide. Discover hidden gems, luxury accommodations, and
                insider tips that will make your journey unforgettable.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" /> {content.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="mr-1 h-4 w-4" /> {content.comments}
                </span>
              </div>
              <Button variant="outline" disabled={!isPremiumUser}>
                {isPremiumUser ? (
                  "Read More"
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" /> Locked
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {!isPremiumUser && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Elevate Your Travel Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Unlock all our premium content and get access to exclusive travel
            guides, luxury experiences, and insider tips.
          </p>
          <Button size="lg" asChild>
            <Link href="/upgrade">Upgrade to Premium</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
