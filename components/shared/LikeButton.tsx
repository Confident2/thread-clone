"use client";

import { useState } from "react";
import { toggleThreadLike } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  currentUserId: string;
  path: string;
}

const LikeButton: React.FC<Props> = ({ threadId, currentUserId, path }) => {
  const [liked, setLiked] = useState(false);
  const pathname = usePathname();

  const handleLikeClick = async () => {
    try {
      // Toggle the liked state locally
      setLiked((prevLiked) => !prevLiked);

      // Call the toggleThreadLike function with the updated liked state
      await toggleThreadLike(threadId, currentUserId, pathname);
    } catch (error) {
      console.error("Error toggling thread like:", error);
    }
  };

  return (
    <button onClick={handleLikeClick}>
      {liked ? (
        <img
          src="/assets/heart-filled.svg"
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      ) : (
        <img
          src="/assets/heart-gray.svg"
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      )}
    </button>
  );
};

export default LikeButton;
