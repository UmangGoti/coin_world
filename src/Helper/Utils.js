import { Alert, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { color } from '../Theme/theme';

export function helperLog(tag, type) {
  console.log(tag, JSON.stringify(type));
}

export const openLink = async giveUrl => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(giveUrl, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: color.MAIN_DARK,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: color.MAIN_DARK,
        secondaryToolbarColor: color.MAIN_DARK,
        navigationBarColor: 'black',
        navigationBarDividerColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } else Linking.openURL(giveUrl);
  } catch (error) {
    Alert.alert(error.message);
  }
};
