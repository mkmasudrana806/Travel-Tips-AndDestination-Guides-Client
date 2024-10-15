"use client";
import { useState } from "react";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import PostCard from "./PostCard";
import Loading from "../message/Loading";
import ErrorComponent from "../message/ErrorComponent";
import { TInputChangeEvent } from "@/types/reactTypes";
import useDebounce from "@/utils/useDebounce";
import DataNotFound from "../message/DataNotFound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { searchPosts, setSortBy } from "@/redux/features/posts/filterSlice";
import { categories } from "@/constant";

// ----------- feed posts container
export default function FeedPostsContainer() {
  // ------------ searching with debounce
  // redux
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { searchTerm, sortBy, limit, page } = useAppSelector(
    (state: RootState) => state.filters
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useLoadAllPostsQuery({
    limit,
    sortBy,
    page,
    searchTerm: debouncedSearchTerm,
    category: selectedCategory,
  });

  // -------- handle search posts
  const handleSearchPosts = (event: TInputChangeEvent) => {
    dispatch(searchPosts(event.target.value));
  };

  // ------------- handle sort posts
  const handleSortPosts = (value: string) => {
    dispatch(setSortBy(value));
  };

  // decide what to render
  let content = null;
  // component to render
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && posts?.data?.length === 0) {
    content = <DataNotFound />;
  } else if (!isLoading && !isError && posts?.data?.length > 0) {
    content = posts?.data?.map((post: any) => (
      <PostCard key={post?._id} post={post} />
    ));
  }

  return (
    <div className="container mx-auto py-2">
      {/* filter by search , cateogry and upvote and downvotes  */}
      <Card>
        <CardHeader>
          <CardTitle>Search and Filter Posts</CardTitle>
          <CardDescription>
            Find the perfect travel tips and guides
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* search posts?.data? */}
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchPosts}
              />
            </div>
            {/* categories */}
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
                  <SelectItem value="default">Default</SelectItem>
                  {categories?.map(
                    (category: { value: string; label: string }) => (
                      <SelectItem key={category?.value} value={category?.value}>
                        {category?.value}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            {/* sort posts by upvote and downvotes */}
            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={sortBy} onValueChange={handleSortPosts}>
                <SelectTrigger id="sortBy" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="+upvote">Upvote(Increment)</SelectItem>
                  <SelectItem value="-upvote">Upvote(Decrement)</SelectItem>
                  <SelectItem value="+downvote">Downvote(Increment)</SelectItem>
                  <SelectItem value="-downvote">Downvote(Decrement)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* posts container */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content}
      </div>

      {/* show if no posts available  */}
      {posts?.data?.length === 0 && (
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
