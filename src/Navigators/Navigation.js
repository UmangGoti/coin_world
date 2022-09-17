import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { connect } from 'react-redux';
import {
  CoinInfoScreen,
  CreateWalletScreen,
  HomeScreen,
  LoginScreen,
  SplashScreen,
  VerifyPhraseScreen,
  ViewSecretPhraseScreen,
  WalletImportScreen,
} from '../Screens';
import { noInternetConnected } from '../Store/Global';
import { navigationRef } from './NavigationUtils';

const Stack = createStackNavigator();

const Navigation = ({ noInternetConnected, props }) => {
  const [connected, setConnected] = React.useState(true);
  const removeConnectionStatusListener = React.useRef();

  const connectionChangeHandler = React.useCallback(
    state => {
      if (!state) return;
      const { isConnected } = state;
      // Show the modal once the status changes to offline
      if (connected && isConnected === false) {
        setConnected(true);
      }
      if (connected !== isConnected && isConnected !== null) {
        setConnected(isConnected);
      }
    },
    [connected, setConnected],
  );

  React.useEffect(() => {
    setTimeout(() => {
      removeConnectionStatusListener.current = NetInfo.addEventListener(
        connectionChangeHandler,
      );
    }, 1000);
    return function cleanup() {
      removeConnectionStatusListener.current &&
        removeConnectionStatusListener.current();
    };
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateWalletScreen"
          component={CreateWalletScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewSecretPhraseScreen"
          component={ViewSecretPhraseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WalletImportScreen"
          component={WalletImportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CoinInfoScreen"
          component={CoinInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyPhraseScreen"
          component={VerifyPhraseScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapActionCreators = {
  noInternetConnected,
};

export default connect(null, mapActionCreators)(Navigation);
