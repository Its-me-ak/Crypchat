import React from "react";
import { getLanguageFlag } from "../utils/languageFlag";
import { Link } from "react-router";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
              <img src={friend.avatar} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="badge badge-secondary text-xs">
           Native: {getLanguageFlag(friend.nativeLanguage)}
          </span>

          <span
            className="badge badge-secondary text-xs">
           Learning: {getLanguageFlag(friend.learningLanguage)}
            </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
