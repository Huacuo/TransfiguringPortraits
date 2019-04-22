
import TakePhoto from './photo'
import Item from './item'
import Waiting from './waiting'
import Swap from './swap'
import Welcome from './welcome'
import Submit from './submit'

import {
    createStackNavigator, 
    createAppContainer
} from 'react-navigation'

const AppNavigator = createStackNavigator({
    Home: {
      screen: Welcome
    },
    Submit: {
      screen: Submit,
    },
    Photo: {
      screen: TakePhoto,
    },
    Item: {
      screen: Item,
    },
    Wait: {
        screen: Waiting,
    },
    Swap: {
        screen: Swap
    }
  }, 
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'orange'
      }
    }
  });


const AppContainer = createAppContainer(AppNavigator); 

export default AppContainer;


