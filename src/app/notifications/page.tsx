"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  MessageCircle,
  ThumbsUp,
  UserPlus,
  Settings,
} from "lucide-react";

// Mock data for notifications
const initialNotifications = [
  {
    id: 1,
    type: "like",
    content: 'John Doe liked your post "My Trip to Bali"',
    isRead: false,
    timestamp: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    type: "comment",
    content: 'Sarah Smith commented on your post "Exploring Tokyo"',
    isRead: false,
    timestamp: "2024-03-14T15:45:00Z",
  },
  {
    id: 3,
    type: "follow",
    content: "Mike Johnson started following you",
    isRead: true,
    timestamp: "2024-03-13T09:20:00Z",
  },
  {
    id: 4,
    type: "like",
    content: 'Emma Wilson liked your comment on "Paris Travel Guide"',
    isRead: true,
    timestamp: "2024-03-12T18:10:00Z",
  },
  {
    id: 5,
    type: "comment",
    content:
      'David Brown replied to your comment on "Best Street Food in Bangkok"',
    isRead: false,
    timestamp: "2024-03-11T11:55:00Z",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationPreferences, setNotificationPreferences] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleTogglePreference = (
    key: keyof typeof notificationPreferences
  ) => {
    setNotificationPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="h-4 w-4" />;
      case "comment":
        return <MessageCircle className="h-4 w-4" />;
      case "follow":
        return <UserPlus className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Bell className="mr-2" /> Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Stay updated with your latest activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Notifications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScrollArea className="h-[400px] w-full pr-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 ${
                      notification.isRead ? "opacity-60" : "bg-accent"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">{notification.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="settings">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="likes" className="text-sm font-medium">
                      Likes
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone likes your post
                    </p>
                  </div>
                  <Switch
                    id="likes"
                    checked={notificationPreferences.likes}
                    onCheckedChange={() => handleTogglePreference("likes")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="comments" className="text-sm font-medium">
                      Comments
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for comments on your posts
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={notificationPreferences.comments}
                    onCheckedChange={() => handleTogglePreference("comments")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="follows" className="text-sm font-medium">
                      Follows
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone follows you
                    </p>
                  </div>
                  <Switch
                    id="follows"
                    checked={notificationPreferences.follows}
                    onCheckedChange={() => handleTogglePreference("follows")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="messages" className="text-sm font-medium">
                      Messages
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new messages
                    </p>
                  </div>
                  <Switch
                    id="messages"
                    checked={notificationPreferences.messages}
                    onCheckedChange={() => handleTogglePreference("messages")}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            <Settings className="mr-2 h-4 w-4" /> Manage all settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Notifications;
