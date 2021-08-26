import React,{Component} from 'react';
import { TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, Button, TextInput, Image, Text, KeyboardAvoidingView } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-paper'
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { Container, Header, Content, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import {
  MaterialIndicator,
} from 'react-native-indicators';
import HomeDashboard from '../../components/HomeDashboard.js'
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

export default class HomeScreen extends Component {
	constructor(props)
	{
		super(props);
		console.log('in home screen ',props);
		this.state = {
			phoneNumber: '',
			password: '',showAlert:false,childLoader:false,
			events: [],
			error:true,
		}
	}
	render() {
		if(this.state.error==false){
			return (<HomeDashboard events={this.state.events} childLoader={this.state.childLoader} bookEvent={this.bookEvent.bind(this)} loadEvents={this.loadEvents.bind(this)}  navigation={this.props.navigation}/>)
		}
		else{
			return (<MaterialIndicator color='white' style={{backgroundColor:"#0A1045"}}/>)
		}
	}
	loadEvents(selectedDate) {
		this.setState({childLoader: true});
		this.setState({events:[]});
		var url = SERVER_URL+"/event/getEventsByDate";
		var date = new Date().setHours(0,0,0,0);
		if(selectedDate!=null)
			date = selectedDate;
      axios.post(url,{'date':date})
        .then(response => {
            if (response.data) {
				console.log('this is response',response.data);
				this.setState({events: response.data.events});
				this.setState({error:false});
				this.setState({childLoader: false});
            }
        })
        .catch(error => {
			this.error=true;
            console.log('Error while fetching the transactions from sms');
        });
	}

	bookEvent(item,email){
		var id = item.id;
		var url = SERVER_URL+"/event/bookEvent";
      axios.post(url,{'id':id,'email':email})
        .then(response => {
            if (response.data) {
				item.loadingButton.showLoading(false);
				if(response.data=="SUCCESS"){
					var tempEvents = this.state.events;
					for(var i=0;i<tempEvents.length;i++){
						if(tempEvents[i].id==item.id){
							tempEvents[i].seatsLeft = tempEvents[i].seatsLeft - 1;
							this.setState({events:tempEvents});
							break;
						}
					}
					// item.seatsLeft = item.seatsLeft - 1;

					
					return item;
				}
            }
        })
        .catch(error => {
			this.error=true;
            console.log('Error while fetching the transactions from sms');
			return false;
        });		
	}
	componentDidMount() {
		this.loadEvents();
	}

}

const styles = StyleSheet.create({
	container1: {
		flex: 1,
		backgroundColor: '#0A1045'
	},
	input: {
		width: "90%",
		backgroundColor: "white",
		padding: 15,
		marginBottom: 10
	},
	btnContainer: {
		flexDirection: "row",
		justifyContent: "center"
	},
	userBtn: {
		backgroundColor: "#f0ad4e",
		paddingVertical: 15,
		height: 60
	},
	btnTxt: {
		fontSize: 20,
		textAlign: 'center',
		color: "black",
		fontWeight: '700'
	},
	registerTxt: {
		marginTop: 5,
		fontSize: 15,
		textAlign: 'center',
		color: "white",
	},
	welcome: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: 'white'
	},
	logo: {
		width: 150,
		height: 150
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	formContainer: {

	},
	title: {
		color: 'white',
		marginTop: 10,
		width: 160,
		opacity: 0.9,
		textAlign: 'center'
	},
	newinput: {
		height: 50,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 10,
		color: 'white',
		paddingHorizontal: 10
	},
	container2: {
		padding: 25
	},
	title2: {
		color: 'white',
		marginTop: '30%',
		marginBottom: 10,
		opacity: 0.9,
		textAlign: 'center',
		fontSize: 30
	}
});