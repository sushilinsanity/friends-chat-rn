import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import styles from './styles';
import { ChatRoom } from '../../types';
import { Auth } from 'aws-amplify';

export type ChatListItemProps = {
  chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const [otherUser, setOtherUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    }
    getOtherUser();
  }, []);

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id, user: otherUser
    });
  }

  if (!otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.image} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                : ""}
            </Text>
          </View>
        </View>
        {/* <Text>{chatRoom.lastMessage.createdAt}</Text> */}
        <Text style={styles.time}>{chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ChatListItem;