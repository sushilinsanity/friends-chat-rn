import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';

import ChatMessage from '../components/ChatMessage';
import BG from '../assets/images/BG.png';
import InputBox from '../components/InputBox';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const route = useRoute();
  
  const fetchMessages = async () => {
    const messagesData = await API.graphql(graphqlOperation(
      messagesByChatRoom, { chatRoomID: route.params.id }
    ))
    setMessages(messagesData.data.messagesByChatRoom.items);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    }
    getMyId();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateMessage))
      .subscribe({
        next: (data) => {
          const newMessage = data.value.data.onCreateMessage;
          if (newMessage.chatRoomID !== route.params.id) {
            return;
          }
          // setMessages([...messages, newMessage]);
          fetchMessages();
        }
      });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <ImageBackground source={BG} style={{ width: '100%', height: '100%' }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        keyExtractor={(item) => item.id}
      // inverted
      />
      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
}

export default ChatRoomScreen;