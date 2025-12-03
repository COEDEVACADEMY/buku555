module.exports = {
  "expo": {
    "name": "Buku 555",
    "slug": "buku-555",
    "version": "1.0.1",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "buku555",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.coedevtech.buku555"
    },
    "android": {
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.coedevtech.buku555",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png",
        "backgroundColor": "#F5DEB3"
      }
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/logo.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/logo.png",
          "resizeMode": "contain",
          "backgroundColor": "#F5DEB3",
          "dark": {
            "backgroundColor": "#A0522D"
          }
        }
      ],
      [
        "react-native-google-mobile-ads",
        {
          "android_app_id": "ca-app-pub-7556071990692700~5301219719",
          "ios_app_id": "ca-app-pub-7556071990692700~3419956649"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "2b28d819-6af5-4df9-8d89-3400dca9e046"
      }
    }
  }
}