"use client";
import { useEffect, useState } from "react";
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
import { searchPosts, setSortBy } from "@/redux/features/posts/filterSlice";
import { categories } from "@/constant";
import InfiniteScroll from "react-infinite-scroll-component";
import { TPost } from "@/types/postType";

// ----------- feed posts container
export default function FeedPostsContainer() {
  // ------------ searching with debounce
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { searchTerm, sortBy, limit } = useAppSelector(
    (state) => state.filters
  );
  const [page, setPage] = useState(1); // Track current page
  const [allPosts, setAllPosts] = useState<TPost[]>([]); // Maintain all fetched posts
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: posts = { data: [] },
    isLoading,
    isError,
  } = useLoadAllPostsQuery({
    limit,
    sortBy,
    page,
    searchTerm: debouncedSearchTerm,
    category: selectedCategory,
  });

  useEffect(() => {
    if (posts?.data?.length > 0) {
      setAllPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        posts.data.forEach((post: TPost) => {
          if (!newPosts.some((p) => p._id === post._id)) {
            newPosts.push(post);
          }
        });
        return newPosts;
      });
    }
  }, [posts.data]);

  // -------- handle search posts
  const handleSearchPosts = (event: TInputChangeEvent) => {
    setPage(1); // Reset page when searching
    setAllPosts([]); // Clear allPosts when searching
    dispatch(searchPosts(event.target.value));
  };

  // ------------- handle selected category
  const handleSelectedCategory = (value: string) => {
    setSelectedCategory(value);
    setPage(1); // Reset page when sorting
    setAllPosts([]); // Clear allPosts when sorting
  };

  // ------------- handle sort posts
  const handleSortPosts = (value: string) => {
    setPage(1); // Reset page when sorting
    setAllPosts([]); // Clear allPosts when sorting
    dispatch(setSortBy(value));
  };

  // has more
  const hasMore = posts?.data?.length > 0;

  // Infinite Scroll fetch more data function
  const fetchMoreData = () => {
    console.log("Fetching more data called: ", page);
    setPage((prevPage) => prevPage + 1);
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <ErrorComponent />;
  } else if (allPosts?.length === 0) {
    content = <DataNotFound />;
  } else {
    content = allPosts?.map((post) => <PostCard key={post._id} post={post} />);
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
                onValueChange={handleSelectedCategory}
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
      {/* <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content}
      </div> */}

      <InfiniteScroll
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        style={{ overflow: "hidden" }}
        dataLength={posts?.data?.length} // Current number of posts
        next={fetchMoreData} // Function to load more data
        hasMore={hasMore} // Adjust this based on your logic for determining if more posts are available
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>No more posts to load</p>
        }
      >
        {content}
      </InfiniteScroll>

      {/* show if no posts available  */}
      {allPosts?.length === 0 && (
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
