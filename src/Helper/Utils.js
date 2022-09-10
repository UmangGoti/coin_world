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

{
  /** ChangeImageUrl Extension */
}
export function changeImageUrlExtension(url, toExtension = '.png') {
  var index = url.lastIndexOf('.');
  var extension = url.slice(index, url.length);
  if (extension === '.svg') {
    return url.slice(0, index) + `${toExtension}`;
  }

  return url;
}

{
  /** isSvgUrl Extension */
}
export function isSvgUrl(url) {
  var index = url.lastIndexOf('.');
  var extension = url.slice(index, url.length);
  if (extension === '.svg') {
    return true;
  }

  return false;
}

{
  /**Capitalize First Letter */
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

{
  /**Positive Nagative Number Check */
}
export function positiveNagative(string) {
  return Number(string) > 0;
}

{/** Commarize */}
export function commarize(value, min = 1e3) {
  // Alter numbers larger than 1k
  if (value >= min) {
    var units = [' Thousand', ' Million', ' Billion', ' Trillon'];

    var order = Math.floor(Math.log(value) / Math.log(1000));

    var unitname = units[order - 1];
    var num = (value / 1000 ** order).toFixed(2);

    // output number remainder + unitname
    return num + unitname;
  }

  // return formatted original number
  return value.toFixed(6).toString();
}
