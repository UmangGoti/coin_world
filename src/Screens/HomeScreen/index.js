import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';
import { connect } from 'react-redux';
import {
  ic_building,
  ic_coin,
  ic_crypto_market,
  ic_drop,
  ic_rounded_arrow_right,
  ic_stats,
} from '../../Assets';
import { MainHeader } from '../../Components';
import {
  capitalizeFirstLetter,
  changeImageUrlExtension,
  commarize,
} from '../../Helper/Utils';
import { navigate } from '../../Navigators/NavigationUtils';
import { getAssets } from '../../Store/GetAssets';
import { color, Fonts, hexToRGB, normalize, sizes } from '../../Theme/theme';

const HomeScreen = ({ getAssets, address, uri }) => {
  const [assetsList, setAssets] = useState([]);
  const [data, setData] = useState({
    stats: {
      total: 0,
      totalCoins: 0,
      totalMarkets: 0,
      totalExchanges: 0,
      totalMarketCap: 0,
      total24hVolume: 0,
    },
    coins: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    apiToGetAssets();
  }, []);

  //-- API Call
  const apiToGetAssets = () => {
    getAssets(!refreshing, {
      SuccessCallback: res => {
        setAssets(res?.data?.coins);
        setData(res?.data);
        setRefreshing(false);
      },
      FailureCallback: res => {
        setRefreshing(false);
      },
    });
  };
  //--End

  useEffect(() => {
    apiToGetAssets();
  }, []);

  // hooks
  const sheetRef = useRef < BottomSheet > null;

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader
        title="Coin World"
        sourceLeft={{ uri }}
        leftWidth={normalize(30)}
        leftHeight={normalize(30)}
        leftBorderWidth={2}
        leftBorderRadius={normalize(50)}
        leftBorderColor={color.paleBlue}
        onPressLeft={() => {
          handleSnapPress(2);
        }}
      />
      {(data?.stats?.totalMarketCap !== 0 ||
        data?.stats?.total24hVolume !== 0 ||
        data?.stats?.totalCoins !== 0 ||
        data?.stats?.totalExchanges !== 0 ||
        data?.stats?.totalMarkets !== 0) && (
        <View
          style={{
            paddingHorizontal: sizes.CONTAINER_PADDING,
            paddingVertical: sizes.CONTAINER_PADDING,
          }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{}}>
            <HeaderCard
              imageSource={ic_stats}
              value={`$ ${commarize(data?.stats?.totalMarketCap)}`}
              title={'Crypto market cap'}
            />
            <HeaderCard
              imageSource={ic_drop}
              value={`$ ${commarize(data?.stats?.total24hVolume)}`}
              title={'24h volume'}
            />
            <HeaderCard
              imageSource={ic_coin}
              value={data?.stats?.totalCoins}
              title={'All coins'}
            />
            <HeaderCard
              imageSource={ic_building}
              value={data?.stats?.totalExchanges}
              title={'All crypto exchanges'}
            />
            <HeaderCard
              imageSource={ic_crypto_market}
              value={data?.stats?.totalMarkets}
              title={'All crypto markets'}
            />
          </ScrollView>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}>
            <BottomSheetView>
              <Text>Awesome 🔥</Text>
            </BottomSheetView>
          </BottomSheet>
        </View>
      )}
      <View
        style={{
          borderTopLeftRadius:
            data?.stats?.totalCoins !== 0 ? normalize(24) : 0,
          borderTopRightRadius:
            data?.stats?.totalCoins !== 0 ? normalize(24) : 0,
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
          refreshControl={
            <RefreshControl
              progressBackgroundColor={color.WHITE}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const AssetCard = ({ item }) => {
  const [isImageUnknown, setImageIsUnknown] = useState(false);
  return (
    <Pressable
      onPress={() => {
        navigate('CoinInfoScreen', {
          coinuuid: item.uuid,
        });
      }}
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
        {/**Coin Image */}
        <Pressable
          onPress={() => {
            navigate('CoinInfoScreen', {
              coinuuid: item.uuid,
            });
          }}
          style={{
            width: normalize(45),
            height: normalize(45),
            backgroundColor:
              item.color !== null ? hexToRGB(`${item.color}`) : color.lightGrey,
            borderRadius: normalize(12),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!isImageUnknown && (
            <Image
              onError={event => {
                setImageIsUnknown(
                  event.nativeEvent.error === 'unknown image format' ||
                    event.nativeEvent.error ===
                      `Unexpected HTTP code Response{protocol=h2, code=500, message=, url=${item?.iconUrl}}`,
                );
                console.log(event.nativeEvent.error);
              }}
              resizeMode="contain"
              style={{
                width: normalize(30),
                height: normalize(30),
              }}
              source={{
                uri: changeImageUrlExtension(item.iconUrl),
              }}
            />
          )}
          {isImageUnknown && (
            <SvgUri
              width={`${normalize(30)}`}
              height={`${normalize(30)}`}
              uri={changeImageUrlExtension(item.iconUrl, '.svg')}
            />
          )}
        </Pressable>
        <Pressable
          style={{
            width: normalize(40),
            height: normalize(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigate('CoinInfoScreen', {
              coinuuid: item.uuid,
            });
          }}>
          <Image
            source={ic_rounded_arrow_right}
            style={{
              width: normalize(20),
              height: normalize(20),
              tintColor: item.color !== null ? item.color : color.paleBlue,
            }}
            resizeMode={'contain'}
          />
        </Pressable>
      </View>
      <View style={{ height: normalize(10) }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/**Header*/}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                width: normalize(200),
                fontSize: sizes.title,
                fontFamily: Fonts.SFPRO_ROUNDED_Bold,
                color: item.color !== null ? item.color : color.MAIN_DARK,
                lineHeight: normalize(20),
                letterSpacing: 1,
              }}
              numberOfLines={1}>
              {capitalizeFirstLetter(item.name)}
            </Text>
            <Text
              style={{
                fontSize: sizes.body2,
                fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
                color:
                  item.color !== null
                    ? hexToRGB(`${item.color}`, 0.4)
                    : color.MAIN_DARK,
                lineHeight: normalize(16),
                letterSpacing: 0.5,
              }}>
              {capitalizeFirstLetter(item.symbol)}
            </Text>
          </View>
          {/**Price */}
          <Text
            style={{
              fontSize: sizes.body,
              fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
              color: item.color !== null ? item.color : color.MAIN_DARK,
              lineHeight: normalize(16),
              letterSpacing: 0.5,
              alignSelf: 'flex-end',
              textAlign: 'right',
            }}>
            {`$${Number(item.price).toFixed(2)}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const HeaderCard = ({
  imageSource,
  title,
  value,
  tintColor = color.WHITE,
  imageBackgroundColor = hexToRGB(color.paleBlue, 0.5),
  cardPadding = normalize(15),
  cardRadius = normalize(24),
  cardWH = normalize(165),
  cardBackgroundColor = color.dark,
  imageWidthHight = normalize(20),
  backgroundWH = normalize(40),
  titleColor = color.paleBlue,
  valueColor = color.paleBlue,
}) => {
  return (
    <View
      style={{
        width: cardWH,
        height: cardWH,
        backgroundColor: cardBackgroundColor,
        borderRadius: cardRadius,
        padding: cardPadding,
        marginRight: normalize(20),
      }}>
      <Pressable
        style={{
          width: backgroundWH,
          height: backgroundWH,
          borderRadius: normalize(12),
          backgroundColor: imageBackgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: imageWidthHight,
            height: imageWidthHight,
            tintColor: tintColor,
          }}
          source={imageSource}
          resizeMode="contain"
        />
      </Pressable>
      <View height={normalize(15)} />
      <Text
        style={{
          fontFamily: Fonts.SFPRO_ROUNDED_Bold,
          fontSize: sizes.body,
          color: titleColor,
          lineHeight: normalize(20),
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SFPRO_ROUNDED_Bold,
          fontSize: sizes.body2,
          color: valueColor,
        }}>
        {value}
      </Text>
    </View>
  );
};

const mapStateToProps = state => ({
  coinsData: state.getAssets.coinsData,
  address: state.setSigner.address,
  uri: state.setSigner.uri,
});

const mapDispatchToProps = {
  getAssets,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
