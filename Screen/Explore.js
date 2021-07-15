import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Picker,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MyPieChart from '../components/pieChart';
import numeral from 'numeral';
import { LineChart } from 'react-native-chart-kit';

const MyBezierLineChart = (props) => {
  return (
    <>
      <Text style={styles.header}>Covid chart</Text>
      <LineChart
        withInnerLines={false}
        withDots={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        yAxisLabel={"Covid cases"}
        data={{
          
          datasets: [
            {
              data: props.data,
              strokeWidth:1
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={220}
        yAxisLabel={'Rs'}
        chartConfig={{
          backgroundColor: '#ff7605',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#ffff',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 255) => `#ff7605`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default () => {
  const [selectedValue, setSelectedValue] = useState('worldwide');
  const [showCountryData, setShowCountryData] = useState({});
  const [countryList, setCountryList] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useState(() => {
    let api = `https://disease.sh/v3/covid-19/countries/`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setCountryList(data);
      });
  }, []);

  useEffect(() => {
    let api =
      selectedValue == 'worldwide'
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${selectedValue}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setShowCountryData(data);
      });
  }, [selectedValue]);

  useEffect(() => {
    let api =
      selectedValue == 'worldwide'
        ? `https://disease.sh/v3/covid-19/historical/all?lastdays=100`
        : `https://disease.sh/v3/covid-19/historical/${selectedValue}?lastdays=100`;

    fetch(api)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        let cases =
          selectedValue == 'worldwide'
            ? response.cases
            : response.timeline.cases;
        let array = [];

        for (key in cases) {
          array.push(cases[key]);
        }
        setGraphData(array);
      });
  }, [selectedValue]);

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

      <Animatable.View style={styles.picker}>
        <Picker
          selectedValue={selectedValue}
          mode="dialog"
          style={{
            height: 40,
            width: Dimensions.get('window').width - 40,
            borderWidth: 1,
            borderColor: 'red',
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="worldwide" value="worldwide" />
          {countryList != null
            ? countryList.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.country}
                    value={item.countryInfo.iso2}
                  />
                );
              })
            : null}
        </Picker>
      </Animatable.View>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 12,
          justifyContent: 'space-evenly',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ccc9c9',
          borderRadius: 12,
          padding: 12,
        }}>
        <View style={styles.data}>
          <Image
            source={require('../images/newinfected.png')}
            style={styles.data_image}
          />
          <Text style={styles.data_infected}>
            +{numeral(showCountryData.todayCases).format('0.0a')}
          </Text>
          <Text style={styles.data_text}>Infected</Text>
        </View>

        <View style={styles.data}>
          <Image
            source={require('../images/newdeath.png')}
            style={styles.data_image}
          />
          <Text style={styles.data_deaths}>
            +{numeral(showCountryData.todayDeaths).format('0.0a')}
          </Text>
          <Text style={styles.data_text}>Deaths</Text>
        </View>

        <View style={styles.data}>
          <Image
            source={require('../images/newrecovered.png')}
            style={styles.data_image}
          />
          <Text style={styles.data_recovered}>
            +{numeral(showCountryData.todayRecovered).format('0.0a')}
          </Text>
          <Text style={styles.data_text}>Recovered</Text>
        </View>
      </View>

      <View>
        {graphData != null ? (
         <MyBezierLineChart data={graphData}/>
        ) : null
        } 
      </View>

      
      <View>
        {showCountryData.recovered != null ? (
          <MyPieChart data={showCountryData} />
        ) : null}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#3B00AB',
    height: 300,
    overflow: 'hidden',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
  },
  picker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  data: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  data_text: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  data_image: {
    width: 25,
    height: 25,
  },
  data_infected: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#dd8240',
  },
  data_recovered: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#72d043',
  },
  data_deaths: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#ee7936',
  },

  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
