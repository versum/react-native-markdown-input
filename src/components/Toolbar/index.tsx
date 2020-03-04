import React from 'react';
import { StyleSheet, InputAccessoryView, ScrollView } from 'react-native';

import { ToolbarProps } from '../componentTypes';

import ToolbarItem from './ToolbarItem';

const Toolbar = ({
  CustomToolbarItem,
  controls,
  handleItemPress,
  nativeID,
  toolbarItemAccessibilityTraits,
  toolbarContainerStyle,
  toolbarContentContainerStyle,
}: ToolbarProps) => {
  return (
    <InputAccessoryView nativeID={nativeID}>
      <ScrollView
        contentContainerStyle={toolbarContentContainerStyle}
        horizontal
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        style={[styles.container, toolbarContainerStyle]}
        testID="toolbarScrollView"
      >
        {toolbarItemAccessibilityTraits &&
          controls.map(item =>
            CustomToolbarItem !== undefined ? (
              <CustomToolbarItem
                {...toolbarItemAccessibilityTraits[item]}
                controlName={item}
                handleItemPress={handleItemPress}
                key={item}
                testID={`${item}Item`}
              />
            ) : (
              <ToolbarItem
                {...toolbarItemAccessibilityTraits[item]}
                controlName={item}
                handleItemPress={handleItemPress}
                key={item}
                testID={`${item}Item`}
              />
            )
          )}
      </ScrollView>
    </InputAccessoryView>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});
