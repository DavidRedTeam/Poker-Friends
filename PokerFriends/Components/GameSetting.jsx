import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, Image,  Modal } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';


export default class GameSetting extends Component {
    state = {
        modalVisible: false
      };
    
      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    
    render() { 
        const { modalVisible } = this.state;
        return (  
            <View style = {styles.container}>
                <StatusBar hidden/>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      
                    >
                        <View style = {styles.centeredView}>
                            <View style = {styles.modalView}>
                                <TouchableOpacity
                                  style={styles.buttonInExit}
                                  onPress={() => {
                                  this.props.navigation.navigate('LandingPage')
                                  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                                  this.setModalVisible(!modalVisible);
                                  }}
                                >
                                    <Text style={ styles.exitStyle }>ARE YOU SURE YOU WANT TO EXIT?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => this.setModalVisible(true)}
                    >
                      <Text style ={styles.textStyle} >EXIT</Text>
                    </TouchableOpacity>
                    </View>
               
                <View>
                  <View style={styles.webcam2}>
                      <Text>Webcam 2</Text> 
                  </View> 
                </View>

                <View style={styles.webcam1}>
                    <Text>Webcam 1</Text> 
                </View>
                
                
                <View style={styles.tableView}>
                  <Image  style = {styles.tableView}
                  source = {require('../assets/pokertable.png')}
                  />
               </View>

                <View>
                  <View style={styles.webcam3}>
                      <Text>Webcam 3</Text> 
                  </View>
                </View>
                
              
                <View style={styles.potView}>
                  <Image style = {{   
                      width: 50, 
                      height:50,
                      resizeMode: 'contain',
                      }}
                      source={require('../assets/table.png')}
                  />
                   
                  <Text style = {{ fontSize: 20 ,fontWeight: 'bold',color: 'white'}}>
                      Pot: $420
                  </Text>
                </View>
                
                
                <View style={styles.webcam4}>
                  <View>
                      <Text>Webcam 4</Text> 
                  </View>
                </View>
                
                <View style={styles.bettingButtonsView}>

                  <TouchableOpacity style={styles.bettingButtons}>
                    <Text>Raise</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.bettingButtons}>
                    <Text>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.bettingButtons}>
                    <Text>Fold</Text>
                  </TouchableOpacity>

                </View>


                <View style = {styles.dealer}>
                  <Image style = {styles.dealer}
                    
                  source = {require('../assets/cards.png')}
                  />
                </View>

                <View style={styles.chat}>
                <View>
                    <Text>Chat</Text> 
                </View>
                </View>
                
                <View style={styles.chipView}>
                  <Image
                    style = {{
                    width: 40, 
                    height:40,
                    resizeMode: 'contain',
                    }}
                    source={require('../assets/chipAmount.png')}
                  /> 
                  <Text style = {{ fontSize: 20, fontWeight: 'bold' }}>
                    100
                  </Text> 
                </View>
               
            </View>

         );
    }
}
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ecc71',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    exitStyle: {
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems: "center",
    },
    buttonInExit: {
        borderRadius: 2,
        padding: 10,
        elevation: 2,
        backgroundColor: "#b2bec3",
    },
    button: {
        borderRadius: 2,
        padding: 10,
        elevation: 2,
        backgroundColor: "#b2bec3",
        top: "3%",
        left: "20%"
    },
    buttonOpen: {
        backgroundColor: "#778899",
    },
    exitButton:{
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    dealer: {
        width: 125, 
        height:125,
        resizeMode: 'contain',
        bottom: '0%',
        left: '35%',
        position: 'absolute'
    },
    textStyle:{
        color: '#FFFFFF',
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    
    webcam1:{
        position: 'absolute',
        borderRadius: 2,
        borderColor: 'black',
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor:"#778899",
        top: "35%",
        left: "1%",
    },
      webcam2:{
        borderRadius: 2,
        borderColor: "black",
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: "#778899",
        left:"150%",

    },
    webcam3:{
        borderRadius: 2,
        borderColor: "black",
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: "#778899",
        right: '200%',
        bottom: '0%'
      
    },
    webcam4:{
        position:'absolute',
        borderRadius: 2,
        borderColor: 'black',
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor:"#778899",
        bottom: "45%",
        right: "0%"
    },
    potView:{
        position: 'absolute',
        top: "0%",
        right: "0%"
    },
    pot:{
        borderRadius: 2,
        borderColor: "black",
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 0,
        right: '300%'
    },
     chipAmount: {
       top: '500%',
       left: '50%'
     },
     chipView:{
       position: 'absolute',
       right: "0%",
       bottom: "0%"
     },
     tableView: {
         width: 400,
         height: 400,
         resizeMode: 'contain',
         bottom: '4%',
         right: '4%',
     },
     chat:{
         position:'absolute',
         borderRadius: 2,
         borderColor: 'black',
         paddingVertical: 10,
         paddingHorizontal: 10,
         backgroundColor:"#778899",
         bottom: "0%",
         right: "20%"
     },
    bettingButtonsView:{
         position: 'absolute',
         bottom: "0%",
         left: "0%",
         flexDirection: 'row',
    },
    bettingButtons:{
         borderRadius: 2,
         padding: 10,
         elevation: 2,
         backgroundColor: "#b2bec3",
         marginHorizontal: 5
    }
   
  });
