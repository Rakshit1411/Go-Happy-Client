import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  Platform,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOut,
  FadeOutRight,
} from "react-native-reanimated";
import { formatDate } from "./Rewards";
import { hp, wp } from "../helpers/common";
import { Colors } from "../assets/colors/color";
import Clipboard from "@react-native-clipboard/clipboard";
import { TouchableOpacity } from "react-native";

const VoucherDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    id,
    image,
    title,
    color,
    value,
    percent,
    expiryDate,
    description,
    code,
  } = route.params;

  const conditions_and_redemptions = [
    ...description.redemption,
    ...description.tnc,
  ];

  const copyToClipboard = () => {
    Clipboard.setString(code);
    if (Platform.OS == "android") {
      ToastAndroid.show("Voucher code copied", ToastAndroid.LONG);
    }
  };

  return (
    <>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: "#f7f7f7",
          },
        ]}
      />
      <View style={styles.container}>
        <Animated.View
          sharedTransitionTag={`sharedBg${id}`}
          style={styles.card}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: wp(4),
              marginTop: hp(3),
              paddingHorizontal: wp(2),
              width: "60%",
            }}
          >
            <View style={styles.logoContainer}>
              <Animated.Image
                sharedTransitionTag={id}
                source={{
                  uri:
                    image ||
                    "https://upload.wikimedia.org/wikipedia/en/4/45/Starbucks_Corporation_Logo_2011.svg",
                }}
                style={styles.logo}
              />
            </View>
            <View>
              <Animated.Text
                sharedTransitionTag={`sharedText${id}`}
                style={styles.title}
              >
                {title}
              </Animated.Text>

              <Animated.Text
                sharedTransitionTag={`sharedValue${id}`}
                style={styles.offer}
              >
                {value != null ? `₹${value}` : `${percent}% OFF`}
              </Animated.Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Animated.Text
              entering={FadeInLeft.delay(400).springify()}
              exiting={FadeOutRight}
              style={styles.description}
            >
              {description.description}
            </Animated.Text>
            <Animated.View
              entering={FadeInLeft.delay(600).springify()}
              exiting={FadeOutRight}
              style={styles.conditions}
            >
              {conditions_and_redemptions.map((item, i) => (
                <Animated.Text
                  entering={FadeInLeft.delay(600 + i * 50)}
                  style={styles.conditionItem}
                >
                  • {item}
                </Animated.Text>
              ))}
            </Animated.View>
          </View>
          <Animated.View
            entering={FadeInDown.delay(500)}
            exiting={FadeOut}
            onPress={copyToClipboard}
            style={styles.clip}
          >
            <Text style={styles.link}>{code}</Text>
          </Animated.View>
          <View style={styles.footer}>
            <Animated.Text
              sharedTransitionTag={`sharedExpiryDate${id}`}
              style={styles.footerText}
            >
              Valid until {formatDate(expiryDate)}
            </Animated.Text>
          </View>
          <View style={styles.cutoutLeft} />
          <View style={styles.cutoutRight} />
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  card: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    // alignItems:"center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: wp(4.5),
    color: "#000",
    fontFamily: "NunitoSans-SemiBold",
    textTransform: "capitalize",
  },
  offer: {
    fontSize: wp(8),
    fontWeight: "bold",
    color: "#000",
    fontFamily: "NunitoSans-SemiBold",
  },
  largeText: {
    fontSize: 24,
    color: "#00704a",
  },
  description: {
    fontSize: wp(4),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  conditions: {
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: wp(4),
  },
  conditionItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontWeight: "500",
  },
  barcodeContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  barcode: {
    width: "80%",
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  barcodeNumber: {
    marginTop: 10,
    fontSize: 12,
    color: "#333",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
  cutoutLeft: {
    position: "absolute",
    left: -15,
    top: "70%",
    width: 30,
    height: 30,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    transform: [{ translateY: -15 }],
  },
  cutoutRight: {
    position: "absolute",
    right: -15,
    top: "70%",
    width: 30,
    height: 30,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    transform: [{ translateY: -15 }],
  },
  clip: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(15),
  },
  link: {
    fontSize: wp(5),
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#333",
  },
  copyButton: {
    marginTop: 40,
    padding: 5,
    // borderRadius: 10,
  },
});

export default VoucherDetails;