import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Mail, Phone, MapPin } from "lucide-react";

const ContactInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          You can also reach us through the following channels:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>support@traveltips.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span>+880 1792852446</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span>123 Travel Street, Adventure City, Dhaka</span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Our support team is available Monday to Friday, 9AM to 5PM UTC+.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ContactInformation;
