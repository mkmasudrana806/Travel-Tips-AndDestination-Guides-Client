"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { allPosts } from "@/constant";

// Mock data (replace with API calls in a real application)

const categories = ["All", "Adventure", "Culture", "Food", "Nature"];

export default function SearchAndFilterPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  useEffect(() => {
    let result = allPosts;

    // Filter by search term
    if (searchTerm) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // Sort posts
    result.sort((a, b) => {
      if (sortBy === "mostLiked") return b.likes - a.likes;
      if (sortBy === "mostCommented") return b.comments - a.comments;
      return b.id - a.id; // 'latest' sort (assuming higher id means more recent)
    });

    setFilteredPosts(result);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader>
          <CardTitle>Search and Filter Posts</CardTitle>
          <CardDescription>
            Find the perfect travel tips and guides
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
              
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="category" className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sortBy" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="mostLiked">Most Liked</SelectItem>
                  <SelectItem value="mostCommented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>{post.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="rounded-md mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" /> {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="mr-1 h-4 w-4" /> {post.comments}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" asChild className="w-full">
                <Link href={`/post/${post.id}`}>View Post</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="mt-8">
          <CardContent className="text-center py-8">
            <p className="text-lg font-semibold">No posts found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
