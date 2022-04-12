import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';

//user/nonuser

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://localhost:8080/anyagok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View style={{width: 400, marginBottom: 10, borderColor: "black", borderRadius: 30, borderWidth: 2, marginLeft: "auto", marginRight: "auto", backgroundColor:"#D2AC79"}}>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >
          Anyag neve: {item.anyag_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Leírás: {item.anyag_leiras} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Méret: {item.anyag_merete} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Ár: {item.anyag_ar} Ft</Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Fajtája: {item.anyag_fajtaja} </Text>
          <Image  source={{uri: 'http://localhost:8080/'+item.anyag_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto", marginBottom: 15}} /> 
          </View>
        
        }

        
          keyExtractor={({anyag_id}, index) => anyag_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "#FF1111",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    fontWeight: 'bold'
  }
});