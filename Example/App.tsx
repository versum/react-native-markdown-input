import React from 'react';
import { StyleSheet, View } from 'react-native';

// @ts-ignore
import { MarkdownInput } from 'react-native-markdown-input';

export default function App() {
  return (
    <View style={styles.container}>
      <MarkdownInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
