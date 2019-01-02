import { Navigation } from "react-native-navigation";

/// Screens
import FirstPage from "./src/screens/FirstPage";
Navigation.registerComponent(`screens.FirstPage`, () => FirstPage);
import GetOffers from "./src/screens/GetOffers";
Navigation.registerComponent(`screens.GetOffers`, () => GetOffers);
import RestaurantRequests from "./src/screens/RestaurantRequests";
Navigation.registerComponent('screens.RestaurantRequests', () => RestaurantRequests);
import BrowseOffers from "./src/screens/BrowseOffers";
Navigation.registerComponent('screens.BrowseOffers', () => BrowseOffers);
import ChooseLaunch from "./src/screens/ChooseLaunch";
Navigation.registerComponent('screens.ChooseLaunch', () => ChooseLaunch);

export default () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "screens.ChooseLaunch", /// Change to  name: "screens.FirstPage" after debug
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                }
              }
            }
          }
        ]
      }
    }
  })
}

/**
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: "screens.FirstPage",
        }
      }
    })
  });
*/

/**
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "screens.RestaurantRequests",
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'Restaurant',
                    alignment: 'center',
                    fontSize: 26,
                    fontWeight: "bold",
                    color: 'white',
                    fontFamily: 'Helvetica',
                  },
                  backButton: {
                    visible: true,
                    color: "white"
                  },
                  background: {
                    color: '#D01F5B'
                  }
                }
              }
            }
          }
        ]
      }
    }
  });

*/