import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native';
import FileUpload from "./upload"

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

      anyag_nevesmeret: "",
      anyag_mennyiseg:"",
      anyag_ar:"",
      anyag_rendelo:"",
      anyag_kep:"",
      anyag_leiras:""

    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.anyag_nevesmeret=="" || this.state.anyag_mennyiseg=="" || this.state.anyag_ar=="" || this.state.anyag_rendelo=="" || this.state.anyag_kep=="" || this.state.anyag_leiras=="")
    {
      alert("Hiányzó adatok!")
      return
    }
    let bemenet={
      bev1:this.state.anyag_nevesmeret,
      bev2:this.state.anyag_mennyiseg,
      bev3:this.state.anyag_ar,
      bev4:this.state.anyag_rendelo,
      bev5:this.state.anyag_kep,
      bev6:this.state.anyag_leiras
    }

    fetch('http://localhost:8080/uj_anyag_fel',{
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
              Anyag neve és mérete:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Pl: deszka 80x60"
          onChangeText={(anyag_nevesmeret) => this.setState({anyag_nevesmeret})}
          value={this.state.anyag_nevesmeret}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Mennyisége:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40, width:'50%',alignSelf:'center',backgroundColor:'blue',marginBottom:5,textAlignVertical:'top',color:"white"}}
          placeholder="Add meg a mennyiségét:"
          onChangeText={(anyag_mennyiseg) => this.setState({anyag_mennyiseg})}
          value={this.state.anyag_mennyiseg}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Ára:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg az árát a terméknek: "
          onChangeText={(anyag_ar) => this.setState({anyag_ar})}
          value={this.state.anyag_ar}
        />

        <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Rendelő:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg a termék megrendelőjét: "
          onChangeText={(anyag_rendelo) => this.setState({anyag_rendelo})}
          value={this.state.anyag_rendelo}
        />

         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Anyag képe:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Kép feltöltése:"
          onChangeText={(anyag_kep) => this.setState({anyag_kep})}
          value={this.state.anyag_kep}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Anyag leírása:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg a leírását:"
          onChangeText={(anyag_leiras) => this.setState({anyag_leiras})}
          value={this.state.anyag_leiras}
        />
         <TouchableOpacity
          onPress={async ()=>this.felvitel()}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Adatok felvitele</Text>
          </View>
        </TouchableOpacity>
        <FileUpload  anyag_nevesmeret={this.state.anyag_nevesmeret} anyag_mennyiseg={this.state.anyag_mennyiseg} anyag_ar={this.state.anyag_ar} anyag_rendelo={this.state.anyag_rendelo} anyag_kep={this.state.anyag_kep} anyag_leiras={this.state.anyag_leiras}></FileUpload>
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