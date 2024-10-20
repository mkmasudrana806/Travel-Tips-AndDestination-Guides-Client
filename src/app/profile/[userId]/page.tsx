import React from "react";
import UserProfilePage from "@/components/profile/UserProfilePage";

const page = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <UserProfilePage id={params?.userId} />
    </div>
  );
};

export default page;
