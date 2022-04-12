import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity, Picker } from 'react-native';
//import FileUpload from "./upload"

//onlyuser

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fajtavalaszt: 1,
      anyagnevvalaszt: 1,
      rendelo_neve: "",
      rendeles_mennyisege:"",
      dataSource:[],
      nevetomb: []
    };
  }

  componentDidMount(){
    fetch('http://localhost:8080/fajtak')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        //alert(JSON.stringify(this.state.dataSource))
        });

      })
      .catch((error) =>{
        console.error(error);
      });

     fetch('http://localhost:8080/anyagnevek')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          nevetomb: responseJson,
         
        }, function(){
          //alert(JSON.stringify(this.state.nevetomb))
        });

      })
      .catch((error) =>{
        console.error(error);
      });

}
felvitel=async ()=>{
    //alert("megnyomva a gomb")
    alert(this.state.fajtavalaszt)
    if (this.state.rendelo_neve=="" || this.state.rendeles_mennyisege=="")
    {
      alert("Hiányzó adatok!")
      return
    }
    let bemenet={
      bev1:this.state.rendelo_neve,
      bev2:this.state.fajtavalaszt,
      bev3:this.state.anyagnevvalaszt,
      bev4:this.state.rendeles_mennyisege,

    }

    fetch('http://localhost:8080/uj_rendeles_fel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
    )
    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)

})
    
}


  render() {
    
    return (
      
    <View style = {{backgroundColor:'#D2AC79',minHeight: 450,minWidth:'80%',borderRadius:20,alignSelf:'center'}}>
      <View style={{padding: 10}}>
          <Text style={{padding: 10, fontSize: 22,color:'black',textAlign:'center'}}>
              Rendelő neve:
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'white',borderColor:'black',color:"black"}}
          placeholder="Adja meg a nevét: "
          onChangeText={(rendelo_neve) => this.setState({rendelo_neve})}
          value={this.state.rendelo_neve}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'black',textAlign:'center'}}>
              Termék fajtája: 
          </Text>
        <View style={{marginLeft: "auto", marginRight: "auto", backgroundColor:"white"}}>
        <Picker
        selectedValue={this.state.fajtavalaszt}
        style={{height: 50, width: 150,}}
        onValueChange={async (itemValue) => {this.setState({fajtavalaszt:itemValue})}}
        >
        {this.state.dataSource.map((item) => (
          <Picker.Item key={item.anyag_fajta_id} label={item.anyag_fajtaja} value={item.anyag_fajta_id} />
        ))}
        </Picker>
        </View>
         <Text style={{padding: 10, fontSize: 22,color:'black',textAlign:'center'}}>
              Termék neve:
          </Text>
        <View style={{marginLeft: "auto", marginRight: "auto", backgroundColor:"white"}}>
        <Picker
        selectedValue={this.state.anyagnevvalaszt}
        style={{height: 50, width: 150,}}
        onValueChange={async (itemValue) => {this.setState({anyagnevvalaszt:itemValue})}}
        >
        {this.state.nevetomb.map((item) => (
          <Picker.Item key={item.anyag_id} label={item.anyag_neve} value={item.anyag_neve} />
        ))}
        </Picker>
        </View>

        <Text style={{padding: 10, fontSize: 22,color:'black',textAlign:'center'}}>
              Mennyisége:
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'white',borderColor:'black',color:"black"}}
          placeholder="PL: db szám vagy köbméterben"
          onChangeText={(rendeles_mennyisege) => this.setState({rendeles_mennyisege})}
          value={this.state.rendeles_mennyisege}
        />
         <TouchableOpacity
          onPress={async ()=>this.felvitel()} style={{}}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Adatok felvitele</Text>
          </View>
        </TouchableOpacity>
       {/* <FileUpload  anyag_neve={this.state.anyag_neve} anyag_leiras={this.state.anyag_leiras} anyag_fajtaja={this.state.anyag_fajtaja} anyag_merete={this.state.anyag_merete} anyag_ar={this.state.anyag_ar} anyag_kep={this.state.anyag_kep}></FileUpload> */}
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    gombSzoveg:{
            textAlign:'center',
            color:'black',
            marginTop:'auto',
            marginBottom:'auto',
            fontSize:25,
            fontWeight: 'bold'
    },
    gomb:{
            minHeight:45,
            marginTop: 20, 
            backgroundColor:'#8EFC9D',
            width:'50%',
            alignSelf:'center',
            borderRadius:10,
            
    },
});