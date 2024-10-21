"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Mail, Phone, Cake, User, Pencil } from "lucide-react";
import {
  useGetMyProfileQuery,
  useUpdateUserProfilePictureMutation,
} from "@/redux/features/users/userApi";
import Loading from "@/components/message/Loading";
import { TUser } from "@/types/userType";
import ErrorComponent from "@/components/message/ErrorComponent";
import { useAppDispatch } from "@/redux/hooks";
import { setEditUserData } from "@/redux/features/users/userSlice";
import EditUserInfoForm from "./EditUserInfoForm";

// ----------- profile page component
const ProfilePage = () => {
  // --------------- redux
  const {
    data: user = { data: {} },
    isLoading,
    isError,
  } = useGetMyProfileQuery(undefined);
  const dispatch = useAppDispatch();
  const [updateUserProfilePicture] = useUpdateUserProfilePictureMutation();

  // --------------- react
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // handle edit user
  const handleEditUser = (user: TUser) => {
    dispatch(setEditUserData(user));
  };

  const [selectedFile, setSelectedFile] = useState<File | any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // handle file selection
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  // handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      try {
        formData.append("file", selectedFile);

        const result = await updateUserProfilePicture(formData);
        console.log("result after profile update: ", result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading && !isError) {
    return <Loading />;
  } else if (isError) {
    <ErrorComponent />;
  }
  return (
    <div className="container mx-auto">
      <Card className="  mx-auto overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-blue-500 p-6 text-white">
            <div className="text-center ">
              <Avatar className="w-32 h-32 relative mx-auto mb-4 border-4 border-white">
                <AvatarImage
                  src={user?.data?.profilePicture}
                  alt={user?.data?.name}
                />
                <AvatarFallback>{user?.data?.name?.charAt(0)}</AvatarFallback>
                {/* The Pencil icon, clicking on it opens the file selector */}
                <Pencil
                  className="absolute bottom-4 right-4 cursor-pointer"
                  onClick={handleIconClick}
                />
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{user?.data?.name}</h2>
              <p className="text-sm opacity-75">
                {user?.data?.role?.charAt(0).toUpperCase() +
                  user?.data?.role?.slice(1)}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-sm">{user?.data?.address}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-sm">{user?.data?.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-sm">{user?.data?.contact}</span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Profile Information</h3>
              {/* edit user profile modal */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger
                  onClick={() => handleEditUser(user?.data)}
                  asChild
                >
                  <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="xs:max-w-[100%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[100vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  {/* user profile edit form  */}
                  <EditUserInfoForm setIsDialogOpen={setIsDialogOpen} />
                </DialogContent>
              </Dialog>
            </div>

            {/* profile information */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Cake className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">Age: {user?.data?.age}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">
                  Gender:{" "}
                  {user?.data?.gender?.charAt(0).toUpperCase() +
                    user?.data?.gender?.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    user?.data?.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm">
                  Status:{" "}
                  {user?.data?.status?.charAt(0).toUpperCase() +
                    user?.data?.status?.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="premium"
                  checked={user?.data?.premiumAccess}
                  disabled
                />
                <Label htmlFor="premium">Premium Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="verified"
                  checked={user?.data?.isVerified}
                  disabled
                />
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
