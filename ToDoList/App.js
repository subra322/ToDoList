/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { createAppContainer } from 'react-navigation';
 import { createStackNavigator } from 'react-navigation-stack';
 import { ActivityIndicator } from 'react-native';
 import 'react-native-gesture-handler';

 import Screen1 from './screens/screen1';
 import Screen2 from './screens/screen2';

 import { initializeApp } from 'firebase/app';

 const firebaseConfig = {
   apiKey: "AIzaSyC68gLXzoE488c1gybaGZv4KCcpvRmomqw",
   authDomain: "todolist-6d958.firebaseapp.com",
   databaseURL: "https://todolist-6d958-default-rtdb.firebaseio.com",
   projectId: "todolist-6d958",
   storageBucket: "todolist-6d958.appspot.com",
   messagingSenderId: "322899174788",
   appId: "1:322899174788:web:79845476ca4977772529d1"
 };
 
 const app = initializeApp(firebaseConfig);

 const Root = createStackNavigator({
   s1: { screen: Screen1 },
   s2: { screen: Screen2 },
 });
 
 const App = createAppContainer(Root);
 
 export default App;
 