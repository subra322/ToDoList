import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NavigationContainer,
  Alert  
} from 'react-native';
import { useFonts } from 'expo-font';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const Btn1 = () =>
{
   Alert.alert("Wciskam", "lecymy kurwa dur")
};

class Screen1 extends React.Component {
	static navigationOptions = {
		headerShown: false
	};
  constructor(props) {
		super(props);
		this.state = {
      email: 'pjoter@gogo.com',
      password: '12341234',
      OnDiasbled: true,
      userID: null
    };
	}
  nextWindow = () => {
    this.props.navigation.navigate("s2", {nick: this.state.email, OnDisabled: this.state.OnDiasbled, userIdentification: this.state.userID})
  }
 
  async loadFonts() {
    await Font.loadAsync({
      uri: require('../fonts/Roboto-Thin.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  login = () =>
  {
    Alert.alert("Zaloguj")
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Alert.alert("git")
        
        this.setState({OnDiasbled:false, userID: auth.currentUser},()=>this.nextWindow())
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage)
      });
  }

  
  logout = () =>
  {
    Alert.alert("Wylgouj")
    const auth = getAuth();
    signOut(auth).then(() => {
      Alert.alert("git")
      this.setState({OnDiasbled:true})
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage)
    });
    
  }
	render() {
		return (
      <View style={styles.box}>
        <View style={styles.header}>
        <Text style={[styles.title, {fontFamily:'Roboto-Thin'}]}>To do list - Pjoter</Text>
        </View>
        <View style={styles.bbtn1}>
        <Button style={styles.btn1} 
        onPress={this.nextWindow}
        disabled={this.state.OnDiasbled}
        title="klik"></Button>
        </View>
        <View style={styles.btn2}><Button title="zaloguj" onPress={this.login}></Button></View>
      <View style={styles.btn2}><Button title="wyloguj" onPress={this.logout}></Button></View>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  box:{
    display: 'flex',
    flex: 1,
    alignItems:'center',
    flexDirection: 'column',
    justifyContent:'space-evenly',
   // backgroundColor: "red"
  },
  header:
  {
    flex:1,
    //backgroundColor:'yellow'
  },
  title:
  {
    fontSize: 30,
    color: 'black',
    padding: 10,
  },
  btn1:
  {
    
  },
  bbtn1:
  {
    width: '80%',
    flex:1,
  },
});

export default Screen1;
