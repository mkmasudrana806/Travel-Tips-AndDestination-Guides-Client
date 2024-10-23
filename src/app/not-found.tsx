import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center">
      <Link href={"/"}>
        <Image
          src={
            "https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg"
          }
          width={500}
          height={500}
          alt="Not found page"
        />
      </Link>
    </div>
  );
};

export default NotFound;
