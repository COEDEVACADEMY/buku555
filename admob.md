Getting Started
The AdMob module allows you to display adverts to your users. All adverts are served over the Google AdMob network, meaning a Google AdMob account is required.


The module supports six types of Ads:

Full screen App Open Ads.
Component based Banner Ads.
Component based Native Ads.
Full screen Interstitial Ads.
Full screen Rewarded Ads.
Full screen Rewarded Interstitial Ads.
Installation
React Native
Expo

# Install the admob module
npm install react-native-google-mobile-ads
On Android, before releasing your app, you must select "Yes, my app contains ads" in the Google Play Console under "Policy and programmes" > "App content" > "Manage".

Optionally configure iOS static frameworks
Follow these steps on iOS if you need to use static frameworks (that is, use_frameworks! :linkage => :static in your Podfile). You may need this if you use this module in combination with react-native-firebase v15 and higher since it requires use_frameworks!.

React Native
Expo
To enable static frameworks, you must add the variable $RNGoogleMobileAdsAsStaticFramework = true to the targets in your Podfile.

Setting up Google AdMob
Before you are able to display ads to your users, you must have a Google AdMob account. Under the "Apps" menu item, create or choose an existing Android/iOS app. Each app platform exposes a unique account ID which needs to be added to the project.

Attempting to build your app without configuring a valid App ID for this package will cause the app to crash on start or fail to build.

Under the "App settings" menu item, you can find the "App ID":

Google AdMob App ID
The app IDs for Android and iOS need to be inserted into your app's native code. For bare React Native projects, you can add the app IDs to the app.json file. For Expo projects, we provide an Expo config plugin.

React Native
Expo

// <project-root>/app.json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx"
  }
}
For the changes to take effect, rebuild your project:


# For iOS
npx pod-install
npx react-native run-ios

# For Android
npx react-native run-android
Configure outbound requests
If the default ad settings are not correct for your app, you can provide settings that will apply to all ad requests.

For example, if the application targets children then you must configure the outbound requests to only receive content suitable for children before loading any adverts.

If you need to set a custom request configuration, you must call the setRequestConfiguration method before initializing the Google Mobile Ads SDK:


import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  });
To learn more about the request configuration settings, view the RequestConfiguration source code.

Initialize the Google Mobile Ads SDK
Before loading ads, have your app initialize the Google Mobile Ads SDK by calling initialize which initializes the SDK and returns a promise once initialization is complete (or after a 30-second timeout). This needs to be done only once, ideally at app launch.

Ads may be preloaded by the Mobile Ads SDK or mediation partner SDKs upon calling initialize. If you need to obtain consent from users in the European Economic Area (EEA), set any request-specific flags (such as tagForChildDirectedTreatment), or otherwise take action before loading ads, ensure you do so before initializing the Mobile Ads SDK.


import mobileAds from 'react-native-google-mobile-ads';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });
If you are using mediation, you may wish to wait until the promise is settled before loading ads, as this will ensure that all mediation adapters are initialized.

Enable SKAdNetwork to track conversions (iOS)
The Google Mobile Ads SDK supports conversion tracking using Apple's SKAdNetwork, which lets Google and participating third-party buyers attribute an app install even when the IDFA is not available. Add the advised SKAdNetwork identifiers to your project as described below. Note that these identifiers are subject to change and should be updated regularly.

React Native
Expo

// <project-root>/app.json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "sk_ad_network_items": [
      "cstr6suwn9.skadnetwork",
      "4fzdc2evr5.skadnetwork",
      "2fnua5tdw4.skadnetwork",
      "ydx93a7ass.skadnetwork",
      "p78axxw29g.skadnetwork",
      "v72qych5uu.skadnetwork",
      "ludvb6z3bs.skadnetwork",
      "cp8zw746q7.skadnetwork",
      "3sh42y64q3.skadnetwork",
      "c6k4g5qg8m.skadnetwork",
      "s39g8k73mm.skadnetwork",
      "3qy4746246.skadnetwork",
      "f38h382jlk.skadnetwork",
      "hs6bdukanm.skadnetwork",
      "mlmmfzh3r3.skadnetwork",
      "v4nxqhlyqp.skadnetwork",
      "wzmmz9fp6w.skadnetwork",
      "su67r6k2v3.skadnetwork",
      "yclnxrl5pm.skadnetwork",
      "t38b2kh725.skadnetwork",
      "7ug5zh24hu.skadnetwork",
      "gta9lk7p23.skadnetwork",
      "vutu7akeur.skadnetwork",
      "y5ghdn5j9k.skadnetwork",
      "v9wttpbfk9.skadnetwork",
      "n38lu8286q.skadnetwork",
      "47vhws6wlr.skadnetwork",
      "kbd757ywx3.skadnetwork",
      "9t245vhmpl.skadnetwork",
      "a2p9lx4jpn.skadnetwork",
      "22mmun2rn5.skadnetwork",
      "44jx6755aq.skadnetwork",
      "k674qkevps.skadnetwork",
      "4468km3ulz.skadnetwork",
      "2u9pt9hc89.skadnetwork",
      "8s468mfl3y.skadnetwork",
      "klf5c3l5u5.skadnetwork",
      "ppxm28t8ap.skadnetwork",
      "kbmxgpxpgc.skadnetwork",
      "uw77j35x4d.skadnetwork",
      "578prtvx9j.skadnetwork",
      "4dzt52r2t5.skadnetwork",
      "tl55sbb4fm.skadnetwork",
      "c3frkrj4fj.skadnetwork",
      "e5fvkxwrpn.skadnetwork",
      "8c4e2ghe7u.skadnetwork",
      "3rd42ekr43.skadnetwork",
      "97r2b46745.skadnetwork",
      "3qcr597p9d.skadnetwork"
    ]
  }
}
App Tracking Transparency (iOS)
Apple requires apps to display the App Tracking Transparency authorization request for accessing the IDFA (leaving the choice to the user, whether to use personalized or non-personalized ads). Within your projects configuration file, you have to provide a user tracking usage description:

