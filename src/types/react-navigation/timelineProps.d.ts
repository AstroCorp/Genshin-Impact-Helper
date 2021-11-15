import { DrawerNavigationProp } from '@react-navigation/drawer';

type TimelineParamList = {
  //
}

type NavigationProp = DrawerNavigationProp<TimelineParamList>;

export default interface TimelineProps {
  navigation: NavigationProp;
}
