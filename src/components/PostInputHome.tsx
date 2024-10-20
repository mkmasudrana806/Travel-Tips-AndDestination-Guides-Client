"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Video, Smile } from "lucide-react";
import CreatePostModal from "./posts/CreatePostModal";

export default function PostInputHome() {
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
                className="cursor-pointer bg-gray-100 hover:bg-gray-200"
                placeholder="What's on your mind?"
                width={"100%"}
              />
            </div>
          </DialogTrigger>

          {/* Modal to create a post */}
          <DialogContent className="xs:max-w-[100%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[100vh] overflow-y-auto">
            <DialogTitle> </DialogTitle>
            <DialogDescription></DialogDescription>
            <CreatePostModal />
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
