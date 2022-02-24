import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native';
import FileUpload from "./upload"

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

      rendelo_neve: "",
      rendelt_termek_fajtaja:"",
      rendelt_termek_neve:"",
      rendeles_mennyisege:"",

    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.rendelo_neve=="" || this.state.rendelt_termek_fajtaja=="" || this.state.rendelt_termek_neve=="" || this.state.rendeles_mennyisege=="")
    {
      alert("Hiányzó adatok!")
      return
    }
    let bemenet={
      bev1:this.state.rendelo_neve,
      bev2:this.state.rendelt_termek_fajtaja,
      bev3:this.state.rendelt_termek_neve,
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
    window.location.reload();
    this.setState({});

})
    
}


  render() {
    
    return (
      
    <View style = {{backgroundColor:'darkblue',width:'80%',borderRadius:20,alignSelf:'center'}}>
      <View style={{padding: 10}}>
          <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Rendelő neve:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Adja meg a nevét: "
          onChangeText={(rendelo_neve) => this.setState({rendelo_neve})}
          value={this.state.rendelo_neve}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Termék fajtája: 
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40, width:'50%',alignSelf:'center',backgroundColor:'blue',marginBottom:5,textAlignVertical:'top',color:"white"}}
          placeholder="Adja meg a fajtáját:"
          onChangeText={(rendelt_termek_fajtaja) => this.setState({rendelt_termek_fajtaja})}
          value={this.state.rendelt_termek_fajtaja}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Termék neve:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Adja meg az anyag nevét: "
          onChangeText={(rendelt_termek_neve) => this.setState({rendelt_termek_neve})}
          value={this.state.rendelt_termek_neve}
        />

        <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Mennyisége:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="PL: db szám vagy köbméterben"
          onChangeText={(rendeles_mennyisege) => this.setState({rendeles_mennyisege})}
          value={this.state.rendeles_mennyisege}
        />
         <TouchableOpacity
          onPress={async ()=>this.felvitel()}>
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
            color:'white',
            marginTop:'auto',
            marginBottom:'auto',
            fontSize:25
    },
    gomb:{
            height:45,
            marginTop: 20, 
            backgroundColor:'blue',
            width:'45%',
            alignSelf:'center',
            borderRadius:10
    },
});