React Native
Expo

// <project-root>/app.json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "user_tracking_usage_description": "This identifier will be used to deliver personalized ads to you."
  }
}
Requesting App Tracking Transparency authorization
To request the App Tracking Transparency authorization we recommend using a library or making it part of the UMP consent flow European User Consent page.

React Native
Expo

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
if (result === RESULTS.DENIED) {
  // The permission has not been requested, so request it.
  await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
}

const adapterStatuses = await mobileAds().initialize();

// Now ads can be loaded.
European User Consent
Out of the box, AdMob does not handle any related regulations which you may need to enforce on your application. It is up to the developer to implement and handle this on a user-by-user basis. You must consent to EEA users being served both personalized and non-personalized adverts before showing them. For more information, see Obtaining Consent with the User Messaging Platform.

The AdMob module provides a AdsConsent helper to help developers quickly implement consent flows within their application. See the European User Consent page for full examples of how to integrate the helper into your application.

Test ads
Whilst developing your app with AdMob, you'll want to make sure you use test ads rather than production ads from your Google AdMob account - otherwise your account may be disabled!

Although usage of different advert types is explained later, when creating your adverts the "Ad Unit ID" being used whilst testing can be set to a testing ID. The code snippet below shows how to initialize each advert type with a test ID:


import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';

# App Open
AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

# Interstitial
InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

# Rewarded
RewardedAd.createForAdRequest(TestIds.REWARDED);

# Banners
<BannerAd unitId={TestIds.BANNER} />
Next Steps
Getting Started
The AdMob module allows you to display adverts to your users. All adverts are served over the Google AdMob network, meaning a Google AdMob account is required.


The module supports six types of Ads:

Full screen App Open Ads.
Component based Banner Ads.
Component based Native Ads.
Full screen Interstitial Ads.
Full screen Rewarded Ads.
Full screen Rewarded Interstitial Ads.
Installation
React Native
Expo

# Install the admob module
npm install react-native-google-mobile-ads
On Android, before releasing your app, you must select "Yes, my app contains ads" in the Google Play Console under "Policy and programmes" > "App content" > "Manage".

Optionally configure iOS static frameworks
Follow these steps on iOS if you need to use static frameworks (that is, use_frameworks! :linkage => :static in your Podfile). You may need this if you use this module in combination with react-native-firebase v15 and higher since it requires use_frameworks!.

React Native
Expo
To enable static frameworks, you must add the variable $RNGoogleMobileAdsAsStaticFramework = true to the targets in your Podfile.

Setting up Google AdMob
Before you are able to display ads to your users, you must have a Google AdMob account. Under the "Apps" menu item, create or choose an existing Android/iOS app. Each app platform exposes a unique account ID which needs to be added to the project.

Attempting to build your app without configuring a valid App ID for this package will cause the app to crash on start or fail to build.

Under the "App settings" menu item, you can find the "App ID":

Google AdMob App ID
The app IDs for Android and iOS need to be inserted into your app's native code. For bare React Native projects, you can add the app IDs to the app.json file. For Expo projects, we provide an Expo config plugin.

React Native
Expo

// <project-root>/app.json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx"
  }
}
For the changes to take effect, rebuild your project:


# For iOS
npx pod-install
npx react-native run-ios

# For Android
npx react-native run-android
Configure outbound requests
If the default ad settings are not correct for your app, you can provide settings that will apply to all ad requests.

For example, if the application targets children then you must configure the outbound requests to only receive content suitable for children before loading any adverts.

If you need to set a custom request configuration, you must call the setRequestConfiguration method before initializing the Google Mobile Ads SDK:


import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  });
To learn more about the request configuration settings, view the RequestConfiguration source code.

Initialize the Google Mobile Ads SDK
Before loading ads, have your app initialize the Google Mobile Ads SDK by calling initialize which initializes the SDK and returns a promise once initialization is complete (or after a 30-second timeout). This needs to be done only once, ideally at app launch.

