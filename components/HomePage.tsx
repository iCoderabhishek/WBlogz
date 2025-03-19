// app/page.tsx
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const HomePage = () => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h1 className="text-xl font-serif">WBlogz</h1>
        <div className="flex space-x-4">
          <Heart className="w-6 h-6" />
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
