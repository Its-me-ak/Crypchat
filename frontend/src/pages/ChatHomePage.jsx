// src/pages/ChatHomePage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import { Chat, ChannelList } from "stream-chat-react";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../utils/api";
import ChatLoader from "../components/ChatLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatHomePage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const [chatClient, setChatClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData || !authUser) return;
      const client = StreamChat.getInstance(STREAM_API_KEY);

      try {
        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.data
          );
        }

        setChatClient(client);
      } catch (error) {
        console.error("Failed to connect to Stream Chat:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser]);

  const filters = { members: { $in: [authUser?._id] } };
  const sort = { last_message_at: -1 };
  const options = { limit: 10 };

  if (isLoading || !chatClient) return <ChatLoader />;

  return (
    <Chat client={chatClient} theme="messaging dark">
      <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-md shadow-md bg-base-100">
        {/* Sidebar with chat list */}
        <div className="w-[300px] h-full overflow-y-auto border-r">
          <ChannelList
            filters={filters}
            sort={sort}
            options={options}
            Preview={(previewProps) => {
              const members = previewProps.channel.state.members;
              const otherMemberId = Object.keys(members).find(
                (id) => id !== authUser._id
              );
              const otherUser = members[otherMemberId]?.user;

              return (
                <div
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => navigate(`/chat/${otherMemberId}`)}
                >
                  <img
                    src={otherUser?.image || "/default-avatar.png"}
                    alt={otherUser?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {otherUser?.name || "Unknown User"}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {previewProps.latestMessagePreview || "No messages yet"}
                    </span>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Welcome Screen */}
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to Crypchat 💬</h2>
            <p className="text-gray-500">
              Select a conversation to start chatting.
            </p>
          </div>
        </div>
      </div>
    </Chat>
  );
};

export default ChatHomePage;
