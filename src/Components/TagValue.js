import React from 'react';
import { Text, View } from 'react-native';
import { commarize } from '../Helper/Utils';
import { color, Fonts, normalize, sizes } from '../Theme/theme';

const TagValue = ({
  tag,
  tagColor = color.paleBlue,
  value,
  timestamp,
  valueColor,
  defaultValueColor = color.WHITE,
}) => {
  return (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      {/**Price */}
      <Text
        style={{
          width: normalize(200),
          fontSize: sizes.caption,
          fontFamily: Fonts.SFMONO_Regular,
          color: tagColor,
          lineHeight: normalize(20),
        }}
        numberOfLines={1}>
        {tag}
      </Text>
      <Text
        style={{
          fontSize: sizes.caption,
          fontFamily: Fonts.SFMONO_Medium,
          color: valueColor !== null ? valueColor : defaultValueColor,
          lineHeight: normalize(20),
          letterSpacing: 0.5,
          textAlign: 'right',
        }}>
        {`$ ${commarize(Number(value))}\n`}
        {timestamp && (
          <Text style={{ fontSize: sizes.small }}>{timestamp}</Text>
        )}
      </Text>
    </View>
  );
};

export default TagValue;
