"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ThumbsUp,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data (replace with actual API calls in a real application)
const postData = {
  id: 1,
  title: "My Unforgettable Trip to Bali",
  content:
    "<p>Bali, often referred to as the 'Island of the Gods,' is a paradise that captivates visitors with its lush landscapes, vibrant culture, and warm hospitality. During my recent trip, I discovered why this Indonesian gem has become a favorite destination for travelers worldwide.</p><h2>Ubud: The Cultural Heart</h2><p>My journey began in Ubud, the cultural center of Bali. Surrounded by terraced rice paddies and dense forests, Ubud offers a perfect blend of natural beauty and artistic charm. I spent my days exploring ancient temples, watching traditional dance performances, and indulging in yoga sessions amidst the serene landscapes.</p><h2>Beaches of Bali</h2><p>No trip to Bali is complete without experiencing its stunning beaches. From the popular shores of Seminyak to the hidden coves of Uluwatu, each beach has its unique charm. I particularly enjoyed the sunset at Jimbaran Bay, where I savored freshly grilled seafood with my toes in the sand.</p><h2>Adventure in Bali</h2><p>For thrill-seekers, Bali offers plenty of adventures. I went white water rafting on the Ayung River, trekked to the summit of Mount Batur for a breathtaking sunrise, and tried my hand at surfing in Canggu. Each experience added an exciting dimension to my trip.</p><h2>Tips for Fellow Travelers</h2><ul><li>Learn a few basic Indonesian phrases – the locals appreciate the effort.</li><li>Respect local customs, especially when visiting temples.</li><li>Try the local cuisine – don't miss out on Nasi Goreng and Babi Guling.</li><li>Rent a scooter to explore, but be cautious of traffic.</li><li>Bargain at local markets, but do so respectfully.</li></ul><p>Bali left an indelible mark on my heart, and I can't wait to return to this magical island. Whether you're seeking relaxation, adventure, or cultural immersion, Bali has something for everyone. Pack your bags and prepare for an unforgettable journey!</p>",
  author: {
    name: "Jane Doe",
    username: "janedoe",
    avatar: "/placeholder.svg?height=50&width=50",
    isVerified: true,
  },
  category: "Adventure",
  createdAt: "2024-03-15T10:30:00Z",
  upvotes: 127,
  isPremium: false,
};

const comments = [
  {
    id: 1,
    author: "John Smith",
    content: "Great post! I'm planning my trip to Bali now.",
    createdAt: "2024-03-16T08:45:00Z",
  },
  {
    id: 2,
    author: "Emily Brown",
    content: "The beaches sound amazing. Can't wait to visit!",
    createdAt: "2024-03-16T14:20:00Z",
  },
];

export default function PostDetailsPage() {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(postData.upvotes);
  const [commentContent, setCommentContent] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Simulating data fetching based on the post ID
    // In a real application, you would fetch the post data here
    console.log("Fetching post data for ID:", router);
  }, [router]);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvoteCount((prev) => prev - 1);
    } else {
      setUpvoteCount((prev) => prev + 1);
    }
    setIsUpvoted(!isUpvoted);
    // In a real application, you would send this update to your backend
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    const newComment = {
      id: localComments.length + 1,
      author: "Current User", // In a real app, this would be the logged-in user's name
      content: commentContent,
      createdAt: new Date().toISOString(),
    };
    setLocalComments((prev) => [newComment, ...prev]);
    setCommentContent("");
    setSuccess("Comment posted successfully!");
    setTimeout(() => setSuccess(""), 3000);
    // In a real application, you would send this new comment to your backend
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl mb-2">{postData.title}</CardTitle>
              <CardDescription>
                <span className="mr-4">By {postData.author.name}</span>
                <span className="mr-4">Category: {postData.category}</span>
                <span>{new Date(postData.createdAt).toLocaleDateString()}</span>
              </CardDescription>
            </div>
            <Badge variant={postData.isPremium ? "default" : "secondary"}>
              {postData.isPremium ? "Premium" : "Free"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage
                src={postData.author.avatar}
                alt={postData.author.name}
              />
              <AvatarFallback>{postData.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{postData.author.name}</p>
              <p className="text-sm text-muted-foreground">
                @{postData.author.username}
              </p>
            </div>
            {postData.author.isVerified && (
              <Badge variant="secondary">Verified</Badge>
            )}
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleUpvote}>
            <ThumbsUp
              className={`mr-2 h-4 w-4 ${isUpvoted ? "fill-current" : ""}`}
            />
            Upvote ({upvoteCount})
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              document
                .getElementById("comment-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Comments ({localComments.length})
          </Button>
        </CardFooter>
      </Card>

      {/* comments section  */}
      <div id="comment-section" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <Card>
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCommentSubmit}>
              <Textarea
                placeholder="Share your thoughts..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="mb-4"
              />
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert
                  variant="default"
                  className="mb-4 bg-green-50 text-green-800 border-green-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <Button type="submit">Post Comment</Button>
            </form>
          </CardContent>
        </Card>

        {/* comment card  */}
        <div className="mt-6 space-y-4">
          {localComments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <CardTitle className="text-lg">{comment.author}</CardTitle>
                <CardDescription>
                  {new Date(comment.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
