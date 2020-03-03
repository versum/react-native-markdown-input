import React, { useEffect, useState } from 'react';
import { ScrollView, Keyboard, KeyboardEvent, StyleSheet } from 'react-native';

import { ToolbarProps } from '../componentTypes';

import ToolbarItem from './ToolbarItem';

const Toolbar = ({
  CustomToolbarItem,
  controls,
  isFocused,
  handleItemPress,
}: ToolbarProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

    setKeyboardHeight(keyboardHeight);
  };

  const handleKeyboardHide = () => {
    setKeyboardHeight(0);
  };

  if (keyboardHeight !== 0 && isFocused) {
    return (
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        style={[styles.container, { bottom: keyboardHeight }]}
      >
        {controls.map(item =>
          CustomToolbarItem !== undefined ? (
            <CustomToolbarItem
              controlName={item}
              handleItemPress={handleItemPress}
              key={item}
              testID={`${item}Item`}
            />
          ) : (
            <ToolbarItem
              controlName={item}
              handleItemPress={handleItemPress}
              key={item}
              testID={`${item}Item`}
            />
          )
        )}
      </ScrollView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    elevation: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});

export default Toolbar;
