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

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  // const handleProfileChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({ ...prev, [name]: value }));
  // };

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

  const validateForm = (formType: "profile" | "password") => {
    const newErrors: Record<string, string> = {};

    if (formType === "profile") {
      if (!user.name.trim()) newErrors.name = "Name is required";
      if (!user.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(user.email))
        newErrors.email = "Email is invalid";
    } else if (formType === "password") {
      if (!passwords.currentPassword)
        newErrors.currentPassword = "Current password is required";
      if (!passwords.newPassword)
        newErrors.newPassword = "New password is required";
      if (passwords.newPassword !== passwords.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formType: "profile" | "password"
  ) => {
    e.preventDefault();
    if (!validateForm(formType)) return;

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage(
        formType === "profile"
          ? "Profile updated successfully!"
          : "Password changed successfully!"
      );
      if (formType === "password") {
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ form: "An error occurred. Please try again." });
      console.error(error);
    }
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
          {/* <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => handleSubmit(e, "profile")}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleProfileChange}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleProfileChange}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={user.bio}
                    onChange={handleProfileChange}
                    rows={4}
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card> */}
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
          </Card>
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default AccountSettingsPage;
