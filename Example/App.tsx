import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

// @ts-ignore
import { MarkdownInput } from 'react-native-markdown-input';

export default function App() {
  const [inputValue, setInputValue] = useState();

  return (
    <View style={styles.container}>
      <MarkdownInput onChangeText={setInputValue} value={inputValue} />

      <TextInput
        placeholder="Different Input without accessory view"
        style={styles.inputWithoutAccessory}
      />
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

  inputWithoutAccessory: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 5,
    width: 300,
  },
});
