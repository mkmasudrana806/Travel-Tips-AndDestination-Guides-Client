"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Mail, Phone, Cake, User } from "lucide-react";

type TUser = {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  age: number;
  gender: "male" | "female" | "others";
  contact: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  profilePicture?: string;
  isVerified?: boolean;
  premiumAccess?: boolean;
  followers?: string[];
  following?: string[];
  isDeleted: boolean;
};

// Mock user data for demonstration
const mockUser: TUser = {
  name: "Amelia Earhart",
  email: "amelia@flyinghigh.com",
  password: "********",
  age: 39,
  gender: "female",
  contact: "+1234567890",
  address: "123 Aviation Blvd, Atchison, KS 66002",
  role: "user",
  status: "active",
  profilePicture: "https://i.imgur.com/7D7I6dI.png",
  isVerified: true,
  premiumAccess: true,
  isDeleted: false,
};

const ProfilePage = () => {
  const [user, setUser] = useState<TUser>(mockUser);
  const [editedUser, setEditedUser] = useState<TUser>(user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEditedUser({ ...editedUser, [name]: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editedUser);
    setIsDialogOpen(false);
  };

  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({
          ...editedUser,
          profilePicture: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto">
      <Card className="  mx-auto overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-blue-500 p-6 text-white">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-sm opacity-75">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-sm">{user.address}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-sm">{user.contact}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Profile Information</h3>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={editedUser.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          value={editedUser.age}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={editedUser.gender}
                          onValueChange={(value) =>
                            handleSelectChange("gender", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contact</Label>
                        <Input
                          id="contact"
                          name="contact"
                          value={editedUser.contact}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={editedUser.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="premium"
                          checked={editedUser.premiumAccess}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("premiumAccess", checked)
                          }
                        />
                        <Label htmlFor="premium">Premium Access</Label>
                      </div>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Cake className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">Age: {user.age}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">
                  Gender:{" "}
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    user.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm">
                  Status:{" "}
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="premium" checked={user.premiumAccess} disabled />
                <Label htmlFor="premium">Premium Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="verified" checked={user.isVerified} disabled />
                <Label htmlFor="verified">Verified User</Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
