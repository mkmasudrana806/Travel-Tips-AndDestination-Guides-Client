"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Video, Smile } from "lucide-react";
// import CreatePost from "@/components/create-post";

export default function PostInputHome() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-4 my-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage
            src="https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
            alt="User"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {/* modal open when cick on create post  */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-[100%]">
              <Input
                readOnly
                className="cursor-pointer   bg-gray-100 hover:bg-gray-200  "
                placeholder="What's on your mind?"
                width={"100%"}
              />
            </div>
          </DialogTrigger>

          {/* modal to create a post  */}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* TODO: future work section  */}
      <div className="flex justify-between mt-4">
        <Button
          variant="ghost"
          className="flex-1 text-gray-500 hover:bg-gray-100"
        >
          <Camera className="w-5 h-5 mr-2" />
          Photo
        </Button>
        <Button
          variant="ghost"
          className="flex-1 text-gray-500 hover:bg-gray-100"
        >
          <Video className="w-5 h-5 mr-2" />
          Video
        </Button>
        <Button
          variant="ghost"
          className="flex-1 text-gray-500 hover:bg-gray-100"
        >
          <Smile className="w-5 h-5 mr-2" />
          Feeling
        </Button>
      </div>
    </div>
  );
}
