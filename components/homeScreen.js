import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

// animation="zoomInUp"
export default () => {
  return (
    <ScrollView>
      <Animatable.View style={styles.homeView}>
        <View>
          <Image source={require('../images/virus.png')} />
        </View>

        <View style={{ position: 'absolute', left: 50, top: 45 }}>
          <Image source={require('../images/Drcorona.png')} />
        </View>
      </Animatable.View>

      <View style={{ padding: 14 }}>
        <Text style={styles.symptoms}>Symptoms</Text>
        <Animatable.View
          style={{ flexDirection: 'row', marginVertical: 12,justifyContent:"center" }}
          animation="zoomInUp">
          <View style={styles.symptoms_view}>
            <Image source={require('../images/headache.png')} />
            <Text style={styles.symptoms_view_text}>HeadAche</Text>
          </View>

          <View style={styles.symptoms_view}>
            <Image source={require('../images/caugh.png')} />
            <Text style={styles.symptoms_view_text}>Cough</Text>
          </View>

          <View style={styles.symptoms_view}>
            <Image source={require('../images/fever.png')} />
            <Text style={styles.symptoms_view_text}>Fever</Text>
          </View>
        </Animatable.View>
      </View>

      <View style={{ padding: 14 }}>
        <Text style={styles.symptoms}>Preventions</Text>
        <Animatable.View
          style={{ flexDirection: 'column', marginVertical: 12 }}
          animation="bounce">

            <View style={styles.prevention}>
              <View style={{borderRadius:34,width:"50%"}}>
                  <Image style={styles.prevention_image} source={require('../images/wash_hands.png')} />
              </View>

              <View style={{flexWrap:"wrap"}}>
              <Text  style={styles.prevention_text}>{"Since the start of   "}  </Text>
              </View>
            </View>

   <View style={styles.prevention}>
              <View style={{borderRadius:34,width:"50%",margin:12}}>
                  <Image style={styles.prevention_image} source={require('../images/wear_mask.png')} />
              </View>

              <View style={{flexWrap:"wrap"}}>
              <Text  style={styles.prevention_text}>{"Since the start of the  "}  </Text>
              </View>
            </View>


          </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#3B00AB',
    height: "35%",
    overflow: 'hidden',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
  },
  symptoms: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'system-ui',
  },
  symptoms_view: {
    backgroundColor: '#fff',
    marginHorizontal: 9,
    borderRadius: 12,
    padding: 2,
  },
  symptoms_view_text: {
    textAlign: 'center',
    marginVertical: 3,
    fontWeight: 'bold',
  },
  prevention:{
      flexDirection:"row",
      backgroundColor:"#fff",
      borderRadius:23,
      padding:12,
      flex:1
  },
  prevention_image:{
      width:135,
      height:135
  },
  prevention_text:{
      flex:1,
      flexWrap:"wrap",
      flexShrink:1
  }
});
