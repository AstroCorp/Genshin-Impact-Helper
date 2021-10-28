import { Text, LogBox } from 'react-native';
import TextWithDefaultProps from '../types/react-native/textWithDefaultProps';

LogBox.ignoreAllLogs();

((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
((Text as unknown) as TextWithDefaultProps).defaultProps.allowFontScaling = false;
