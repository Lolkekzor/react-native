import { Navigation } from "react-native-navigation";

/// Screens
import Auth from "./src/screens/Auth";
Navigation.registerComponent(`screens.Auth`, () => Auth);
import Customer from "./src/screens/Customer";
Navigation.registerComponent(`screens.Customer`, () => Customer);
import Restaurant from "./src/screens/Restaurant";
Navigation.registerComponent(`screens.Restaurant`, () => Restaurant);
import GetOffers from "./src/screens/GetOffers";
Navigation.registerComponent(`screens.GetOffers`, () => GetOffers);

export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: "screens.GetOffers"
        }
      }
    });
  });
}
