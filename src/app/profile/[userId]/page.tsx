import React from "react";
import UserProfilePage from "@/components/UserProfile";

const page = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <h1>User: {params.userId}</h1>
      <UserProfilePage />
    </div>
  );
};

export default page;
