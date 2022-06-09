import { DrawerNavigationProp } from '@react-navigation/drawer';

type SettingsParamList = {
  //
}

type NavigationProp = DrawerNavigationProp<SettingsParamList>;

export default interface SettingsProps {
  navigation: NavigationProp;
}
