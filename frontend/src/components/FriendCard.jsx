import React from "react";
import { getLanguageFlag } from "../utils/languageFlag";
import { Link } from "react-router";
import { MapPinIcon } from "lucide-react";

const FriendCard = ({ friend }) => {

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="badge badge-secondary text-xs">
            Native: {getLanguageFlag(friend.nativeLanguage)}
          </span>

          <span className="badge badge-secondary text-xs">
            Learning: {getLanguageFlag(friend.learningLanguage)}
          </span>
        </div>

        <p className="text-sm flex items-center opacity-70 mb-2">
          <MapPinIcon className="size-3 mr-2 mt-0.5" />
          {friend.location ? friend.location : "Location not specified"}
        </p>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
