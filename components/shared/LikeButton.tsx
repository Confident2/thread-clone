"use client";

import { useEffect, useState } from "react";
import {
  toggleLikeThread,
  getLikesCountForThread,
  checkIfUserLikedThread,
} from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  userId: string;
}

const LikeButton = ({ threadId, userId }: Props) => {
  const [liked, setLiked] = useState<boolean>(false); // Initialize liked state to false
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const path = usePathname();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the likes count for the thread
        const likesCount = await getLikesCountForThread(JSON.parse(threadId));
        setLikesCount(likesCount);

        // Check if the user has already liked the thread
        const userLiked = await checkIfUserLikedThread(
          JSON.parse(threadId),
          JSON.parse(userId)
        );
        setLiked(userLiked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [threadId, userId]);

  const handleLikeClick = async () => {
    try {
      // Toggle the like state
      const newLikedState = !liked;

      // Update the like state in the database
      await toggleLikeThread(
        JSON.parse(threadId),
        JSON.parse(userId),
        path,
        newLikedState
      );

      // Update the likes count based on the current state
      setLikesCount((prevCount) =>
        newLikedState ? (prevCount ?? 0) + 1 : Math.max((prevCount ?? 0) - 1, 0)
      );

      // Update the liked state
      setLiked(newLikedState);

      console.log("Thread like status toggled successfully");
    } catch (error) {
      console.error("Error toggling thread like status:", error);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleLikeClick}
        aria-label={liked ? "Unlike" : "Like"}
        className="flex"
      >
        {liked ? (
          <img
            src="/assets/heart-filled.svg"
            alt="heart-filled"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        ) : (
          <img
            src="/assets/heart-gray.svg"
            alt="heart-gray"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        )}
        {likesCount !== null && likesCount !== 0 && (
          <span className="like-count text-white">{likesCount}</span>
        )}
      </button>
    </div>
  );
};

export default LikeButton;
