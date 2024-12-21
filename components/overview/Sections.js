import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Linking } from "react-native";
import { useCopilot, walkthroughable, CopilotStep } from "react-native-copilot";
import FastImage from "react-native-fast-image";
import { Colors } from "../../assets/colors/color";

const Walkthroughable = walkthroughable(View);

export default function Sections(props) {
  const { width: windowWidth } = useWindowDimensions();
  const { start, copilotEvents } = useCopilot();

  const minItemWidth = 85;
  const spacing = 12;
  const horizontalPadding = 12;
  
  const numColumns = Math.floor(
    (windowWidth - horizontalPadding * 2 + spacing) / (minItemWidth + spacing)
  );
  
  const itemWidth = (windowWidth - horizontalPadding * 2 - spacing * (numColumns - 1)) / numColumns;

  const data1 = [
    {
      title: "Free Sessions",
      imgUrl: require("../../images/sessions.png"),
      link: "HomeScreen",
      text: "Click here to explore and book free sessions tailored just for you!",
    },
    {
      title: "Contribute",
      imgUrl: require("../../images/contribute.png"),
      link: "MembershipScreen",
      text: "Help us make a difference! Click here to learn how you can contribute.",
    },
    {
      title: "Trips",
      imgUrl: require("../../images/trips.png"),
      link: "Trips",
      text: "Discover exciting trips and adventures! Click here to see our upcoming trips.",
    },
    {
      title: "Get Help",
      imgUrl: require("../../images/help.png"),
      link: "props.helpUrl",
      type: "external",
      text: "Need assistance? Click here to get help and find the support you need.",
    },
    {
      title: "Rewards",
      imgUrl: require("../../images/rewards.png"),
      link: "Rewards",
      text: "See your earned rewards here.",
    },
    {
      title: "Quotes",
      imgUrl: require("../../images/quotes.png"),
      link: "QuotesPage",
      text: "Get Daily Positive Quotes here.",
    },
    {
      title: "Reels",
      imgUrl: require("../../images/reels.png"),
      link: "ReelsPage",
      text: "See videos especially tailored for you.",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <View style={styles.line} />
        <Text style={styles.headingText}>Explore</Text>
        <View style={styles.line} />
      </View>

      <View style={[styles.gridContainer, { padding: horizontalPadding }]}>
        {data1.map((item, index) => (
          <CopilotStep
            key={index}
            text={item.text}
            order={index + 1}
            name={`step_${index + 1}`}
          >
            <Walkthroughable>
              <TouchableOpacity
                onPress={() => {
                  if (item.type === "external") {
                    Linking.openURL(props.helpUrl);
                  } else {
                    props.navigation.navigate(item.link);
                  }
                }}
                style={[
                  styles.gridItem,
                  {
                    width: itemWidth,
                    marginRight: (index + 1) % numColumns ? spacing : 0,
                    marginBottom: spacing,
                  },
                ]}
              >
                <FastImage
                  source={item.imgUrl}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.text} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Walkthroughable>
          </CopilotStep>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headingText: {
    color: Colors.primaryText,
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey.grey,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '60%',
    height: '60%',
    marginBottom: 8,
  },
  text: {
    color: Colors.primaryText,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
});

