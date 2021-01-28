import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Image, View, TouchableWithoutFeedback } from 'react-native';
import { Octicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ContactsScreen from '../screens/ContactsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// function ChatHeaderIcon(imageUri: string) {
//   return (
//     <Image
//       source={{ uri: imageUri }}
//       style={{ width: 30, height: 30, borderRadius: 40 / 2, }} />
//   );
// }

function HeaderLeft(imageUri: string) {
  const navigation = useNavigation();
  return (
    <View style={{
      flexDirection: 'row', width: 70,
      justifyContent: 'space-between', marginLeft: 10,
      alignItems: 'center'
    }}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={22} color={'white'} />
      </TouchableWithoutFeedback>
      <Image
        source={{ uri: imageUri }}
        style={{ width: 36, height: 36, borderRadius: 36 / 2, }} />
    </View>
  );
}


const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "FriendsChat",
          headerRight: () => (
            <View style={{
              flexDirection: 'row', width: 60,
              justifyContent: 'space-between', marginRight: 10
            }}>
              <Octicons name="search" size={22} color="white" />
              <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.user.name,
          headerTitleStyle: { marginLeft: 20 },
          // headerTitle: () => ChatHeaderIcon(route.params.user.imageUri),
          headerLeft: () => HeaderLeft(route.params.user.imageUri),
          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-between',
              marginLeft: 10,
            }}>
              <FontAwesome5 name="video" size={22} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
            </View>
          )
        })}
      />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
