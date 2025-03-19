import React from "react";

const LoaderHeader = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-[2px] bg-blue-400">
        <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-purple-500 animate-[loading_1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

export default LoaderHeader;
