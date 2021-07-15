import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default (props)=>{
  return(
     <Animatable.View style={styles.homeView}>
        <View>
          <Image source={require('../images/virus.png')} />
        </View>

        <View style={{ position: 'absolute', left: 50, top: 45 }}>
          <Image source={require(props.image)} />
        </View>
      </Animatable.View>
  )
}


const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#3B00AB',
    height: "35%",
    overflow: 'hidden',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
  }})