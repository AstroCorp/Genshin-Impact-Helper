import { StackNavigationProp } from '@react-navigation/stack';
import { GenshinData } from '..';

type HomeParamList = {

}

type NavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

export default interface HomeProps {
  navigation: NavigationProp;

  banners: GenshinData[];
  setBanners: (banners: GenshinData[]) => void;
}
