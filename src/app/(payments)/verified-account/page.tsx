"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge, Check, Loader2, Shield } from "lucide-react";
import { useVerifiedUserMutation } from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import Loading from "@/components/message/Loading";

type SubscriptionType = "monthly" | "yearly";

interface SubscriptionOption {
  type: SubscriptionType;
  price: number;
  features: string[];
}
// subscription card
const subscriptionOptions: SubscriptionOption[] = [
  {
    type: "monthly",
    price: 13,
    features: [
      "Access to all premium content",
      "Ad-free experience",
      "Exclusive travel guides",
      "Monthly newsletter",
    ],
  },
  {
    type: "yearly",
    price: 120,
    features: [
      "All monthly features",
      "Two months free",
      "Early access to new features",
      "Priority customer support",
    ],
  },
];

// ------------- user upgrade component -----------------------
const UserUpgrade = () => {
  // -------------- redux
  const [verifiedUser, { isLoading }] = useVerifiedUserMutation();
  const userId = useAppSelector((state) => state.auth.user?.userId);

  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType>("monthly");

  // ---------------- handle checkout
  const handleCheckout = async () => {
    const selected = subscriptionOptions.find(
      (option) => option.type === selectedSubscription
    );
    if (selected) {
      const paymentData = {
        amount: selected.price,
        subscriptionType: selected.type,
      };

      // api call to payment
      const result = await verifiedUser({ paymentData, userId }).unwrap();
      if (result.success) {
        window.location.href = result?.data?.payment_url;
      }
      try {
        // const result = await
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Upgrade Your Verified Account
        </h1>
        <span className="flex items-center justify-center gap-x-2">
          <Badge color="green" className="text-sm">
            <Shield color="green" className="w-4 h-4 mr-1" />
          </Badge>{" "}
          Verified User
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* subscription type card */}
        {subscriptionOptions.map((option) => (
          <Card
            key={option.type}
            className={`${
              selectedSubscription === option.type ? "border-primary" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">
                {option.type === "monthly" ? "Monthly" : "Yearly"} Plan
              </CardTitle>
              <CardDescription>
                ${option.price}/{option.type === "monthly" ? "month" : "year"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <RadioGroup
                value={selectedSubscription}
                onValueChange={(value) =>
                  setSelectedSubscription(value as SubscriptionType)
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={option.type} id={option.type} />
                  <Label htmlFor={option.type}>Select {option.type} plan</Label>
                </div>
              </RadioGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={handleCheckout} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              processing...
            </>
          ) : (
            "Processed to checkout"
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserUpgrade;
