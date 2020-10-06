import { Platform } from 'react-native';

import ToolbarAndroid from './Toolbar.android';
import ToolbarIos from './Toolbar.ios';

const Toolbar = Platform.select({
  default: ToolbarIos,
  android: ToolbarAndroid,
});

export default Toolbar;
