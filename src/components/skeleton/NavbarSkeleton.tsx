const NavbarSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-2 border-b max-w-7xl mx-auto animate-pulse">
      {/* Logo and Nav Items */}
      <div className="flex items-center">
        <div className="h-8 w-32 bg-muted rounded" /> {/* Logo Skeleton */}
        <div className="hidden md:flex ml-10 space-x-4">
          <div className="h-4 w-12 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
      </div>

      {/* Search and Auth Buttons */}
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block h-9 w-40 bg-muted rounded-md" />{" "}
        {/* Search bar */}
        <div className="h-9 w-9 bg-muted rounded-full md:rounded-md" />{" "}
        {/* Icon/Avatar */}
        <div className="hidden md:block h-9 w-20 bg-muted rounded-md" />{" "}
        {/* Button */}
      </div>
    </div>
  );
};

export default NavbarSkeleton;
