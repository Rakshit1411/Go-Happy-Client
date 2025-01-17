import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../../screens/homeScreen/HomeScreen";
import MySessionsScreen from "../../screens/mySessionsScreen/MySessionsScreen";
import MyProfileScreen from "../../screens/myProfileScreen/MyProfileScreen";
import ReferScreen from "../../screens/ReferScreen/ReferScreen";
import React, { Component, useEffect } from "react";
import {
  faChild,
  faClipboardList,
  faHandshake,
  faHistory,
  faHome,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MembershipScreen from "../../screens/myProfileScreen/MembershipScreen";
import { useSelector } from "react-redux";
import OverviewScreen from "../../screens/overview/OverviewScreen";
import { useCopilot } from "react-native-copilot";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../assets/colors/color";
import { useTranslation } from "react-i18next";

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator() {
  const profile = useSelector((state) => state.profile);
  const navigation = useNavigation();
  const { start } = useCopilot();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="OverviewScreen"
      barStyle={{
        shadowOffset: {
          width: 0,
          height: 100,
        },
        shadowOpacity: 100,
        shadowRadius: 100.0,
        elevation: 64,
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        backgroundColor: Colors.bottomNavigation,
        padding: 10,
        zIndex: 10000,
      }}
      shifting={false}
    >
      <Tab.Screen
        name="OverviewScreen"
        children={(props) => (
          <OverviewScreen propProfile={profile} {...props} start={start} />
        )}
        options={{
          tabBarLabel: t("home"),
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faHome}
              color={Colors.greyishText}
              size={25}
            />
          ),
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: Colors.grey.grey,
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        children={(props) => <HomeScreen propProfile={profile} {...props} />}
        options={{
          tabBarLabel: t("sessions"),
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faClipboardList}
              color={Colors.greyishText}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MembershipScreen"
        children={(props) => (
          <MembershipScreen propProfile={profile} {...props} />
        )}
        options={{
          tabBarLabel: t("support"),
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faHandshake}
              color={Colors.greyishText}
              size={25}
            />
          ),
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: Colors.grey.grey,
        }}
      />
      {profile.profile.age == null || profile.profile.age >= 50 ? (
        <Tab.Screen
          name="Refer"
          children={(props) => <ReferScreen propProfile={profile} {...props} />}
          options={{
            tabBarLabel: t("refer"),
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faTrophy}
                color={Colors.greyishText}
                size={25}
              />
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
