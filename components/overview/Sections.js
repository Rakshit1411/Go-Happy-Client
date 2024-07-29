import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Linking } from "react-native";
//import axios from "axios";
import { useCopilot, walkthroughable, CopilotStep } from "react-native-copilot";
const Walkthroughable = walkthroughable(View);

export default function Sections(props) {
  const [whatsappLink, setWhatsappLink] = useState("");
  const { start, copilotEvents } = useCopilot();
  const walktroughStarted = useRef(false);
  const data1 = [
    {
      title: "Free Sessions",
      imgUrl:
        "https://storage.googleapis.com/gohappy-main-bucket/Assets/session_section_pills.png",
      link: "HomeScreen",
    },
    {
      title: "Contribute",
      imgUrl:
        "https://storage.googleapis.com/gohappy-main-bucket/Assets/contribute_section_pill.jpeg",
      link: "MembershipScreen",
    },
    {
      title: "Trips",
      imgUrl:
        "https://storage.googleapis.com/gohappy-main-bucket/Assets/trips_section_pill.png",
      link: "Trips",
    },
    {
      title: "Get Help",
      imgUrl:
        "https://storage.googleapis.com/gohappy-main-bucket/Assets/help_sections_pill.png",
      link: props.helpUrl,
      type: "external",
    },
  ];

  const handleFinish = () => {
    props.navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    if (!walktroughStarted.current) {
      const timer = setTimeout(() => {
        start();
        walktroughStarted.current = true;
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [start]);

  useEffect(() => {
    copilotEvents.on("stop", () => {
      // props.navigation.navigate("HomeScreen");
    });
    copilotEvents.on("finish", handleFinish);
    return () => {
      copilotEvents.off("stop");
    };
  }, [copilotEvents]);

  useEffect(() => {
    async function handleHelp() {
      const url = `${SERVER_URL}/properties/list`;
      try {
        const response = await axios.get(url);
        if (response.data) {
          const properties = response.data.properties;
          if (properties && properties.length > 0) {
            setWhatsappLink(properties[0].whatsappLink);
          }
        }
      } catch (error) {
        // Handle the error
      }
    }

    handleHelp();
  }, []);
  return (
    <View style={styles.mainContainer}>
      {/* <Button title="Start tutorial" onPress={() => start()} /> */}
      <View style={styles.headingContainer}>
        <View style={styles.line} />
        <Text style={styles.headingText}>Explore</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.sectionsContainer}>
        {data1.map((item, index) => (
          <CopilotStep
            key={index}
            text={`This is the ${item.title} section`}
            order={index + 1}
            name={`step_${index + 1}`}
          >
            <Walkthroughable>
              <TouchableOpacity
                onPress={() => {
                  if (item.type && item.type === "external") {
                    Linking.openURL(whatsappLink);
                  } else {
                    props.navigation.navigate(item.link);
                  }
                }}
              >
                <View style={styles.container}>
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </Walkthroughable>
          </CopilotStep>
        ))}
      </View>
    </View>
  );
}

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 0,
  },
  scrollContainer: {},
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%",
    marginBottom: "2%",
  },
  headingText: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "grey",
  },
  container: {
    margin: 0,
    flex: 1,
    height: "100%",
  },
  sectionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "4%",
    marginRight: "4%",
  },
  image: {
    borderRadius: 80,
    alignSelf: "center",
    width: 60,
    height: 60,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
  },
  subText: {
    marginHorizontal: 10,
    fontSize: 12,
  },
  startButton: {
    color: "#29BFC2",
    textAlign: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  walkthroughableView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
