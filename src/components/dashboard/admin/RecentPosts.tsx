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

const recentPosts = [
  {
    id: 1,
    title: "Exploring the Amazon Rainforest",
    author: "David Explorer",
    date: "2024-03-04",
  },
  {
    id: 2,
    title: "Top 10 Beaches in Southeast Asia",
    author: "Emma Beachgoer",
    date: "2024-03-05",
  },
  {
    id: 3,
    title: "A Foodies Guide to Italy",
    author: "Frank Gourmet",
    date: "2024-03-06",
  },
];

const RecentPosts = () => {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
