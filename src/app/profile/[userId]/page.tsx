import React from "react";
import UserProfilePage from "@/components/profile/UserProfilePage";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | Profile",
  description:
    "Travel Tips And Destination Guides Profile page give all details about a traveller",
};

const page = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <UserProfilePage id={params?.userId} />
    </div>
  );
};

export default page;
