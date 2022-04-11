import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View, Picker } from 'react-native';
import FileUpload from "./upload"

//onlyadmin

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fajtavalaszt: 0,
      anyag_neve: "",
      anyag_leiras:"",
      anyag_merete:"",
      anyag_ar:"",
      anyag_kep:"",
      dataSource:[],
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
        alert(JSON.stringify(this.state.dataSource))
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.anyag_neve=="" || this.state.anyag_leiras=="" || this.state.anyag_merete=="" || this.state.anyag_ar=="")
    {
      alert("Hiányzó adatok!")
      return
    }
    let bemenet={
      bev1:this.state.anyag_neve,
      bev2:this.state.anyag_leiras,
      bev3:this.state.fajtavalaszt,
      bev4:this.state.anyag_merete,
      bev5:this.state.anyag_ar,
      bev6:this.state.anyag_kep
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
              Anyag neve:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Add meg az anyag nevét: "
          onChangeText={(anyag_neve) => this.setState({anyag_neve})}
          value={this.state.anyag_neve}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Leírása:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40, width:'50%',alignSelf:'center',backgroundColor:'blue',marginBottom:5,textAlignVertical:'top',color:"white"}}
          placeholder="Add meg a leírást:"
          onChangeText={(anyag_leiras) => this.setState({anyag_leiras})}
          value={this.state.anyag_leiras}
        />
         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Fajtája:
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

        <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Mérete:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="PL: magasság x szélesség x hosszúság"
          onChangeText={(anyag_merete) => this.setState({anyag_merete})}
          value={this.state.anyag_merete}
        />

         <Text style={{padding: 10, fontSize: 22,color:'white',textAlign:'center'}}>
              Anyag ára:
          </Text>
        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'blue',borderColor:'black',color:"white"}}
          placeholder="Anyag ára: "
          onChangeText={(anyag_ar) => this.setState({anyag_ar})}
          value={this.state.anyag_ar}
        />
         
         {/*<TouchableOpacity
          onPress={async ()=>this.felvitel()}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Adatok felvitele</Text>
          </View>
         </TouchableOpacity>*/}
        <FileUpload anyag_neve={this.state.anyag_neve} anyag_leiras={this.state.anyag_leiras} fajtavalaszt={this.state.fajtavalaszt} anyag_merete={this.state.anyag_merete} anyag_ar={this.state.anyag_ar} anyag_kep={this.state.anyag_kep}></FileUpload>
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