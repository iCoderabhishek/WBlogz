

export const navItems = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Feed",
      link: "/feed",
    },
    {
        name: "Post",
        link: "/upload"
    },
    {
      name: "Profile",
      link: "/profile",
      
    }
  ];
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
  likes: number;
  comments: number;
}

  export const samplePosts: Post[] = [
    {
      _id: "1",
      title: "Sunset at the Beach",
      description:
        "Captured this amazing sunset while traveling along the coast. The colors were absolutely breathtaking!",
      imgUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      user: {
        name: "Sarah Wilson",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      },
      likes: 234,
      comments: 42,
    },
    {
      _id: "2",
      title: "Urban Architecture",
      description:
        "Modern architecture in the heart of the city. The interplay of light and shadow creates a dramatic effect.",
      imgUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      user: {
        name: "Alex Chen",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      },
      likes: 187,
      comments: 28,
    },
    {
      _id: "3",
      title: "Mountain Adventure",
      description:
        "Early morning hike to catch the sunrise from the mountain peak. Worth every step of the journey!",
      imgUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60",
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 23 hours ago
      user: {
        name: "Emma Hiking",
      },
      likes: 543,
      comments: 89,
    },
  ];
