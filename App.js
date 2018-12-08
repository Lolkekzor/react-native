import { Navigation } from "react-native-navigation";

/// Screens
import FirstPage from "./src/screens/FirstPage";
Navigation.registerComponent(`screens.FirstPage`, () => FirstPage);
import Auth from "./src/screens/Auth";
Navigation.registerComponent(`screens.Auth`, () => Auth);
import Customer from "./src/screens/Customer";
Navigation.registerComponent(`screens.Customer`, () => Customer);
import Restaurant from "./src/screens/Restaurant";
Navigation.registerComponent(`screens.Restaurant`, () => Restaurant);

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
