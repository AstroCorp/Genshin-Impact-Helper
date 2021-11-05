import { DrawerNavigationProp } from '@react-navigation/drawer';
import { GenshinData } from '..';

type WishCounterParamList = {
  //
}

type NavigationProp = DrawerNavigationProp<WishCounterParamList>;

export default interface WishCounterProps {
  navigation: NavigationProp;

  banners: GenshinData[];
  setBanners: (banners: GenshinData[]) => void;

  hiddenBeginnersBanner: boolean;
}
