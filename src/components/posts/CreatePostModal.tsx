"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the rich text editor to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // This wrapper ensures the 'forwardedRef' prop is applied to the Quill instance
    const QuillWrapper = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
    QuillWrapper.displayName = "ReactQuillWrapper";
    return QuillWrapper;
  },
  { ssr: false },
);

import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/redux/features/posts/postApi";
import { categories } from "@/constant";
import { useAppSelector } from "@/redux/hooks";
import { useUploadImageMutation } from "@/redux/features/imageUpload/uploadImageApi";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { TCreatePost } from "@/types/TCreatePost";

// ---------------- create post modal component ----------------
export default function CreatePostModal() {
  const quillRef = useRef<any>(null);

  // ------------- redux ---------------
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [uploadImageToCloudinary] = useUploadImageMutation();

  const showEditPostData = useAppSelector(
    (state) => state.filters.editPostData,
  );
  const user = useAppSelector((state) => state.auth.user?.userId);

  // -------------- react ------------
  const [formData, setFormData] = useState<TCreatePost>({
    title: "",
    category: "",
    image: "",
    content: "",
    premium: false,
    bannerId: "",
    contentIds: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();

  // load post data to form
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: showEditPostData?.title || "",
      category: showEditPostData?.category || "",
      image: showEditPostData?.image || "",
      content: showEditPostData?.content || "",
      premium: Boolean(showEditPostData?.premium),
      bannerId: showEditPostData?.bannerId || "",
      contentIds: showEditPostData?.contentIds || [],
    }));
  }, [showEditPostData]);

  // ----------- handle input fields -----------------------
  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ------------ baner image upload -----------------------
  const uploadBanerFile = async (event: any) => {
    const data = new FormData();
    const file = event.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        data.append("file", file);
        const result = await uploadImageToCloudinary(data).unwrap();
        setFormData((prev) => ({
          ...prev,
          image: result.data.url,
          bannerId: result.data._id,
        }));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrors((prev) => ({ ...prev, image: "Image failed to upload" }));
        console.error("Error while upload baner image: ", error);
      }
    } else {
      console.log("no file section");
    }
  };

  // ---------- validate form data ----------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.image) newErrors.image = "Baner image is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------ handle create or update a post ----------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // redirect to login page if user is not logged in
    if (!user) {
      router.push("/login");
    }

    // --------- update a post
    if (showEditPostData) {
      setIsLoading(true);
      try {
        // hit api to update a post
        const result: any = await updatePost({
          postId: showEditPostData?._id,
          post: formData,
        });
        if (result?.data?.success) {
          setSuccessMessage("Post updated successfully!");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          throw new Error(result?.error?.data?.message);
        }
      } catch (error: any) {
        setErrors({ form: error?.message });
      } finally {
        setIsLoading(false);
      }
    } else {
      // -------- create a post --------------
      if (!validateForm()) return;
      setIsLoading(true);
      try {
        // hit api to create a post
        const result = await createPost(formData).unwrap();

        console.log("Newly created post: ", result);

        setSuccessMessage("Post created successfully!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error: any) {
        setErrors({ form: error?.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // intercept image add in editor and 1st upload to the cloudinary
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          setIsLoading(true);
          const result = await uploadImageToCloudinary(formData).unwrap();
          const url = result.data.url;
          const mongoId = result.data._id; // Image ID from DB

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();

          // Insert image to editor
          quill.insertEmbed(range.index, "image", url);

          // Hack to add 'data-image-id' to the newly inserted <img> tag
          // setTimeout use kora hoy jate Quill image-ta DOM-e render korar somoy pai
          setTimeout(() => {
            // Current selection/index theke image-ta khuje ber kora
            const images = document.querySelectorAll(".ql-editor img");
            // Editor-e shorboshesh add kora image-ta select kora
            const lastImage = images[images.length - 1];

            if (lastImage) {
              lastImage.setAttribute("data-image-id", mongoId);
              // Optional: image-ta ke identify korar jonno arekta class dite paro
              lastImage.classList.add("post-content-image");
            }
          }, 100);

          // Update the mediaIds array in state (cross-check er jonno)
          setFormData((prev) => ({
            ...prev,
            contentIds: [...prev.contentIds, result.data._id],
          }));
        } catch (error) {
          console.error("Image upload failed:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  };

  // ---------- quil editor -----------
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <div className="container max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Travel Post</CardTitle>
          <CardDescription>
            Share your travel experiences and tips with the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            {/* travel title  */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter your post title"
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* travel category  */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger id="category" aria-invalid={!!errors.category}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            {/* post banner */}
            <div className="space-y-2">
              <div className="flex gap-x-2 items-center">
                <Label htmlFor="file">Upload Image</Label>
                {isLoading && (
                  <Badge variant={"secondary"}>
                    <Spinner data-icon="inline-start" />
                    Uploading
                  </Badge>
                )}
                {!isLoading && formData.image && (
                  <p className="text-green-600 text-sm">Uploaded</p>
                )}
              </div>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={uploadBanerFile}
                aria-invalid={!!errors.file}
              />
              {errors.file && (
                <p className="text-sm text-destructive">{errors.file}</p>
              )}
            </div>

            {/* quil editor  */}
            <div
              className={
                isLoading
                  ? "opacity-50 pointer-events-none space-y-4"
                  : "space-y-4"
              }
            >
              <Label htmlFor="content">Content</Label>
              <ReactQuill
                theme="snow"
                forwardedRef={quillRef}
                value={formData.content}
                onChange={(content: string) => handleChange("content", content)}
                modules={modules}
                className="h-64 mb-12"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>

            {/* make content premium  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 mt-[40px]">
                <Switch
                  id="premium"
                  checked={formData.premium}
                  onCheckedChange={(checked) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      premium: checked,
                    }))
                  }
                />
                <Label htmlFor="premium">Premium Content</Label>
              </div>
            </div>

            {errors.form && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.form}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert
                variant="default"
                className="bg-green-50 text-green-800 border-green-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? showEditPostData
                  ? "Updating Post..."
                  : "Creating Post..."
                : showEditPostData
                  ? "Update Post"
                  : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
