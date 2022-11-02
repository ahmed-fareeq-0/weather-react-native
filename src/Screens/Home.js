import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TextInput,
  ActivityIndicator
} from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import { useState } from "react";
import axios from "axios";

import Bg from "./../../assets/d5b109a03cd7c1022a7de2b99163950a.jpg";

const Home = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true)
	if(!city.trim()){
		console.log('error wwwww');
	}else{
		
		try {
			const key = '4a8ea20697876bc7c2d6ff41889b631f'
			const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
			setData(result.data);
      setLoading(false);
		} catch (error) {
			console.log(error);
      alert('wrong city name');
      setLoading(false);
		}
	}
  }

  return (
    <ImageBackground source={Bg} style={styles.Image}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="weather"
            onChangeText={(value) => setCity(value)}
          />
          {
            !loading ? <>
              {city.length > 0 ? <AntDesign name="checkcircle" size={24} onPress={getWeather} style={styles.check} /> : null}
            </> : <ActivityIndicator size='small' color='green' />
          }
        </View>
		{Object.keys(data).length > 0 ?
		<>
			<View style={styles.weather}>
				<Text style={styles.loction}>{data.name} , {data.sys.country}</Text>
				<Text style={styles.temp}>{Math.round(data.main.temp - 273)} <Text style={{color:'#FF5B00'}}>°C</Text></Text>
				<Text style={styles.weatherCondition}>{data.weather[0].main}</Text>
			</View>
		</>
		 : null}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Home;

const styles = StyleSheet.create({
  Image: {
    flex: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 50,
  },
  textInputContainer: {
	flexDirection:'row',
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 16,
    width: "80%",
    backgroundColor: 'transparent',
	justifyContent:'space-between',
  borderColor:'#fff',
  borderWidth:0.7
  },
  input: {
    height: 40,
    width: "90%",
    fontWeight: "600",
  },
  weather:{
	alignSelf:'center',
	alignItems:'center',
	paddingVertical:25
  },
  check:{
	marginLeft:8,
  color:'#000'
	// backgroundColor:'#8D72E1',
	// paddingVertical:10,
	// paddingHorizontal:5,
	// borderTopRightRadius:10,
	// borderBottomRightRadius:10
  },
  loction:{
	color:'#fff',
	fontSize:40,
  },
  temp:{
	color:'#FCE700',
	fontSize:50,
	backgroundColor:'rgba(238, 238, 238,0.3)',
	marginTop:30,
	marginBottom:10,
	borderRadius:10,
	textShadowColor:'rgba(0,0,0, 0.75)',
	fontWeight:'bold',
	paddingHorizontal:20,
	paddingVertical:30,
	textShadowOffset: {width:-3, height:3},
	textShadowRadius:10
  },
  weatherCondition:{
	color:'#fff',
	fontSize:25,
  }
});
