import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Image } from "react-native-elements";
import { Colors } from "../../assets/colors/color";

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container1}>
        <View style={styles.container2}>
          <FastImage
            source={{
              uri: "https://storage.googleapis.com/gohappy-main-bucket/Assets/session_section_pills.png",
            }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* <Text style={styles.text}>Free Sessions</Text> */}
        </View>

        <Text style={styles.text}>
          Join free sessions by clicking the "Free Sessions" icon on the next
          Screen.
        </Text>
        {/* <FastImage
          style={styles.image}
          source={require("../../images/intro_image1.png")}
        /> */}
        <TouchableOpacity
          onPress={() => {
            //console.log("tdatada");
            this.props.navigation.replace("GoHappy Club");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: Colors.materialIndicatorColor,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    // marginTop:,
    borderRadius: 80,
    alignSelf: "center",
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.pink.intro,
    color: Colors.black,
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});
