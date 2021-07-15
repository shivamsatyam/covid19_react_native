import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image,Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import numeral from 'numeral';
//import React Native chart Kit for different kind of Chart
import {
 
  PieChart,
 
} from 'react-native-chart-kit';



const MyPieChart = (props) => {
 
  return (
    <>
      <Text style={styles.header}>COVID data</Text>
      <PieChart
        data={[
         
          {
            name: 'recover',
            population: props.data.recovered,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
          },
       
          {
            name: 'Deaths',
            population: props.data.deaths,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
          },
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute //for the absolute number remove if you want percentage
      />
    </>
  );
};


export default  MyPieChart

const styles = StyleSheet.create({
    header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  }
})

