import { StackNavigationProp } from '@react-navigation/stack';

type TutorialParamList = {

}

type NavigationProp = StackNavigationProp<TutorialParamList, 'Tutorial'>;

export default interface TutorialProps {
  navigation: NavigationProp;
}
