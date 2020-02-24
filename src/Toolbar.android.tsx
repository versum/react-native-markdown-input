import React, { useEffect, useState } from 'react';
import { ScrollView, Keyboard, KeyboardEvent, StyleSheet } from 'react-native';
import ToolbarItem from './ToolbarItem';

const CONTROLS = [
  'bold',
  'italic',
  'heading',
  'link',
  'orderedList',
  'unorderedList',
];

const Toolbar = () => {
  const [{ isKeyboardVisible, keyboardHeight }, toggleKeyboard] = useState({
    isKeyboardVisible: false,
    keyboardHeight: 0,
  });
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow
    );
    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide
    );
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = (keyboardEvent: KeyboardEvent) => {
    if (!keyboardEvent.endCoordinates) {
      return;
    }
    const keyboardHeight = keyboardEvent.endCoordinates.height;

    toggleKeyboard({ isKeyboardVisible: true, keyboardHeight });
  };

  const handleKeyboardHide = () => {
    toggleKeyboard({ isKeyboardVisible: false, keyboardHeight: 0 });
  };

  if (isKeyboardVisible) {
    return (
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        style={[styles.container, { bottom: keyboardHeight }]}
      >
        {CONTROLS.map(item => (
          <ToolbarItem controlName={item} key={item} testID={`${item}Item`} />
        ))}
      </ScrollView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
  },
});

export default Toolbar;
