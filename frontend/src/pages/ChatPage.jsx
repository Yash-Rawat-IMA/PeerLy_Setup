import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import ChatLoader from "../components/ChatLoader.jsx";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);

  const [chatChannel, setChatChannel] = useState(null);

  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, //only run after auth user is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) {
        return;
      }
      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token,
        );

        // Creating the channel id
        const channelId = [authUser._id, targetUserId].sort().join("-");
        // [myId, yourId] : if I start the channel
        // [yourId, myId] : if you start the channel
        // above two arrays are different that's why to make them same and unique we used sort

        // Creating the channel
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChatChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat: ", error);
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, targetUserId]);

  if (loading || !chatClient || !chatChannel) return <ChatLoader />;
  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={chatChannel}>
          <div className="w-full relative">
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
