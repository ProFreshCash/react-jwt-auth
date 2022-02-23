import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch("http://localhost:8080/osszeshosboltorles", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  window.location.reload();
  this.setState({});
  }


  componentDidMount(){
    return fetch('http://localhost:8080/osszeshos')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
console.log(JSON.stringify(responseJson))
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

          <View >
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.hos_nev} </Text>
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.hos_leiras} </Text>
          <Image  source={{uri: 'http://localhost:8080/'+item.kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.szavazat(item.id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
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
    backgroundColor: "blue",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
  }
});