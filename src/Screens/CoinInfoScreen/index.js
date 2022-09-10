import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { SvgUri } from 'react-native-svg';
import { connect } from 'react-redux';
import { ic_left_arrow, ic_verified } from '../../Assets';
import { MainHeader, TagValue } from '../../Components';
import {
  capitalizeFirstLetter,
  openLink,
  positiveNagative,
} from '../../Helper/Utils';
import { goBack } from '../../Navigators/NavigationUtils';
import { getCoinInfo } from '../../Store/GetCoinInfo';
import { color, Fonts, hexToRGB, normalize, sizes } from '../../Theme/theme';

const CoinInfoScreen = ({ route, navigation, props, getCoinInfo }) => {
  const [coinInfo, setCoinInfo] = useState({
    allTimeHigh: {
      price: 0,
      timestamp: 0,
    },
    btcPrice: '',
    change: '',
    coinrankingUrl: '',
    color: color.MAIN_DARK,
    description: '',
    fullyDilutedMarketCap: null,
    iconUrl: '',
    links: [],
    listedAt: 0,
    lowVolume: false,
    marketCap: null,
    name: '',
    numberOfExchanges: 0,
    numberOfMarkets: 0,
    price: null,
    priceAt: 0,
    rank: 0,
    sparkline: [],
    supply: {
      circulating: 0,
      confirmed: true,
      max: 0,
      supplyAt: 0,
      total: 0,
    },
    symbol: '',
    tier: 0,
    uuid: '',
    websiteUrl: '',
  });
  const [isImageUnknown, setImageIsUnknown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiToGetCoinInfo();
  }, []);

  //--API Call
  const apiToGetCoinInfo = () => {
    getCoinInfo(true, route.params?.coinuuid, {
      SuccessCallback: res => {
        setCoinInfo(res?.data?.coin);
        setRefreshing(false);
      },
      FailureCallback: res => {},
    });
  };
  //--End

  useEffect(() => {
    apiToGetCoinInfo();
  }, []);
  if (
    coinInfo?.color === '#00042b' ||
    coinInfo?.color === '#000000' ||
    coinInfo?.color === null
  ) {
    setCoinInfo({ ...coinInfo, color: color.WHITE });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader
        sourceLeft={ic_left_arrow}
        onPressLeft={() => {
          goBack();
        }}
      />
      <View style={{ marginBottom: normalize(10), padding: normalize(20) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/**Coin Image */}
          <View>
            {coinInfo?.iconUrl !== '' && (
              <Pressable
                onPress={() => {
                  openLink(coinInfo?.coinrankingUrl);
                }}
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor:
                    coinInfo?.color !== null
                      ? hexToRGB(`${coinInfo?.color}`)
                      : color.WHITE,
                  borderRadius: normalize(12),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {isImageUnknown ? (
                  <SvgUri
                    onError={event => {
                      console.log(event.nativeEvent.error);
                    }}
                    width={`${normalize(35)}`}
                    height={`${normalize(35)}`}
                    uri={coinInfo?.iconUrl}
                  />
                ) : (
                  <Image
                    onError={event => {
                      setImageIsUnknown(
                        event.nativeEvent.error === 'unknown image format',
                      );
                      console.log(event.nativeEvent.error);
                    }}
                    resizeMode="contain"
                    style={{
                      width: normalize(35),
                      height: normalize(35),
                    }}
                    source={{
                      uri: coinInfo?.iconUrl,
                    }}
                  />
                )}
              </Pressable>
            )}
            {/**Header*/}
            <Text
              style={{
                width: normalize(200),
                fontSize: sizes.title,
                fontFamily: Fonts.SFPRO_ROUNDED_Bold,
                color: coinInfo?.color !== null ? coinInfo?.color : color.WHITE,
                lineHeight: normalize(20),
                letterSpacing: 1,
                marginTop: normalize(20),
              }}>
              {capitalizeFirstLetter(coinInfo?.name)}
            </Text>
            <Text
              style={{
                fontSize: sizes.body2,
                fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
                color:
                  coinInfo?.color !== null
                    ? hexToRGB(`${coinInfo?.color}`, 1)
                    : color.WHITE,
                lineHeight: normalize(16),
                letterSpacing: 0.5,
              }}>
              {capitalizeFirstLetter(coinInfo?.symbol)}
              {coinInfo?.rank !== 0 && (
                <Text
                  style={{
                    color: color.WHITE,
                  }}>{`  #${coinInfo?.rank} `}</Text>
              )}
            </Text>
          </View>
          {/**ChangePercent24Hr */}
          <View style={{ alignItems: 'flex-end' }}>
            {/**Price */}
            {coinInfo.price && (
              <Text
                style={{
                  fontSize: sizes.body,
                  fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
                  color:
                    coinInfo?.color !== null
                      ? hexToRGB(coinInfo?.color, 1)
                      : color.WHITE,
                  lineHeight: normalize(20),
                  letterSpacing: 0.5,
                }}>
                {`$ ${
                  Number(coinInfo.price).toFixed(2).length < 10
                    ? Number(coinInfo?.price).toFixed(
                        10 - Number(coinInfo.price).toFixed(2).length,
                      )
                    : Number(coinInfo.price).toFixed(5)
                }`}
              </Text>
            )}
            <View height={normalize(10)} />
            {coinInfo?.change && (
              <Text
                style={{
                  width: normalize(80),
                  height: normalize(30),
                  borderRadius: normalize(24),
                  backgroundColor: positiveNagative(coinInfo?.change)
                    ? color.chartGreen
                    : color.optimismRed06,
                  fontSize: sizes.body2,
                  fontFamily: Fonts.SFPRO_ROUNDED_Heavy,
                  color: positiveNagative(coinInfo?.change)
                    ? color.green
                    : color.brightRed,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  lineHeight: normalize(16),
                  letterSpacing: 0.5,
                }}>
                {positiveNagative(coinInfo?.change)
                  ? `+${Number(coinInfo?.change).toFixed(2)}%`
                  : `${Number(coinInfo?.change).toFixed(2)}%`}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopLeftRadius: normalize(24),
          borderTopRightRadius: normalize(24),
          backgroundColor: color.dark,
          flex: 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: sizes.CONTAINER_PADDING,
            paddingVertical: sizes.CONTAINER_PADDING,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={coinInfo?.color}
            />
          }>
          {coinInfo?.price !== null && (
            <Heading title={'Value statistics'} marginBottom={normalize(10)} />
          )}
          {coinInfo['24hVolume'] && (
            <TagValue
              tag={'24h volume'}
              value={Number(coinInfo['24hVolume']).toFixed(2)}
              valueColor={coinInfo?.color}
            />
          )}
          {coinInfo?.marketCap && (
            <TagValue
              tag={'Market cap'}
              value={Number(coinInfo?.marketCap).toFixed(2)}
              valueColor={coinInfo?.color}
            />
          )}
          {coinInfo?.fullyDilutedMarketCap && (
            <TagValue
              tag={'Fully diluted market cap'}
              value={Number(coinInfo?.fullyDilutedMarketCap).toFixed(2)}
              valueColor={coinInfo?.color}
            />
          )}
          {coinInfo?.allTimeHigh?.price !== 0 && (
            <TagValue
              tag={'All-time high(daily.avg).'}
              value={coinInfo?.allTimeHigh?.price}
              timestamp={moment(coinInfo?.allTimeHigh?.timestamp).format(`L`)}
              valueColor={coinInfo?.color}
            />
          )}
          {coinInfo?.supply?.total !== 0 &&
            coinInfo?.supply?.circulating !== 0 && (
              <View
                style={{
                  marginTop: normalize(10),
                  marginBottom: normalize(10),
                  justifyContent: 'center',
                }}>
                <Heading title={'Supply information'} />
                <View
                  style={{
                    marginTop: normalize(15),
                    marginBottom: normalize(20),
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width:
                        normalize(300) *
                        getFillValue(
                          coinInfo?.supply?.circulating,
                          coinInfo?.supply.total,
                        ),
                      height: normalize(5),
                      backgroundColor:
                        coinInfo.color !== null ? coinInfo?.color : color.WHITE,
                      borderRadius: normalize(12),
                      alignSelf: 'flex-start',
                      position: 'absolute',
                    }}
                  />
                  <View
                    style={{
                      width: normalize(300),
                      height: normalize(5),
                      backgroundColor:
                        coinInfo.color !== null
                          ? hexToRGB(coinInfo?.color)
                          : color.WHITE,
                      borderRadius: normalize(12),
                      alignSelf: 'flex-start',
                      position: 'absolute',
                    }}
                  />
                  {coinInfo?.supply?.confirmed && (
                    <Image
                      source={ic_verified}
                      style={{
                        position: 'absolute',
                        width: normalize(20),
                        height: normalize(20),
                        resizeMode: 'contain',
                        right: normalize(10),
                        tintColor:
                          coinInfo?.color !== null
                            ? coinInfo?.color
                            : color.paleBlue,
                      }}
                    />
                  )}
                </View>
                {coinInfo?.supply?.circulating && (
                  <TagValue
                    tag={'Circulating supply'}
                    value={coinInfo?.supply?.circulating}
                    valueColor={coinInfo?.color}
                  />
                )}
                {coinInfo?.supply?.circulating && (
                  <TagValue
                    tag={'Non-circulating supply'}
                    value={`-${
                      (coinInfo?.supply?.total !== null
                        ? coinInfo?.supply?.total
                        : coinInfo?.supply?.circulating) -
                      coinInfo?.supply?.circulating
                    }`}
                    valueColor={coinInfo?.color}
                  />
                )}
                {coinInfo?.supply?.total && (
                  <TagValue
                    tag={'Total supply'}
                    value={
                      coinInfo?.supply?.total !== null
                        ? coinInfo?.supply?.total
                        : coinInfo?.supply?.circulating
                    }
                    valueColor={coinInfo?.color}
                  />
                )}
              </View>
            )}
          {coinInfo?.description !== '' && (
            <Heading
              title={`What is ${coinInfo?.name} ?`}
              marginTop={normalize(10)}
              titleColor={coinInfo?.color}
            />
          )}
          {coinInfo?.description !== '' && (
            <WebDisplay
              html={`${coinInfo?.description}`}
              anchorColor={`${coinInfo?.color}`}
              titleColor={`${coinInfo?.color}`}
              paragraphColor={`${color.WHITE}`}
            />
          )}
          <View height={normalize(30)} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



function Heading({
  title,
  titleColor = color.paleBlue,
  fontSize = sizes.body,
  fontFamily = Fonts.SFPRO_ROUNDED_Bold,
  marginBottom = 0,
  marginTop = 0,
}) {
  return (
    <Text
      style={{
        color: titleColor,
        fontFamily: fontFamily,
        fontSize: fontSize,
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}>
      {title}
    </Text>
  );
}

function getFillValue(circulating, total) {
  return (circulating / (total == null ? circulating : total)).toFixed(3);
}

function WebDisplay({
  html,
  anchorColor,
  titleColor = color.WHITE,
  paragraphColor = color.WHITE,
}) {
  const { width: contentWidth } = useWindowDimensions();
  const tagsStyles = React.useMemo(
    () => ({
      a: {
        color: anchorColor,
        textDecorationLine: 'none',
      },
      p: {
        color: paragraphColor,
        fontWeight: '500',
      },
      h3: {
        color: titleColor,
      },
    }),
    [anchorColor, titleColor, paragraphColor],
  );
  return (
    <RenderHtml
      contentWidth={contentWidth}
      source={{ html }}
      tagsStyles={tagsStyles}
    />
  );
}

const mapStateToProps = state => ({
  coinsData: state.getCoinInfo.coinsData,
});

const mapDispatchToProps = {
  getCoinInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinInfoScreen);
