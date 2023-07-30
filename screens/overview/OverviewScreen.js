import React, { Component } from "react";
import axios from "axios";
import HomeDashboard from "../../components/HomeDashboard.js";
import WhatsAppFAB from "../../commonComponents/whatsappHelpButton.js";
// var tambola = require('tambola-generator');
import tambola from "tambola";
import Video from "react-native-video";
import { EventReminderNotification } from "../../services/LocalPushController.js";
import { connect } from "react-redux";
import { setProfile } from "../../redux/actions/counts.js";
import { bindActionCreators } from "redux";
import { Banner, Divider } from "react-native-paper";
import { Image, View } from "react-native";
import TopBanner from "../../components/overview/TopBanner.js";
import TrendingSessions from "../../components/overview/TrendingSessions";
import PromotionSection from "../../components/overview/PromotionSection.js";
import { ScrollView } from "react-native-gesture-handler";
import UpcomingWorkshops from "../../components/overview/UpcomingWorkshops.js";
import LottieView from "lottie-react-native";
import Sections from "../../components/overview/Sections.js";
import { Text } from "react-native";

class OverviewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      password: "",
      showAlert: false,
      childLoader: false,
      events: [],
      error: true,
      whatsappLink: "",
      bannerVisible: true,
      trendingSessions: null,
      upcomingWorkshops: null,
      posters: [],
    };
    crashlytics().log(JSON.stringify(props.propProfile));
    // alert(JSON.stringify(props));
  }

  async getOrderId(amount) {
    var url = SERVER_URL + "/razorPay/pay";
    try {
      const response = await axios.post(url, { amount: amount });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      this.error = true;
      // throw new Error("Error getting order ID");
    }
  }

  async getOverviewData() {
    var url = SERVER_URL + "/home/overview";
    try {
      const response = await axios.get(url);
      if (response.data) {
        console.log(response.data.trendingSessions);
        this.setState({
          trendingSessions: response.data.trendingSessions,
          upcomingWorkshops: response.data.upcomingWorkshops,
          posters: response.data.posters,
        });
      }
    } catch (error) {
      this.error = true;
      // throw new Error("Error getting order ID");
    }
  }

  async getProperties() {
    var url = SERVER_URL + "/properties/list";
    const redux_profile = this.props.profile;
    try {
      const response = await axios.get(url);
      if (response.data) {
        const properties = response.data.properties;
        if (properties && properties.length > 0 && redux_profile) {
          redux_profile.properties = properties[0];
          actions.setProfile(redux_profile);
          this.setState({ whatsappLink: properties[0].whatsappLink });
        }
      }
    } catch (error) {
      this.error = true;
      // throw new Error("Error getting order ID");
    }
  }

  componentWillMount() {
    this.getOverviewData();
  }

  render() {
    if (this.state.error == true) {
      return (
        <>
          <ScrollView>
            {/* <Banner
              visible={this.state.bannerVisible}
              actions={[
                {
                  label: "Contribute Now",
                  onPress: () => this.setState({ bannerVisible: false }),
                },
                {
                  label: "Remind me Later",
                  onPress: () => this.setState({ bannerVisible: false }),
                },
              ]}
              // icon={({ size }) => (
              //   <Image
              //     source={{
              //       uri: "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
              //     }}
              //     style={{
              //       width: size,
              //       height: size,
              //     }}
              //   />
              // )}
            >
              ~ It's been long since you last contributed to us.
            </Banner> */}

            <TopBanner
              navigation={this.props.navigation}
              posters={this.state.posters}
            />

            <Sections
              navigation={this.props.navigation}
              helpUrl={
                this.props.profile.properties
                  ? this.props.profile.properties.whatsappLink
                  : this.state.whatsappLink
              }
            />
            <TrendingSessions
              navigation={this.props.navigation}
              trendingSessions={this.state.trendingSessions}
            />
            <UpcomingWorkshops
              navigation={this.props.navigation}
              upcomingWorkshops={this.state.upcomingWorkshops}
            />
            <PromotionSection navigation={this.props.navigation} />
          </ScrollView>
          <WhatsAppFAB
            url={
              this.props.profile.properties
                ? this.props.profile.properties.whatsappLink
                : this.state.whatsappLink
            }
          />
        </>
      );
    } else {
      // return (<MaterialIndicator color='black' style={{backgroundColor:"#00afb9"}}/>)
      return (
        // <ScrollView style={{ backgroundColor: "white" }}>
        <Video
          source={require("../../images/logo_splash.mp4")}
          style={{
            position: "absolute",
            top: 0,
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 1,
          }}
          muted={true}
          repeat={true}
          resizeMode="cover"
        />
        // </ScrollView>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  count: state.count.count,
  profile: state.profile.profile,
});
const ActionCreators = Object.assign({}, { setProfile });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen);
