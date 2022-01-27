import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, TextInput, TouchableOpacity} from 'react-native';

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
  }

  adatfel=()=>
{
    var adatok={
        nev:document.getElementById("nev").value,
        ar:document.getElementById("ar").value,
        szin:document.getElementById("szin").value,
        meret:document.getElementById("meret").value,
        anyag:document.getElementById("anyag").value,
    }

    fetch("http://localhost:8080/uj_anyag_fel",
    {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type":"application/json; charset=UTF-8"}
    }
    )
    .then(x => x.text())
    .then(y => alert(y))
    window.location.reload();
    this.setState({});
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

          <View>
            <View>
            <Text style={{fontSize:24}}></Text>
            <TextInput style={{Width: 200, Height: 20, }}/>
            </View>
          <TouchableOpacity
            style={styles.kekgomb}
            onPress={this.adatfel()}
            >
            <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Felvitel</Text>
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