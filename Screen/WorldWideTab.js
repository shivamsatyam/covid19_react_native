import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image,Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import numeral from 'numeral';
//import React Native chart Kit for different kind of Chart
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';



const MyPieChart = (props) => {
 
  return (
    <>
      <Text style={styles.header}>COVID WORLDWIDE</Text>
      <PieChart
        data={[
         
          {
            name: 'Recovered',
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


  function SortData(data) {
    let sortedData = data.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });

    return sortedData;
  }



export default () => {
  const [totalCountryData, setTotalCountryData] = useState({});
  const [wordWideCase, setWordWideCase] = React.useState(false);
  const [historicalCaseLabel,setHistoricalCaseLabel ] = React.useState([]);
  const [historicalCaseDataSet,setHistoricalCaseDataset ] = React.useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        let sortedData = SortData(data);
        setWordWideCase(sortedData);
      });
  }, []);


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setTotalCountryData(data);
        console.log(data);
      });
  }, []);

  // useEffect(()=>{
  //    fetch('https://disease.sh/v3/covid-19/historical/all/?lastdays=all')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let label = [];
  //       let dataset = [];
  //         for(let keys in data.cases){
  //           label.push(keys)
  //           dataset.push(data.cases[keys])
  //         }

  //         setHistoricalCaseLabel(label)
  //         setHistoricalCaseDataset(dataset)
  //     });
  // },[])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Animatable.View style={styles.homeView}>
        <View>
          <Image source={require('../images/virus.png')} />
        </View>

        <View style={{ position: 'absolute', left: 50, top: 45 }}>
          <Image source={require('../images/Drcorona.png')} />
        </View>
      </Animatable.View>

      <Animatable.View style={styles.top_view}>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 22,
              fontFamily: 'sans-serif',
            }}>
            {totalCountryData.deaths}
          </Text>
          <Text style={{ textAlign: 'center' }}>Deathes</Text>
        </View>

        <View>
          <View style={{ marginVertical: 12 }}>
            <Text style={{ fontFamily: 'sans-serif' }}>New Cases</Text>
            <Text
              style={{ fontWeight: 'bold', color: '#ff7605', fontSize: 16 }}>
              {numeral(totalCountryData.todayCases).format('0.0a')}
            </Text>
          </View>
          <View>
            <Text>Recovery Rate</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: 16,
              }}>{`${numeral(
              parseInt(
                (totalCountryData.recovered / totalCountryData.cases) * 100
              )
            ).format('0.0a')} %`}</Text>
          </View>
        </View>
      </Animatable.View>

      <View style={{ marginVertical: 12 }}>
        <View
          style={{
            marginHorizontal: 12,
            borderBottomWidth: 2,
            borderBottomColor: '#ccc9c9',
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
            Most Death cases by country{' '}
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 18 }}>
        {
          wordWideCase?wordWideCase.slice(0, 3).map((item,index)=>{
            return     <Animatable.View style={styles.flag_view}>
          <View style={{ flex: 0.6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={item.countryInfo.flag}
                style={{ marginVertical: 9,width:20,height:20 }}
              />
              <Text>{item.country}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.text_view}>
                <Image
                  source={require('../images/total.png')}
                  style={styles.text_image}
                />
                <Text>{numeral(item.cases).format('0.0a')}</Text>
              </View>

              <View style={styles.text_view}>
                <Image
                  source={require('../images/recover.png')}
                  style={styles.text_image}
                />
                <Text>{numeral(item.recovered).format('0.0a')}</Text>
              </View>

              <View style={styles.text_view}>
                <Image
                  source={require('../images/death.png')}
                  style={styles.text_image}
                />
                <Text style={styles.text_text}>{numeral(item.deaths).format('0.0a')}</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row',justifyContent:"center",alignItems:"center" }}>
              <Image
                source={require('../images/total.png')}
                style={styles.text_image}
              />
              <Text style={styles.death_text}>+{numeral(item.todayCases).format('0.0a')}</Text>
            </View>

            <View style={{ flexDirection: 'row',justifyContent:"center",alignItems:"center" }}>
              <Image
                source={require('../images/death.png')}
                style={styles.text_image}
              />
              <Text style={styles.death_text}>+{numeral(item.todatDeaths).format('0.0a')}</Text>
            </View>
          </View>
        </Animatable.View>
          }):null
        }
      </View>





    {
      totalCountryData.recovered!=null?<MyPieChart data={totalCountryData}/>:null
    }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  homeView: {
    backgroundColor: '#3B00AB',
    height: '35%',
    overflow: 'hidden',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
  },
  top_view: {
    borderWidth: 1,
    borderColor: '#ccc9c9',
    flexDirection: 'row',
    borderLeftColor: '#ff7605',
    justifyContent: 'space-evenly',
    borderLeftWidth: 3,
    marginHorizontal: 22,
    marginVertical: 20,
    alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  top_date: {
    fontSize: 13,
    color: 'gray',
  },
  top_heading: {
    fontFamily: 'cursive',
    fontWeight: 'bold',
    fontSize: 21,
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc9c9',
    paddingHorizontal:3
  },
  text_text: {},
  text_image: {
    width: 12,
    height: 12,
    marginHorizontal: 4,
  },
  death_text: {
    fontWeight: 'bold',
    color: 'red',
    fontFamily: 'sans-serif',
  },
  flag_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc9c9',
    padding: 5,
    marginVertical:5
  },
});
