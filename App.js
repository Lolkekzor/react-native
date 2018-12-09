import { Navigation } from "react-native-navigation";

/// Screens
import FirstPage from "./src/screens/FirstPage";
Navigation.registerComponent(`screens.FirstPage`, () => FirstPage);
import GetOffers from "./src/screens/GetOffers";
Navigation.registerComponent(`screens.GetOffers`, () => GetOffers);
import RestaurantRequests from "./src/screens/RestaurantRequests";
Navigation.registerComponent('screens.RestaurantRequests', () => RestaurantRequests);

export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: "screens.RestaurantRequests"
        }
      }
    });
  });
}
