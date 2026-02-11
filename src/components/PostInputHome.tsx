"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePostModal from "./posts/CreatePostModal";

export default function PostInputHome() {
  return (
    <div className="bg-white shadow rounded-lg p-4 my-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage width={200} height={200} src="/demo.webp" alt="User" />
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
    </div>
  );
}
