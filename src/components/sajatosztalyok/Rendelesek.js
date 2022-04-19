import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';

//onlyadmin

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  allapotvaltfel=async (allapot_id)=>{
  //alert(allapot_id)

    
    let bemenet={
      bev1:allapot_id
    }

    fetch('http://localhost:8080/allapot_valtoztat_oke',{
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

allapotvaltle=async (allapot_id)=>{
  //alert(allapot_id)

    
    let bemenet={
      bev1:allapot_id
    }

    fetch('http://localhost:8080/allapot_valtoztat_nemoke',{
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


componentDidMount(){
    return fetch('http://localhost:8080/rendelesek')
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
        
        
          <View>
            
    {  item.allapot == 0 
          
          ?  
          
         ( <View style={{marginBottom: 15, borderColor: "black", borderWidth: 2}}>
         
         <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Rendelő neve: {item.rendelo_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Anyag fajtája: {item.anyag_fajtaja} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Anyag neve: {item.rendelt_termek_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Rendelt mennyiség: {item.rendeles_mennyisege} db</Text>

          <View style={{flexDirection:"row"}}>
          <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity
          onPress={async ()=>this.allapotvaltfel(item.rendeles_id)}>
          <View style={styles.gomb1}>
            <Text style={styles.gombSzoveg}>Feldolgozás alatt</Text>
          </View>
        </TouchableOpacity>
        </View>

        <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity
          onPress={async ()=>this.allapotvaltle(item.rendeles_id)}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Befejezett</Text>
          </View>
        </TouchableOpacity>
        </View> 
        </View>
        </View>
         )
          
          :

         null
        }
          
          {  item.allapot == 1 
          
          ?  
          
         ( <View style={{backgroundColor:"#D27979", marginBottom: 15,borderColor: "black", borderWidth: 2}}>

         <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Rendelő neve: {item.rendelo_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Anyag fajtája: {item.anyag_fajtaja} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Anyag neve: {item.rendelt_termek_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Rendelt mennyiség: {item.rendeles_mennyisege} db</Text>
          
          <View style={{flexDirection:"row"}}>
          <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity
          onPress={async ()=>this.allapotvaltfel(item.rendeles_id)}>
          <View style={styles.gomb1}>
            <Text style={styles.gombSzoveg}>Feldolgozás alatt</Text>
          </View>
        </TouchableOpacity>
        </View>

        <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity
          onPress={async ()=>this.allapotvaltle(item.rendeles_id)}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Befejezett</Text>
          </View>
        </TouchableOpacity>
        </View> 
        </View>
        </View>
         )
          
          :

         null
        }

{  item.allapot == 2
          
          ?  
          
         ( <View style={{backgroundColor:"#B6E5B3", marginBottom: 15,borderColor: "black", borderWidth: 2}}> 

         <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Rendelő neve: {item.rendelo_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Anyag fajtája: {item.anyag_fajtaja} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Anyag neve: {item.rendelt_termek_neve} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Rendelt mennyiség: {item.rendeles_mennyisege} db</Text>
          
          <View style={{flexDirection:"row"}}>
          <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity
          onPress={async ()=>this.allapotvaltfel(item.rendeles_id)}>
          <View style={styles.gomb1}>
            <Text style={styles.gombSzoveg}>Feldolgozás alatt</Text>
          </View>
        </TouchableOpacity>
        </View>

        <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity
          onPress={async ()=>this.allapotvaltle(item.rendeles_id)}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Befejezett</Text>
          </View>
        </TouchableOpacity>
        </View> 
        </View>
        </View>
         )
          
          :

         null
        }

          </View> 
          
        }
          
        
          keyExtractor={({anyag_id}, index) => anyag_id}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  gombSzoveg: {
    alignItems: "center",
    marginLeft:"auto",
    marginRight:"auto",
    fontWeight: "bold",
    fontSize: 18
  },
  gomb:{
    backgroundColor: "#00D084",
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: "auto",
    minWidth: 100,
    height: 50,
    alignItems: "center",
  },
  gomb1:{
    backgroundColor: "#DB3E00",
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    marginLeft: "auto",
    minWidth: 100,
    height: 50,
    alignItems: "center",
  }
});