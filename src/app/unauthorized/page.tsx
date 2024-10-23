import Image from "next/image";
import React from "react";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | Unauthorized",
  description:
    "Travel Tips And Destination Guides, Unauthorized page show for unauthorized users access unappropiate content they don't belong to it",
};

// ---------------- unauthorized page
const page = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={
          "https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1883.jpg?t=st=1729259248~exp=1729262848~hmac=424f6504f7992ad84676cd5a5a242433dc8ffa61f696d026fb923cffc155d965&w=740"
        }
        width={500}
        height={500}
        alt="Unauthorized page"
      />
    </div>
  );
};

export default page;
