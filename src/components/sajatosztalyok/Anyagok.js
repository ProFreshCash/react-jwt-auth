import React, { Component } from 'react';
import { Text, View, FlatList, Image,Modal,StyleSheet,TouchableOpacity  } from 'react-native';
//import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
//import { TouchableHighlight } from 'react-native-gesture-handler';

//const CONFIG = require('./config.js');

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true, isVisible:false,anyag:[]}
  }
    componentDidMount(){
      return fetch('http:/localhost:8080/anyagok')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson,
            anyag: [],
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });

  }

  displayModal(show){
    this.setState({isVisible: show})
  }
   
 /* logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    console.log('');
    console.log('');
    console.log('-------------');
    console.log('Event: ', event);
    console.log('GestureState: ', gestureState);
    console.log('ZoomableEventObject: ', zoomableViewEventObject);
    console.log('');
    console.log(`Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`);
  }*/

  render() {
    return (
      <View style={{padding: 10, marginLeft: "auto", marginRight: "auto"}}>

          <Modal
            animationType = {"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
             // Alert.alert('Modal has now been closed.');
            }}>
         <View style = {styles.modal} /*Modal Törzse*/ >

          
       {/* <View //style={{width:230,height:230}}>
        <ReactNativeZoomableView 
          //  maxZoom={1.5}
           // minZoom={0.5}
           // zoomStep={0.5}
           // initialZoom={1}
            //bindToBorders={true}
            //onZoomAfter={this.logOutZoomState}
            //style={{
             // padding: 10,
              //backgroundColor: 'white',
          //}}
        >*/}
         {/* <Image //style={{width: '100%', height: '100%'}}*/}
                 {/*source={{uri: 'http://localhost:8080/anyagok'+this.state.anyag.anyag_kep}}
                 //resizeMode="contain" />
        </ReactNativeZoomableView>*/}
    {/*  </View>*/}
      
        </View> 

          <View style = {styles.container2}>
              <Text //Bezáró Gomb
                style={styles.closeText}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);}}>Bezárás
              </Text>
            </View>
          </Modal>



            <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View style={{paddingBottom: 20, width: 500,}}>
           <View style={{flex: 1, flexDirection: 'row', borderColor: "black", borderWidth: 3, borderRadius: 15, padding: 10, }}>
        <View style={{flex: 1, width: 400,height: 300, marginLeft: "auto", marginRight: "auto"}} >


        <Text style={{color:"black",fontSize:24,textAlign:"center",marginTop:5,marginBottom:5}}   >Neve és mérete: {item.anyag_nevesmeret}cm</Text>
        <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:5,marginBottom:5}}   >Mennyiség: {item.anyag_mennyiseg} db</Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:5,marginBottom:5}}   >Ár: {item.anyag_ar} Ft</Text>
          <Text style={{color:"black",fontSize:30,textAlign:"center",marginTop:5,marginBottom:5}}   >Rendelő: {item.anyag_rendelő} </Text>

         </View>

        <View style={{flex: 1,marginLeft: 5}}>
        <TouchableOpacity  onPress={() => { this.displayModal(true); this.setState({anyag:item})}}>
        <Image style={{ width: 200, height: 200, marginLeft:15}}
                 source={{uri: 'http://localhost:8080/'+item.anyag_kep}}
                 resizeMode="contain"/>
        </TouchableOpacity >
        </View>        
      </View>
  </View>
        }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0fb0fb',
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    padding:20,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    marginTop:'auto',
  },
  container2: {
    fontSize: 24,
    color: '#00479e',
    marginTop:'auto',
    alignSelf:'center',
    marginBottom:50,
  },
  cim: {
    fontWeight:"bold",
    textAlign:"center",
    fontSize:25
  },
  modal: {
    fontSize: 24,
    color: '#00479e',
    marginTop:100,
    textAlign: 'center',
  }
});