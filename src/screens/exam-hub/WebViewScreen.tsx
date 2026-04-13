import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Block, SvgIcon } from '@components';
import { palette } from '@theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './JambStyles';
import { RS } from '@helpers';

type RootStackParamList = {
  WebViewScreen: { url: string };
};

type RouteType = RouteProp<RootStackParamList, 'WebViewScreen'>;

const WebViewScreen = () => {
  const route = useRoute<RouteType>();
  const { url } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true); // track loading state

  return (
    <Block flex={1} style={{ backgroundColor: palette.white }}>
      {/* Header */}
      <Block
        row
        align="center"
        justify="center"
        paddingHorizontal={RS(20)}
        paddingVertical={RS(16)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
      </Block>

      {/* WebView container */}
      <Block flex={1}>
        <WebView
          source={{ uri: url }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          style={{ flex: 1 }}
        />

        {/* Centered Spinner */}
        {loading && (
          <Block
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justify="center"
            align="center"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} // optional overlay
          >
            <ActivityIndicator size="large" color={palette.blue} />
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default WebViewScreen;