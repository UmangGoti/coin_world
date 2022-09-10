import React, { useCallback, useEffect, useState } from 'react';
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
  ic_stats,
} from '../../Assets';
import { MainHeader } from '../../Components';
import {
  capitalizeFirstLetter,
  changeImageUrlExtension,
  commarize,
  openLink,
  positiveNagative,
} from '../../Helper/Utils';
import { navigate } from '../../Navigators/NavigationUtils';
import { getAssets } from '../../Store/GetAssets';
import { color, Fonts, hexToRGB, normalize, sizes } from '../../Theme/theme';

const HomeScreen = ({ getAssets }) => {
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
    getAssets(true, {
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
    console.log();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader title="Coin World" />
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
      </View>
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
            return <AssetCard item={item} key={index} />;
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const AssetCard = ({ item, key }) => {
  const [isImageUnknown, setImageIsUnknown] = useState(false);
  return (
    <Pressable
      onPress={() => {
        navigate('CoinInfoScreen', {
          coinuuid: item.uuid,
        });
      }}
      key={key}
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
        {/**ChangePercent24Hr */}
        <Text
          style={{
            width: normalize(80),
            height: normalize(30),
            borderRadius: normalize(24),
            backgroundColor: positiveNagative(item.change)
              ? color.chartGreen
              : color.optimismRed06,
            fontSize: sizes.body2,
            fontFamily: Fonts.SFPRO_ROUNDED_Heavy,
            color: positiveNagative(item.change)
              ? color.green
              : color.brightRed,
            letterSpacing: 0.5,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {positiveNagative(item.change)
            ? `+${Number(item.change).toFixed(2)}%`
            : `${Number(item.change).toFixed(2)}%`}
        </Text>
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
            openLink(item?.coinrankingUrl);
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
                  event.nativeEvent.error === 'unknown image format',
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
              uri={item?.iconUrl}
            />
          )}
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
  tintColor = color.paleBlue,
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
});

const mapDispatchToProps = {
  getAssets,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
