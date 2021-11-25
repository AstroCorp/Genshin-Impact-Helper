import { DrawerNavigationProp } from '@react-navigation/drawer';

type EventsParamList = {
  //
}

type NavigationProp = DrawerNavigationProp<EventsParamList>;

export default interface EventsProps {
  navigation: NavigationProp;
}
