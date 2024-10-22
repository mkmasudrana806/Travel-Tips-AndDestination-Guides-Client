import Loading from "@/components/message/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import { TPost } from "@/types/postType";

// ---------------- recent posts component
const RecentPosts = () => {
  // ------------ redux
  const { data: posts = { data: [] }, isLoading } = useLoadAllPostsQuery({
    limit: 5,
  });

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
        <CardDescription>Latest published content</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.data?.slice(0, 5)?.map((post: TPost) => (
              <TableRow key={post?._id}>
                <TableCell>{post?.title.slice(0, 40)}</TableCell>
                <TableCell>{post?.author?.name}</TableCell>
                <TableCell>{post?.createdAt}</TableCell>
                <TableCell>{post?.category}</TableCell>
                <TableCell>{post?.premium ? "Premium" : "Free"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
