import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { toast } from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetChatUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [chatChannel, setChatChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
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

  const handleVideoCall = () => {
    if (chatChannel) {
      const videoCallUrl = `${window.location.origin}/call/${chatChannel.id}`;

      chatChannel.sendMessage({
        text: `I've started a video call. Join me here: ${videoCallUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };


  return (
    <div className="h-[91vh]">
      <Chat client={chatClient} theme="messaging dark">
        <div className="flex h-[calc(100vh-68px)] overflow-hidden rounded-md shadow-md bg-base-100">
          {/* Main Chat Area */}
          <div className="flex-1 h-full">
            <Channel channel={chatChannel}>
              <div className="w-full relative">
                <CallButton
                  handleVideoCall={handleVideoCall}
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
