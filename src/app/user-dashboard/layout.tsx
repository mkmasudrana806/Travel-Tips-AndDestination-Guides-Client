import Loading from "@/components/message/Loading";
import React, { Suspense } from "react";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | User Dashboard",
  description:
    "Travel Tips And Destination Guides, User Dashboard. here user will get valueable insight about their profile and activities",
};


// ------------ reset password password page
const layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default layout;
