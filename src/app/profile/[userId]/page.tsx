"use client";

import React from "react";
import UserProfilePage from "@/components/profile/UserProfilePage";

const page = ({ params }: { params: { userId: string } }) => {
  console.log("current user: ", params.userId);
  return (
    <div>
      <UserProfilePage id={params?.userId} />
    </div>
  );
};

export default page;
