import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../utils/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageList,
  MessageInput,
  Thread,
  Window,
  ChannelList,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { toast } from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetChatUserId } = useParams();
  const navigate = useNavigate();
  const [chatClient, setChatClient] = useState(null);
  const [chatChannel, setChatChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });
  // console.log(tokenData);

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData || !authUser) return;
      const client = StreamChat.getInstance(STREAM_API_KEY);
      // console.log("Initializing chat client with token:", tokenData.data);
      
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
          setChatClient(client);
        }

        const channelId = [authUser._id, targetChatUserId].sort().join("_");

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetChatUserId],
        });

        await currentChannel.watch();

        setChatClient(client);
        setChatChannel(currentChannel);
      } catch (error) {
        console.error("Error connecting user to Stream Chat:", error);
        toast.error("Failed to connect to chat. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, targetChatUserId]);

  if (isLoading || !chatClient || !chatChannel) return <ChatLoader />;

  const filters = { members: { $in: [authUser._id] } };
  const sort = { last_message_at: -1 };
  const options = { limit: 10 };

  const handleVideoCall = () => {
    if(chatChannel) {
      const videoCallUrl = `${window.location.origin}/call/${chatChannel.id}`;

      chatChannel.sendMessage({
        text: `I've started a video call. Join me here: ${videoCallUrl}`,
      })
      toast.success("Video call link sent successfully!");
    }
  }

  const handleAudioCall = () => {
    if(chatChannel) {
      const audioCallUrl = `${window.location.origin}/call/${chatChannel.id}`;

      chatChannel.sendMessage({
        text: `I've started an audio call. Join me here: ${audioCallUrl}`,
      })
      toast.success("Audio call link sent successfully!");
    }
  }

  return (
    <div>
      <Chat
        client={chatClient}
        theme="messaging dark"
      >
        <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-md shadow-md bg-base-100">
          {/* Sidebar */}
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

          {/* Main Chat Area */}
          <div className="flex-1 h-full">
            <Channel channel={chatChannel}>
              <div className="w-full relative">
                <CallButton
                  handleVideoCall={handleVideoCall}
                  handleAudioCall={handleAudioCall}
                />
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput focus placeholder="Send a message" />
                </Window>
                <Thread />
              </div>
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default ChatPage;
