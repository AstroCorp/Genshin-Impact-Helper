import { DrawerNavigationProp } from '@react-navigation/drawer';

type HeaderParamList = {

}

type NavigationProp = DrawerNavigationProp<HeaderParamList>;

export default interface HeaderProps {
  navigation: NavigationProp;

  title: string;
}
