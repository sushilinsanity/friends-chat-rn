import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import ChatListItem from '../components/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import NewMessageButon from '../components/NewMessageButton';
import { getUser } from './queries';

const ChatsScreen = () => {

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(graphqlOperation(
          getUser, { id: userInfo.attributes.sub }
        ));

        setChatRooms(userData.data.getUser.chatRoomUser.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
      {/* <ChatListItem chatRoom={ChatRooms[0]} /> */}
      <NewMessageButon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ChatsScreen;