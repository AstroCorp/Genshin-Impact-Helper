import { DrawerNavigationProp } from '@react-navigation/drawer';

type SettingsParamList = {

}

type NavigationProp = DrawerNavigationProp<SettingsParamList, 'Settings'>;

export default interface SettingsProps {
  navigation: NavigationProp;

  counter: number;

  onIncrement: (value: number) => void;
  onDecrement: (value: number) => void;
  onListRepos: () => void;
}
