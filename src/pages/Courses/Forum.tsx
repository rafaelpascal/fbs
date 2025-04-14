import { useState } from "react";
import { Link } from "react-router-dom";
import ForumCards from "~/components/cards/ForumCards";
import { ROUTES } from "~/components/constants/routes";
import { DashboardArea } from "~/layouts/DashboardArea";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("recent");
  const forumData = [
    {
      id: 1,
      avatarImg: "",
      avatarName: "Alexa Rawles",
      authorName: "Uchenna Joe",
      postDate: "5 April at 12:45",
      postTitle:
        "Foreign business and growth before the start of African business trade...",
      postMeta: "25 minutes ago 3 Replies 56 Likes 506 Views",
      avatarColor: "#fff",
    },
    {
      id: 2,
      avatarImg: "",
      avatarName: "John Smith",
      authorName: "Amaka Obi",
      postDate: "6 April at 9:30",
      postTitle: "Exploring youth entrepreneurship in West Africa",
      postMeta: "10 minutes ago 7 Replies 102 Likes 850 Views",
      avatarColor: "#fff",
    },
    {
      id: 3,
      avatarImg: "",
      avatarName: "Sandra Duke",
      authorName: "Ngozi Chima",
      postDate: "7 April at 14:00",
      postTitle: "Is AI the next frontier for African economies?",
      postMeta: "1 hour ago 5 Replies 60 Likes 320 Views",
      avatarColor: "#fff",
    },
  ];

  const filteredData = forumData
    .filter(
      (item) =>
        item.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "recent") return 0; // Default order (assuming it's recent)
      if (filter === "likes") {
        const likesA = parseInt(a.postMeta.match(/(\d+)\s+Likes/)?.[1] || "0");
        const likesB = parseInt(b.postMeta.match(/(\d+)\s+Likes/)?.[1] || "0");
        return likesB - likesA;
      }
      return 0;
    });

  return (
    <DashboardArea>
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="font-DMSans text-2xl mb-10 font-bold text-left text-[#FF1D09B2]">
          Forum & Conversations
        </h2>
        <Link
          to={ROUTES.CONVERSATION}
          className="font-DMSans text-lg mb-10 font-semibold text-white p-2 rounded-lg bg-[#FF1D09B2]"
        >
          Start conversation
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1D09B2]"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1D09B2]"
        >
          <option value="recent">Most Recent</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredData.map((item, index) => (
          <ForumCards key={index} {...item} />
        ))}
      </div>
    </DashboardArea>
  );
};

export default Forum;
