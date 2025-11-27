import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7556071990692700/7707767494';

const GoogleBannerAd = () => {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.LARGE_BANNER}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
  );
};

export default GoogleBannerAd;
