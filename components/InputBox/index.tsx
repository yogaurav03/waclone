import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles';
import {
    MaterialCommunityIcons,
    Fontisto,
  } from '@expo/vector-icons';

const InputBox = () => {

    const [message, setMessage] = useState('');

    const onMicrophonePress = () => {
        console.warn('Microphone')
      }

      const onSendPress = () => {
        console.warn(`Sending: ${message}`)
      }

    const onPress = () => {
        if (!message) {
          onMicrophonePress();
        } else {
          onSendPress();
        }
      }

    return (
        <View style={styles.container}>
             <View style={styles.mainContainer}>
             <Fontisto name="laughing" size={24} color="grey" />
             <TextInput multiline value={message} onChangeText={setMessage} style={styles.textInput} />
             <MaterialCommunityIcons name="attachment" size={24} color="grey" style={styles.icon} />
             {!message && <MaterialCommunityIcons name="camera" size={24} color="grey" style={styles.icon} />}
             </View>
             <TouchableOpacity onPress={onPress}>
             <View style={styles.buttonContainer}>
             {!message
            ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
            : <MaterialCommunityIcons name="send" size={28} color="white" />}
             </View>
             </TouchableOpacity>
             
        </View>
    )
}

export default InputBox
