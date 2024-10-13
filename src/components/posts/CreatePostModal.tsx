"use client";

import { useState } from "react";
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
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useCreatePostMutation } from "@/redux/features/posts/postApi";

const categories = [
  { value: "Adventure", label: "Adventure" },
  { value: "culture", label: "Culture" },
  { value: "food", label: "Food & Cuisine" },
  { value: "nature", label: "Nature & Outdoors" },
  { value: "city", label: "City Exploration" },
];

// ---------------- create post modal component ----------------
export default function CreatePostModal() {
  // ------------- redux ---------------
  const [createPost] = useCreatePostMutation();

  // -------------- react ------------
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    premium: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState<File | any>(null);

  const router = useRouter();

  // ----------- handle input fields -----------------------
  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ------------ handle file upload -----------------------
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    } else {
      console.log("no file section");
    }
  };

  // ---------- validate form data ----------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------ handle create a post ----------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const data = new FormData();
    try {
      data.append("file", file);
      data.append("data", JSON.stringify(formData));

      // hit api to create a post
      const result: any = await createPost(data);

      if (result?.data?.success) {
        setSuccessMessage("Post created successfully!");
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
  };

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
                  {categories.map((category) => (
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
              <Label htmlFor="file">Upload File</Label>
              <Input
                id="file"
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
                aria-invalid={!!errors.file}
              />
              {errors.file && (
                <p className="text-sm text-destructive">{errors.file}</p>
              )}
            </div>

            {/* quil editor  */}
            <div className="space-y-4">
              <Label htmlFor="content">Content</Label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => handleChange("content", content)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
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
              {isLoading ? "Creating Post..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
