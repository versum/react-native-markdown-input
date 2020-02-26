import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Button } from 'react-native';
import ReactNativeMarkdownPackage from 'react-native-markdown-package';
import { MarkdownView as ReactNativeMarkdownView } from 'react-native-markdown-view';
import ReactNativeMarkdownRenderer from 'react-native-markdown-renderer';
import ReactNativeSimpleMarkdown from 'react-native-simple-markdown';

// @ts-ignore
import { MarkdownInput } from '@versum/react-native-markdown-input';

const markdownPackages = [
  {
    packageName: 'react-native-markdown-package',
    id: 'reactNativeMarkdownPackage',
    component: ReactNativeMarkdownPackage,
  },
  {
    id: 'reactNativeMarkdownRenderer',
    packageName: 'react-native-markdown-renderer',
    component: ReactNativeMarkdownRenderer,
  },
  {
    id: 'reactNativeMarkdownView',
    packageName: 'react-native-markdown-view',
    component: ReactNativeMarkdownView,
  },
  {
    id: 'reactNativeSimpleMarkdown',
    packageName: 'react-native-simple-markdown',
    component: ReactNativeSimpleMarkdown,
  },
];

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [previewPackage, togglePreview] = useState('');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <MarkdownInput onChangeText={setInputValue} value={inputValue} />

      {markdownPackages.map(
        ({ packageName, component: PreviewComponent, id }) => (
          <View key={id} style={styles.previewContainer}>
            <Button
              onPress={() => togglePreview(id)}
              title={`${packageName} preview`}
            />
            {previewPackage === id && (
              <PreviewComponent>{inputValue}</PreviewComponent>
            )}
          </View>
        )
      )}

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
  previewContainer: {
    marginVertical: 10,
  },
});
