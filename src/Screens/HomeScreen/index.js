import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';
import { getAssets } from '../../Store/GetAssets';
import { openLink } from '../../Helper/Utils';

const HomeScreen = ({ getAssets }) => {
  const [assetsList, setAssets] = useState([]);

  useEffect(() => {
    const apiToGetAssets = () => {
      getAssets(true, {
        SuccessCallback: res => {
          setAssets(res?.data);
        },
        FailureCallback: res => {},
      });
    };
    const interval = setInterval(() => {
      apiToGetAssets();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <StatusBar backgroundColor={color.MAIN_DARK} />
      {/* <View style={{ marginBottom: normalize(100) }}></View> */}
      <View
        style={{
          borderTopLeftRadius: normalize(24),
          borderTopRightRadius: normalize(24),
          backgroundColor: color.dark,
          flex: 1,
        }}>
        <FlatList
          data={assetsList}
          contentContainerStyle={{
            paddingHorizontal: sizes.CONTAINER_PADDING,
            paddingVertical: sizes.CONTAINER_PADDING,
          }}
          keyExtractor={(item, index) => {
            `${index}`;
          }}
          renderItem={({ item, index }) => {
            return <AssetCard item={item} />;
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function positiveNagative(string) {
  return Number(string) > 0;
}

const AssetCard = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: color.WHITE,
        marginBottom: normalize(10),
        padding: normalize(15),
        borderRadius: normalize(24),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/**Header*/}
        <View>
          <Text
            style={{
              fontSize: sizes.title,
              fontFamily: Fonts.SFPRO_ROUNDED_Bold,
              color: color.MAIN_DARK,
              lineHeight: normalize(20),
              letterSpacing: 1,
            }}>
            {capitalizeFirstLetter(item.id)}
          </Text>
          <Text
            style={{
              fontSize: sizes.body2,
              fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
              color: color.placeholder,
              lineHeight: normalize(16),
              letterSpacing: 0.5,
            }}>
            {capitalizeFirstLetter(item.symbol)}
          </Text>
        </View>
        {/**ChangePercent24Hr */}
        <View>
          <Text
            style={{
              fontSize: sizes.body2,
              fontFamily: Fonts.SFPRO_ROUNDED_Heavy,
              color: positiveNagative(item.changePercent24Hr)
                ? color.green
                : color.brightRed,
              alignSelf: 'flex-start',
              lineHeight: normalize(16),
              letterSpacing: 0.5,
            }}>
            {positiveNagative(item.changePercent24Hr)
              ? `+${Number(item.changePercent24Hr).toFixed(2)}%`
              : `${Number(item.changePercent24Hr).toFixed(2)}%`}
          </Text>
        </View>
      </View>
      <View style={{ height: normalize(10) }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/**Coin Image */}
        <Pressable
          onPress={() => {
            openLink(item?.explorer);
          }}
          style={{
            width: normalize(45),
            height: normalize(45),
            backgroundColor: color.blueGreyDarkLight,
            borderRadius: normalize(12),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: normalize(30),
              height: normalize(30),
            }}
            source={{
              uri: `https://assets.coincap.io/assets/icons/${(item?.symbol).toLowerCase()}@2x.png`,
            }}
          />
        </Pressable>
        <View style={{ alignSelf: 'flex-end' }}>
          <Text
            style={{
              fontSize: sizes.body2,
              fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
              color: color.placeholder,
              alignSelf: 'flex-end',
              lineHeight: normalize(16),
              letterSpacing: 0.5,
            }}>
            USD
          </Text>
          {/**Price */}
          <Text
            style={{
              fontSize: sizes.body,
              fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
              color: color.MAIN_DARK,
              lineHeight: normalize(16),
              letterSpacing: 0.5,
            }}>
            {`$${Number(item.priceUsd).toFixed(2)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  assets: state.getAsset.assets,
});

const mapDispatchToProps = {
  getAssets,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
