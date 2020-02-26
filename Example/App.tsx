import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';

// @ts-ignore
import { MarkdownInput } from 'react-native-markdown-input';

export default function App() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <MarkdownInput onChangeText={setInputValue1} value={inputValue1} />

      <MarkdownInput
        inputAccessoryViewID="2"
        onChangeText={setInputValue2}
        value={inputValue2}
      />

      <TextInput
        placeholder="Different Input without accessory view"
        style={styles.inputWithoutAccessory}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 50,
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
