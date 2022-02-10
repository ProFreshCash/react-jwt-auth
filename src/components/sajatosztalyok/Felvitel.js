import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native';
import FileUpload from "./upload"

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

      hos_id: "",
      hos_nev:"",
      role_id:"",
      hos_leiras:"",
      kep:"",

    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.hos_id=="" || this.state.hos_nev=="" || this.state.role_id=="" || this.state.hos_leiras=="" || this.state.kep=="")
    {
      alert("Hiányzó adatok!")
      return
    }
    let bemenet={
      bev1:this.state.hos_id,
      bev2:this.state.hos_nev,
      bev3:this.state.role_id,
      bev4:this.state.hos_leiras,
      bev5:this.state.kep,
    }

    fetch('http://localhost:8080/uj_hos_fel',{
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
              Hős id:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Pl: adatbázis szerint a következő"
          onChangeText={(hos_id) => this.setState({hos_id})}
          value={this.state.hos_id}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Hős neve:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40, width:'50%',alignSelf:'center',backgroundColor:'blue',marginBottom:5,textAlignVertical:'top',color:"white"}}
          placeholder="Add meg a nevét:"
          onChangeText={(hos_nev) => this.setState({hos_nev})}
          value={this.state.hos_nev}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Szerepkör id:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Pl: adatbázis szerint a megfelelő"
          onChangeText={(role_id) => this.setState({role_id})}
          value={this.state.role_id}
        />

        <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Hős leírása:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg a hős leírását: "
          onChangeText={(hos_leiras) => this.setState({hos_leiras})}
          value={this.state.hos_leiras}
        />

         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Hős képe:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Pl: hoskepe.jpg"
          onChangeText={(kep) => this.setState({kep})}
          value={this.state.kep}
        />
         <TouchableOpacity
          onPress={async ()=>this.felvitel()}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Feltöltés</Text>
          </View>
        </TouchableOpacity>
        <FileUpload  hos_id={this.state.hos_id} hos_nev={this.state.hos_nev} role_id={this.state.role_id} hos_leiras={this.state.hos_leiras} kep={this.state.kep}></FileUpload>
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