Ads may be preloaded by the Mobile Ads SDK or mediation partner SDKs upon calling initialize. If you need to obtain consent from users in the European Economic Area (EEA), set any request-specific flags (such as tagForChildDirectedTreatment), or otherwise take action before loading ads, ensure you do so before initializing the Mobile Ads SDK.


import mobileAds from 'react-native-google-mobile-ads';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });
If you are using mediation, you may wish to wait until the promise is settled before loading ads, as this will ensure that all mediation adapters are initialized.

Enable SKAdNetwork to track conversions (iOS)
The Google Mobile Ads SDK supports conversion tracking using Apple's SKAdNetwork, which lets Google and participating third-party buyers attribute an app install even when the IDFA is not available. Add the advised SKAdNetwork identifiers to your project as described below. Note that these identifiers are subject to change and should be updated regularly.

React Native
Expo

// <project-root>/app.json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "sk_ad_network_items": [
      "cstr6suwn9.skadnetwork",
      "4fzdc2evr5.skadnetwork",
      "2fnua5tdw4.skadnetwork",
      "ydx93a7ass.skadnetwork",
      "p78axxw29g.skadnetwork",
      "v72qych5uu.skadnetwork",
      "ludvb6z3bs.skadnetwork",
      "cp8zw746q7.skadnetwork",
      "3sh42y64q3.skadnetwork",
      "c6k4g5qg8m.skadnetwork",
      "s39g8k73mm.skadnetwork",
      "3qy4746246.skadnetwork",
      "f38h382jlk.skadnetwork",
      "hs6bdukanm.skadnetwork",
      "mlmmfzh3r3.skadnetwork",
      "v4nxqhlyqp.skadnetwork",
      "wzmmz9fp6w.skadnetwork",
      "su67r6k2v3.skadnetwork",
      "yclnxrl5pm.skadnetwork",
      "t38b2kh725.skadnetwork",
      "7ug5zh24hu.skadnetwork",
      "gta9lk7p23.skadnetwork",
      "vutu7akeur.skadnetwork",
      "y5ghdn5j9k.skadnetwork",
      "v9wttpbfk9.skadnetwork",
      "n38lu8286q.skadnetwork",
      "47vhws6wlr.skadnetwork",
      "kbd757ywx3.skadnetwork",
      "9t245vhmpl.skadnetwork",
      "a2p9lx4jpn.skadnetwork",
      "22mmun2rn5.skadnetwork",
      "44jx6755aq.skadnetwork",
      "k674qkevps.skadnetwork",
      "4468km3ulz.skadnetwork",
      "2u9pt9hc89.skadnetwork",
      "8s468mfl3y.skadnetwork",
      "klf5c3l5u5.skadnetwork",
      "ppxm28t8ap.skadnetwork",
      "kbmxgpxpgc.skadnetwork",
      "uw77j35x4d.skadnetwork",
      "578prtvx9j.skadnetwork",
      "4dzt52r2t5.skadnetwork",
      "tl55sbb4fm.skadnetwork",
      "c3frkrj4fj.skadnetwork",
      "e5fvkxwrpn.skadnetwork",
      "8c4e2ghe7u.skadnetwork",
      "3rd42ekr43.skadnetwork",
      "97r2b46745.skadnetwork",
      "3qcr597p9d.skadnetwork"
    ]
  }
}
App Tracking Transparency (iOS)
Apple requires apps to display the App Tracking Transparency authorization request for accessing the IDFA (leaving the choice to the user, whether to use personalized or non-personalized ads). Within your projects configuration file, you have to provide a user tracking usage description:

React Native
Expo

// <project-root>/app.json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "user_tracking_usage_description": "This identifier will be used to deliver personalized ads to you."
  }
}
Requesting App Tracking Transparency authorization
To request the App Tracking Transparency authorization we recommend using a library or making it part of the UMP consent flow European User Consent page.

React Native
Expo

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
if (result === RESULTS.DENIED) {
  // The permission has not been requested, so request it.
  await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
}

const adapterStatuses = await mobileAds().initialize();

// Now ads can be loaded.
European User Consent
Out of the box, AdMob does not handle any related regulations which you may need to enforce on your application. It is up to the developer to implement and handle this on a user-by-user basis. You must consent to EEA users being served both personalized and non-personalized adverts before showing them. For more information, see Obtaining Consent with the User Messaging Platform.

The AdMob module provides a AdsConsent helper to help developers quickly implement consent flows within their application. See the European User Consent page for full examples of how to integrate the helper into your application.

Test ads
Whilst developing your app with AdMob, you'll want to make sure you use test ads rather than production ads from your Google AdMob account - otherwise your account may be disabled!

Although usage of different advert types is explained later, when creating your adverts the "Ad Unit ID" being used whilst testing can be set to a testing ID. The code snippet below shows how to initialize each advert type with a test ID:


import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';

# App Open
AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

# Interstitial
InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

# Rewarded
RewardedAd.createForAdRequest(TestIds.REWARDED);

# Banners
<BannerAd unitId={TestIds.BANNER} />
Next Steps
