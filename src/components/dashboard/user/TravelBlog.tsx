"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Eye,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

const TravelBlog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My Adventure in Bali",
      content: "Exploring the beautiful beaches and lush jungles of Bali...",
      date: new Date(2023, 5, 15),
      likes: 24,
      comments: 5,
      category: "adventure",
    },
    {
      id: 2,
      title: "A Foodie's Guide to Tokyo",
      content: "Discovering the best sushi, ramen, and street food in Tokyo...",
      date: new Date(2023, 4, 22),
      likes: 36,
      comments: 8,
      category: "food",
    },
    {
      id: 3,
      title: "Hiking the Inca Trail",
      content:
        "My journey to Machu Picchu and the breathtaking views along the way...",
      date: new Date(2023, 3, 10),
      likes: 42,
      comments: 12,
      category: "adventure",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "adventure",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPost = () => {
    setPosts([
      ...posts,
      {
        ...newPost,
        id: posts.length + 1,
        date: new Date(),
        likes: 0,
        comments: 0,
      },
    ]);
    setNewPost({ title: "", content: "", category: "adventure" });
    setIsDialogOpen(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Travel Blog</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Share your travel experiences with the world. Fill in the
                details of your new blog post.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newPost.category}
                  onValueChange={(value) =>
                    setNewPost({ ...newPost, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="tips">Travel Tips</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPost}>
                Publish Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="adventure">Adventure</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="tips">Travel Tips</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {format(post.date, "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {post.content.substring(0, 100)}...
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        {["adventure", "food", "culture", "tips"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts
                .filter((post) => post.category === category)
                .map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        {format(post.date, "MMMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {post.content.substring(0, 100)}...
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TravelBlog;
