import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TUser } from "@/types/userType";
import { useAppSelector } from "@/redux/hooks";
import { useUpdateUserMutation } from "@/redux/features/users/userApi";

type Props = {
  setIsDialogOpen: (val: boolean) => void;
};
const EditUserInfoForm: React.FC<Props> = ({ setIsDialogOpen }) => {
  // ------------------ redux
  const userData = useAppSelector((state) => state?.users?.editUserData);
  const [updateUser] = useUpdateUserMutation();

  // ------------------- react
  const [editedUser, setEditedUser] = useState<TUser>(userData!);

  // ------------------ handle user input form change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // ------------------ handle select change
  const handleSelectChange = (name: string, value: string) => {
    setEditedUser({ ...editedUser, [name]: value });
  };

  // ----------------- handle submit user update form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: editedUser?.name,
        age: editedUser.age,
        gender: editedUser?.gender,
        contact: editedUser?.contact,
        address: editedUser?.address,
      };
      const result = await updateUser(updatedData).unwrap();
      if (result.success) {
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   const handleProfilePictureUpload = (
  //     e: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setEditedUser({
  //           ...editedUser,
  //           profilePicture: reader.result as string,
  //         });
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* user name  */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </div>

        {/* email  */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            readOnly
            id="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </div>

        {/* age  */}
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

        {/* gender  */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={editedUser.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
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

        {/* contact  */}
        <div className="space-y-2">
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            name="contact"
            value={editedUser.contact}
            onChange={handleInputChange}
          />
        </div>

        {/* address  */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={editedUser.address}
            onChange={handleInputChange}
          />
        </div>

        {/* premium access  */}
        <div className="flex items-center space-x-2">
          <Switch disabled id="premium" checked={editedUser.premiumAccess} />
          <Label htmlFor="premium">Premium Access</Label>
        </div>
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default EditUserInfoForm;
