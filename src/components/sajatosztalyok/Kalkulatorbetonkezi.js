import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons';
/*import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';*/

// user/nonuser

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }
  state = {
    hosszusag: "",
    magassag: "",
    szelesseg: "",
    ered: "",
    szukseglet: "",
 }
 szamitas = async(hosszusag=0, szelesseg=0, magassag=0) =>{

  if(hosszusag<1 || szelesseg<1 || magassag<1)
  {
    Alert.alert('Hiba','Töltse ki a mezőket!')
  }
  else{
    var eredmeny = parseFloat(hosszusag)*parseFloat(szelesseg)*parseFloat(magassag)*1.2;
    var zsakcement= 3*eredmeny;
    this.setState({szukseglet: zsakcement.toFixed(2)})
    this.setState({ered: eredmeny.toFixed(2)})
  } 
}
  magassagkezel = (text) => {
  if(text!=null)
  {
    this.setState({ magassag: text })
  }
}
  szelessegkezel = (text) => {
    if(text!=null)
    {
      this.setState({ szelesseg: text })
    }
}
 hosszusagkezel = (text) => {
  if(text!=null)
  {
    this.setState({ hosszusag: text })
  }
}

  render() {
    return (
      <View style={{padding: 10, marginLeft:"auto", marginRight: "auto", borderRadius: 15, borderColor: "black", borderWidth: 5, marginTop: 20, width: 600,
      height:600, backgroundColor: "lightgrey"}}>
       
        <View style={{justifyContent:"center", alignItems:"center", width:300,height: 60, marginLeft:"auto", marginRight:"auto"}}>
          <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20, textDecorationLine:"underline", textTransform:"uppercase"}}>Betonalap mennyiségének kiszámítása kézileg</Text>
        </View>

        <View style={{width: 400,
          height:300, marginLeft: "auto", marginRight: "auto"}}>
        
        <View style={{flex: 1, flexDirection: "row", marginLeft: "auto", marginRight: "auto"}}>
        {/*<FontAwesome5 name="ruler-vertical" size={18} color="black" style={{marginTop:14}}/>*/}
        <Text style={{padding: 10,marginBottom: 5 ,  fontSize: 18, fontWeight: 'bold'}}>
          Magasság (m): 
        </Text>
        <TextInput keyboardType='numeric'
      style={{height: 30, width: 100,borderColor: 'black', borderWidth: 3, borderRadius: 25, marginRight: "auto", textAlign:"center", fontSize: 17, marginLeft: 10, marginTop: 8}}
      onChangeText={this.magassagkezel}
        />
        </View>
        
        <View style={{flex: 1, flexDirection: "row", marginLeft: "auto", marginRight: "auto"}}>
        {/*<FontAwesome5 name="ruler-horizontal" size={18} color="black" style={{marginTop:14}}/>*/}
        <Text style={{padding: 10, marginBottom: 5 , fontSize: 18, fontWeight: 'bold'}}>
          Szélesség (m): 
        </Text>
        <TextInput keyboardType='numeric'
      style={{borderColor: 'black', borderWidth: 3, borderRadius: 25, marginRight: "auto", textAlign:"center", fontSize: 17, height: 30, width: 100, marginLeft: 10, marginTop: 8}}
      onChangeText={this.szelessegkezel}
        />
        </View>
        
        <View style={{flex: 1, flexDirection: "row", marginLeft: "auto", marginRight: "auto"}}>
        {/*<FontAwesome5 name="ruler" size={18} color="black" style={{marginTop:14}}/>*/}
        <Text style={{padding: 10,marginBottom: 5 , fontSize: 18, fontWeight: 'bold'}}>
          Hosszúság (m): 
        </Text>
        <TextInput keyboardType='numeric'
      style={{borderColor: 'black', borderWidth: 3, borderRadius: 25, marginRight: "auto", textAlign:"center",  fontSize: 17, height: 30, width:100, marginTop: 8}}
      onChangeText={this.hosszusagkezel}
        />
        </View>
        
        </View>
        
        <TouchableOpacity style={{marginTop: 15, fontSize: 25, backgroundColor: "blue", borderRadius: 25, height: 30, width: 150, marginLeft:"auto", marginRight:"auto", justifyContent:"center", alignItems:"center"}}
        onPress={async()=> this.szamitas(this.state.magassag, this.state.szelesseg, this.state.hosszusag)}>
         <Text style={{textAlign: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 18}}> Számítás </Text>
       </TouchableOpacity>
        
        <View style={{flex: 1, flexDirection: "row",width: 100,height: 10, justifyContent:"center", alignItems:"center", marginLeft: "auto", marginRight: "auto"}}>
       <Text style={{fontSize: 20, marginTop: 20, fontWeight: "bold", marginLeft: 20}}>Eredmény: </Text>
       <Text style={{fontSize: 20, marginTop: 20}}>{this.state.ered}</Text>
       <Text style={{fontSize: 20, marginLeft: 2, marginTop: 20}}>m</Text>
       <Text style={{fontSize:10, lineHeight: 20, marginTop: 20}}>3</Text>
      </View>
      <View style={{flex: 1, flexDirection: "row",width: 300,height: 50, justifyContent:"center", alignItems:"center",  marginLeft: "auto", marginRight: "auto"}}>
      <Text style={{fontSize: 20, marginTop: 20, textAlign:"center"}}>Ajánlott <Text style={{fontWeight: "bold"}}>{this.state.szukseglet}</Text> mázsányi cement</Text>
      </View>
      </View>
    );
  }
}