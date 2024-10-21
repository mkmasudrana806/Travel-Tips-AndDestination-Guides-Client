"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import ProfilePage from "./ProfilePage";
import ChangePasswordForm from "./ChangePasswordForm";

// ---------------- account settings component
const AccountSettingsPage = () => {
  const [user, setUser] = useState({
    name: "Jane Traveler",
    email: "jane@example.com",
    bio: "Passionate traveler | Photography enthusiast | 30 countries and counting",
    avatar: "/placeholder.svg?height=100&width=100",
    notificationPreferences: {
      emailNotifications: true,
      pushNotifications: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleNotificationChange = (
    key: "emailNotifications" | "pushNotifications"
  ) => {
    setUser((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [key]: !prev.notificationPreferences[key],
      },
    }));
  };

  return (
    <div className="container mx-auto  ">
      <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

      {/* account settings tabs Profile, Password and Notifications */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* profile  */}
        <TabsContent value="profile">
          <ProfilePage />
        </TabsContent>

        {/* password  */}
        <TabsContent value="password">
          <ChangePasswordForm />
        </TabsContent>

        {/* notifications  */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={user.notificationPreferences.emailNotifications}
                  onCheckedChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={user.notificationPreferences.pushNotifications}
                  onCheckedChange={() =>
                    handleNotificationChange("pushNotifications")
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() =>
                  setSuccessMessage("Notification preferences updated!")
                }
              >
                Save Preferences
              </Button>
            </CardFooter>

            {/* success and error messages  */}
            {successMessage && (
              <Alert
                variant="default"
                className="mt-4 bg-green-50 text-green-800 border-green-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            {errors.form && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.form}</AlertDescription>
              </Alert>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettingsPage;
