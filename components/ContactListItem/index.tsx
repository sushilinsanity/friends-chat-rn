import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import styles from './styles';
import { User } from '../../types';
import { listChatRooms } from '../../screens/queries';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';

export type ContactListItemProps = {
  user: User
}

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = async () => {
    // console.log(user.id);
    const fetchListChatRooms = await API.graphql(graphqlOperation(listChatRooms));
    const chatRooms = fetchListChatRooms.data.listChatRooms;
    const array = [];
    let chatRoomId = null;
    let targetChatRoomUser = null;

    for (let i = 0; i < chatRooms.items.length; i++) {
      const userFound = chatRooms.items[i].chatRoomUsers.items.findIndex((userId: String) => userId.user.id === user.id);
      array.push(userFound);
    }

    if (array.includes(0)) {
      const index = array.findIndex(element => element === 0);
      console.log(index);
      chatRoomId = chatRooms.items[index].id;
      targetChatRoomUser = chatRooms.items[index].chatRoomUsers.items[0].user;
      navigation.navigate('ChatRoom', {
        id: chatRoomId, user: targetChatRoomUser
      })
    } else {
      try {
        // create a new chat room
        const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {
          input:
            { lastMessageID: "ssssssss-4159-411f-bed3-be5ab912f51f" }
        }));

        if (!newChatRoomData.data) {
          console.log("failed to create a chat room");
          return
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;

        // add user to the chat room
        const targetedUserData = await API.graphql(graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id
          }
        }))

        // add authenticated user to the chat room (ourself)
        const userInfo = await Auth.currentAuthenticatedUser();
        await API.graphql(graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id
          }
        }))

        navigation.navigate('ChatRoom', {
          id: newChatRoom.id,
          user: targetedUserData.data.createChatRoomUser.user
        })
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.image} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactListItem;