import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import Dashboard from "./src/screens/Dashboard";
import VotingScreen from "./src/screens/ValidateToken";
import TokenGeneration from "./src/screens/TokenGeneration";
import ValidateToken from "./src/screens/ValidateToken";
import ViewTokens from "./src/screens/ViewTokens.jsx";

const Navigation = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Dashboard: Dashboard,
    VotingScreen: VotingScreen,
    GenerateToken: TokenGeneration,
    ValidateToken: ValidateToken,
    ViewTokens: ViewTokens,
  },
  {
    initialRouteName: "Welcome",

    defaultNavigationOptions: {
      title: "SupaMenu",
      headerShown: false,
    },
  }
);

export default createAppContainer(Navigation);
