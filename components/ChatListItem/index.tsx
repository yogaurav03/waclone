import React from 'react'
import { View, Text, Image } from 'react-native';
import moment from "moment";
import Users from '../../data/Users';
import { ChatRoom } from "../../types";
import styles from './style';

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props;

    const user = chatRoom.users[1];

    return (
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
                    <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>
            <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
        </View>
    );
};

export default ChatListItem;