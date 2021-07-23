import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
import Users from '../data/Users';
import NewMessageButton from '../components/NewMessageButton';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <FlatList
      style={{width: '100%'}}
      data={Users}
      renderItem={({ item }) => <ContactListItem user={item} />}
      keyExtractor={(item) => item.id} />

      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
