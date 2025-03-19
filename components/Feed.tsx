// "use client";

// import { useEffect, useState } from "react";
// import { formatDistanceToNow } from "date-fns";
// import { useInView } from "react-intersection-observer";
// import { User, Loader2, WifiOff } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface Post {
//   _id: string;
//   title: string;
//   description: string;
//   imgUrl: string;
//   createdAt: string;
//   user: {
//     name: string;
//     image?: string;
//   };
// }

// export default function Feed() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isOffline, setIsOffline] = useState(false);
//   const [lastId, setLastId] = useState<string | null>(null); // Track the last fetched post's ID
//   const [hasMore, setHasMore] = useState(true); // Track if more posts are available

//   // Use the useInView hook to detect when the loader is in view
//   const { ref: inViewRef, inView } = useInView({
//     threshold: 0.1, // Trigger when 10% of the loader is visible
//   });

//   useEffect(() => {
//     console.log("Feed component mounted"); // Debugging
//     // Check online status
//     setIsOffline(!navigator.onLine);

//     const handleOnline = () => setIsOffline(false);
//     const handleOffline = () => setIsOffline(true);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     // Fetch the first set of posts when the component mounts
//     fetchNextPosts();

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   const fetchNextPosts = async () => {
//     if (loading || isOffline) return;

//     setLoading(true);
//     try {
//       const url = lastId
//         ? `/api/posts?limit=5&lastId=${lastId}` // Fetch posts after the lastId
//         : `/api/posts?limit=5`; // Fetch the first set of posts
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch posts");
//       }
//       const data = await response.json();
//       console.log("Fetched posts:", data.posts); // Debugging

//       if (data.posts.length === 0) {
//         // No more posts available, reset the feed
//         setLastId(null); // Reset the lastId to start from the beginning
//         setHasMore(true); // Allow fetching to continue
//         return;
//       }

//       setPosts((prev) => [...prev, ...data.posts]); // Append new posts to the list
//       setLastId(data.posts[data.posts.length - 1]._id); // Update the last fetched post's ID
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setIsOffline(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch the next set of posts when the loader comes into view
//   useEffect(() => {
//     if (inView && hasMore && !isOffline) {
//       fetchNextPosts();
//     }
//   }, [inView, hasMore, isOffline]);

//   const formatTimeAgo = (date: string) => {
//     return formatDistanceToNow(new Date(date), { addSuffix: true });
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
//       {isOffline && (
//         <div className="flex items-center justify-center gap-2 bg-yellow-500/10 text-yellow-500 p-4 rounded-lg mb-8">
//           <WifiOff className="w-5 h-5" />
//           <p>You're offline. Showing sample posts.</p>
//         </div>
//       )}

//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post._id}>
//             {" "}
//             {/* Ensure each post has a unique key */}
//             <Card className="w-full bg-black/50 backdrop-blur-sm border-2 border-blue-500/20 text-white overflow-hidden">
//               <CardHeader className="flex flex-row items-center gap-4">
//                 <Avatar>
//                   <AvatarImage src={post.user.image} />
//                   <AvatarFallback>
//                     <User className="w-5 h-5" />
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{post.user.name}</h3>
//                   <CardDescription className="text-gray-400">
//                     {formatTimeAgo(post.createdAt)}
//                   </CardDescription>
//                 </div>
//               </CardHeader>

//               <div className="relative aspect-[4/5] overflow-hidden">
//                 <img
//                   src={post.imgUrl}
//                   alt={post.title}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
//                   <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
//                   <p className="text-gray-200">{post.description}</p>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         ))
//       ) : (
//         <div className="text-center text-gray-400">
//           <p>No posts found</p>
//         </div>
//       )}

//       {/* Loader element to trigger fetching the next set of posts */}
//       <div ref={inViewRef} className="flex justify-center p-4">
//         {loading ? (
//           <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
//         ) : (
//           <p className="text-gray-400">Scroll to load more</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useInView } from "react-intersection-observer";
import { User, Loader2, WifiOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FloatingNav } from "./ui/floating-navbar";
import { navItems } from "@/lib/constrants/data";

interface Post {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

// Enhanced post type with a unique instance ID for React keys
interface EnhancedPost extends Post {
  instanceId: string; // A unique ID for this specific instance of the post
}

export default function Feed() {
  const [posts, setPosts] = useState<EnhancedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);
  const [loopCount, setLoopCount] = useState(0); // Track how many times we've looped through all posts
  const [hasMore, setHasMore] = useState(true);

  // Use the useInView hook to detect when the loader is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    console.log("Feed component mounted");
    // Check online status
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Fetch the first set of posts when the component mounts
    fetchNextPosts();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });
  //removed the dep array

  // Generate a unique instance ID for each post
  const enhancePostsWithInstanceIds = (
    newPosts: Post[],
    currentLoopCount: number
  ): EnhancedPost[] => {
    return newPosts.map((post) => ({
      ...post,
      instanceId: `${post._id}-${currentLoopCount}-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    }));
  };

  const fetchNextPosts = async () => {
    if (loading || isOffline) return;

    setLoading(true);
    try {
      const url = lastId
        ? `/api/posts?limit=5&lastId=${lastId}`
        : `/api/posts?limit=5`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Fetched posts:", data.posts);

      if (data.posts.length === 0) {
        // If no more posts, reset to fetch from beginning but with a new loop count
        setLastId(null);
        setLoopCount((prevCount) => prevCount + 1);
        setLoading(false);
        // Immediately fetch from the beginning
        fetchNextPosts();
        return;
      }

      // Add the new posts with unique instance IDs
      const enhancedPosts = enhancePostsWithInstanceIds(data.posts, loopCount);
      setPosts((prev) => [...prev, ...enhancedPosts]);
      setLastId(data.posts[data.posts.length - 1]._id);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsOffline(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the next set of posts when the loader comes into view
  useEffect(() => {
    if (inView && hasMore && !isOffline) {
      fetchNextPosts();
    }
  }, [inView, hasMore, isOffline]);

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      <FloatingNav navItems={navItems} />

      {isOffline && (
        <div className="flex items-center justify-center gap-2 bg-yellow-500/10 text-yellow-500 p-4 rounded-lg mb-8">
          <WifiOff className="w-5 h-5" />
          <p>You're offline. Showing sample posts.</p>
        </div>
      )}

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.instanceId}>
            <Card className="w-full bg-black/50 backdrop-blur-sm border-2 border-blue-500/20 text-white overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={post.user.image} />
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{post.user.name}</h3>
                  <CardDescription className="text-gray-400">
                    {formatTimeAgo(post.createdAt)}
                  </CardDescription>
                </div>
              </CardHeader>

              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={post.imgUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-200">{post.description}</p>
                </div>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">
          <p>No posts found</p>
        </div>
      )}

      {/* Loader element to trigger fetching the next set of posts */}
      <div ref={inViewRef} className="flex justify-center p-4">
        {loading ? (
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        ) : (
          <p className="text-gray-400">Scroll to load more</p>
        )}
      </div>
    </div>
  );
}
