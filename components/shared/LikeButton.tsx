"use client";

import { toggleLikeThread } from "@/lib/actions/thread.actions";
import React, { useState } from "react";

interface Props {
  threadId: string;
  userId: string;
}

const LikeButton: React.FC<Props> = ({ threadId, userId }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLikeClick = async () => {
    try {
      setLiked((prevLiked) => !prevLiked);
      await toggleLikeThread(threadId, userId);

      console.log("Thread like status toggled successfully");
    } catch (error) {
      // Reset the liked state if an error occurs
      setLiked((prevLiked) => !prevLiked);

      console.error("Error toggling thread like status:", error);
    }
  };

  return (
    <button onClick={handleLikeClick}>
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
    </button>
  );
};

export default LikeButton;
