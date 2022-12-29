import React from "react";
import { BannerAd, BannerAdSize, TestIds, } from "react-native-google-mobile-ads";

let homeScreen = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/6451872133"
let app_distribution = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/5577077031"
let authentication = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/9025367450"
let cloud_firestore = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/7081730394"
let cloud_messaging = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/6046730761"
let dynamic_links = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/9696780285"
let get_started = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/3334057079"
let in_app_messaging = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/2101415196"
let security_rules = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/4894550759"
let storage = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/8833795764"
let test_lab = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/3581469081"
let guideScreens = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/3062556342"
let library_credits = __DEV__ ? TestIds.BANNER : "ca-app-pub-4551497516413603/1502062664"

export const adIdInterstitial = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4551497516413603/6103461730'

export const BannerAppDistribution = () => <BannerAd size={BannerAdSize.BANNER} unitId={app_distribution} />

export const BannerAuthentication = () => <BannerAd size={BannerAdSize.BANNER} unitId={authentication} />

export const BannerDynamicLinks = () => <BannerAd size={BannerAdSize.BANNER} unitId={dynamic_links} />

export const BannerCloudFirestore = () => <BannerAd size={BannerAdSize.BANNER} unitId={cloud_firestore} />

export const BannerGuideScreens = () => <BannerAd size={BannerAdSize.BANNER} unitId={guideScreens} />

export const BannerGetStarted = () => <BannerAd size={BannerAdSize.BANNER} unitId={get_started} />

export const BannerCloudMessaging = () => <BannerAd size={BannerAdSize.BANNER} unitId={cloud_messaging} />

export const BannerInAppMessaging = () => <BannerAd size={BannerAdSize.BANNER} unitId={in_app_messaging} />

export const BannerSecurityRules = () => <BannerAd size={BannerAdSize.BANNER} unitId={security_rules} />

export const BannerStorage = () => <BannerAd size={BannerAdSize.BANNER} unitId={storage} />

export const BannerTestLab = () => <BannerAd size={BannerAdSize.BANNER} unitId={test_lab} />

export const BannerLibrary_credits = () => <BannerAd size={BannerAdSize.BANNER} unitId={library_credits} />

export const BannerHomeScreen = () => <BannerAd size={BannerAdSize.BANNER} unitId={homeScreen} />
// -------------------------

// export const Interstitial = () => {
//     const { isLoaded, isClosed, load, show } = useRewardedAd(adIdInterstitial, {
//         requestNonPersonalizedAdsOnly: true,
//         // keywords: ['fashion', 'clothing'],
//     });

//     useEffect(() => {
//         load()
//     }, [load]);

//     useEffect(() => {
//         if (isClosed) {
//             // Action after the ad is closed
//             // alert('closed')
//         }
//     }, [isClosed]);

//     return (
//         <Button
//             title="Go to the Welcome screen"
//             onPress={() => {
//                 if (isLoaded) {
//                     show();
//                 } else {
//                     // No advert ready to show yet
//                     navigation.navigate('welcomeDrawer')
//                 }
//             }}
//         />
//     )
// }