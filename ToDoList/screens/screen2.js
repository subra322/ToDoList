import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NavigationContainer,
  Alert,  
  TextInput,
  FlatList
} from 'react-native';
import { getDatabase, ref, set, put, onValue, push, onChildAdded } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
 //config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const user= auth.currentUser
var arr = []

class Screen2 extends React.Component {
	static navigationOptions = {
    title:"To do list"
	};
  async loadFonts() {
    await Font.loadAsync({
      uri: require('../fonts/Roboto-Thin.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
  constructor(props) {
		super(props);
		this.state = {
      nick: this.props.navigation.state.params.nick,
      userID: this.props.navigation.state.params.userIdentification.uid,
      czyn: "",
      godz: 0,
      min: 0,
      cal: 0,
      data: (new Date().getMonth()+1) + "." + new Date().getDate(),
      OnDisabled: false
    };
   	}
  click = () =>
  {
    Alert.alert("Dodaje użytkownikowi: ", this.state.nick)
    if(this.state.godz == 0 && this.state.min ==  0)
    {
    this.setState({godz: Math.floor(this.state.cal / 60) , min: (this.state.cal % 60)},()=>{
    this.add()
    })
    }else
    {
      this.add();
    }
}
add = () =>
    {
    //   console.log("Lecim")
    //  // set(ref(db, 'users/' + user.uid + "/" + (new Date().getMonth()+1) + ";" + new Date().getDate() + "/" + new Date().getTime() ), {
    //   //set(ref(db, 'users/' + user.uid + "/work/" + (new Date().getMonth()+1) + ";" + new Date().getDate() + "/" + new Date().getTime()), {
    //     set(ref(db, 'users/' + user.uid + "/work/"), [{
    //     username: this.state.nick,
    //     czynnosc: this.state.czyn,
    //     godziny: this.state.godz,
    //     minuty: this.state.min
    //    }])

    const work = ref(db, 'users/'+ this.state.userID + '/work/');
    push(work,{
        username: this.state.nick,
        czynnosc: this.state.czyn,
        godziny: this.state.godz,
        minuty: this.state.min,
        data: this.state.data
    })

    this.getData();   
    }
    

    refresh = () =>
    {
      this.getData();
      Alert.alert(this.state.userID + " " + user)
    }
 getData = () =>
{
  let arr = []
  let arrInside = []
  const getDataBase = ref(db, 'users/'+ this.state.userID);
  console.log(this.state.userID)

  const work = ref(db, 'users/'+ this.state.userID + '/work/');
  onChildAdded(work, (data) => {
  arr.push(data.key)
  });

   onValue(getDataBase, (snapshot) => {
    const data = snapshot.val();
    
  arr.forEach(function (a,c){
    arrInside.push(data.work[arr[c]])
  })

  this.setState({work: arrInside })
  });
}
	render() {
		return (
   <View style={styles.box}>
     <View style={styles.header}>
       <TextInput style={styles.input}
       placeholder="czynnosc"
       onChangeText={(czyn) => this.setState({czyn})}>
       </TextInput>
       <TextInput style={styles.input}
        placeholder="godziny"
        keyboardType="numeric"
        onChangeText={(godzin) => this.setState({godz:godzin})}
        >
        </TextInput>
        <TextInput style={styles.input}
        placeholder="minuty"
        keyboardType="numeric"
        onChangeText={(minut) => this.setState({min:minut})}
        >
        </TextInput>
       <TextInput style={styles.input}
        placeholder="calosc"
        onChangeText={(cale) => this.setState({cal:cale})}
        >
        </TextInput>
      <View style={styles.btn2}>
        <Button title="dodaj" onPress={this.click} disabled={false}></Button>
        <Button title="Odśwież" onPress={this.refresh} disabled={false}></Button>

      </View>
        
      </View>
     <View style={styles.list}>
        
        <Text style={styles.text}>
        </Text>
        <FlatList
        data={this.state.work}
        renderItem={({item}) => <View style={styles.item}>
        <Text>Czynność: {item.czynnosc}</Text>
        <Text>Użytkownik: {item.username}</Text>
        <Text>Godzin: {item.godziny}</Text>
        <Text>Minut: {item.minuty}</Text>
        <Text>Data: {item.data}</Text>
        </View>}
      />
     </View>
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
   //backgroundColor: "red"
  },
  header:
  {
    flex: 1,
    flexDirection:'row',
  },
  list:
  {
    flex: 5,
    width: '90%',
  },
  btn2:
  {
   
  },
  input:
  {
    height: 40,
    borderWidth: 2,
    padding: 5,
  },
  item:
  {
    flex: 1,
    flexDirection: 'column',
    margin:3,
    borderWidth: 2,
  },
});

export default Screen2;
