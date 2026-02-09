import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/not-found-image.png"
        width={500}
        height={300}
        sizes="100vw"
        alt="Not found page"
      />
    </div>
  );
};

export default NotFound;
