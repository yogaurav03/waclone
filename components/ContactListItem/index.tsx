import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import {
    graphqlOperation,
} from 'aws-amplify';
import { User } from "../../types";
import styles from './style';
import {
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations';

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;


    const navigation = useNavigation();

    const onClick = async () => {
        try {
            // create a chat room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom
                    , {
                        input: {

                        }
                    }
                )
            )
            if (!newChatRoomData.data) {
                console.log(" Failed to create a chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            // add user to a chat room

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: user.id,
                        chatRoomID: newChatRoom.id,
                    }
                }
                )
            )

            // add authenticated user to chat room

            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id,
                    }
                }
                )
            )
            navigation.navigate('ChatRoomScreen', {
                id: newChatRoom.id,
                name: "Hardcoded name",
            })

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user.imageUri,
                        }}
                    />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ContactListItem;