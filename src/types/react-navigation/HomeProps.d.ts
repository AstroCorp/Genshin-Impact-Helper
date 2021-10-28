import { StackNavigationProp } from '@react-navigation/stack';

type HomeParamList = {

}

type NavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

export default interface HomeProps {
  navigation: NavigationProp;
}
