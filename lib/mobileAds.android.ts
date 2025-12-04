import mobileAds from 'react-native-google-mobile-ads';

export const initializeMobileAds = () => {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      // Initialization complete!
    });
};
