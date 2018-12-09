import { Navigation } from "react-native-navigation";

/// Screens
import FirstPage from "./src/screens/FirstPage";
Navigation.registerComponent(`screens.FirstPage`, () => FirstPage);
import GetOffers from "./src/screens/GetOffers";
Navigation.registerComponent(`screens.GetOffers`, () => GetOffers);

export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: "screens.FirstPage"
        }
      }
    });
  });
}
