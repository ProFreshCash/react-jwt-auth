import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native';

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

        bev: '',
        komment:""

    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.nev=="" || this.state.komment=="")
    {
      alert("Add meg a nevet és a kommmentet!")
      return
    }
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment,
      bevitel3:this.props.akttema_bevitel
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
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Mennyisége:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40, width:'50%',alignSelf:'center',backgroundColor:'blue',marginBottom:5,textAlignVertical:'top',color:"white"}}
          placeholder="Add meg a mennyiségét:"
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Ára:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg az árát a terméknek: "
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Anyag képe:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Kép feltöltése:"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Anyag leírása:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg a leírását:"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />
         <TouchableOpacity
          onPress={async ()=>this.felvitel()}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Adatok felvitele</Text>
          </View>
        </TouchableOpacity>
        
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