"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, OctagonAlert } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";



// -------------- forgot password component
const ForgotPassword = () => {
  // -------------- redux
  const [forgotPassword] = useForgotPasswordMutation();

  // -------------- react
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // ------------- handle forgot password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ type: null, message: "" });
    try {
      const result = await forgotPassword({ email: email }).unwrap();
      if (result?.success) {
        setAlert({
          type: "success",
          message: "An reset email is sent to this email address",
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "Failed to send reset password email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {alert.type && (
              <Alert
                variant={alert.type === "success" ? "default" : "destructive"}
              >
                {alert.type === "success" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <OctagonAlert className="h-4 w-4" />
                )}
                <AlertTitle>
                  {alert.type === "success" ? "Success" : "Error"}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Forgot Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
