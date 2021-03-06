import React, { useState, useEffect } from 'react';
import {Text, Image, View, Platform, SnapshotViewIOS, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'

export default function ChangeAvatar() {
  var user = firebase.auth().currentUser;
  const [image, setImage] = useState(null);
  const navigation = useNavigation()
  const UpdatePhoto = async () =>{
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });


    let user = firebase.auth().currentUser;
    let storageRef = firebase.storage().ref()
    let fileRef = storageRef.child(user.uid)

    await fileRef.put(blob).then(() => {
      console.log('uploaded image')
    })
    .catch((error) => {
      console.log(error)
    })

    fileRef.getDownloadURL()
      .then((photoUrl) => {
        console.log(photoUrl)
        user.updateProfile({
          photoURL: "" + photoUrl
        })
        navigation.navigate('LandingPage')
      })
      .then(()=> {
        var updates = {}
        updates['/users/'+ user.uid +'/data/photoURL'] = "" + photoUrl;
        firebase.database().ref().update(updates);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2ecc71' }}>
      <Text style={styles.title}>Original Avatar</Text>
      <Image  source ={{ uri: user.photoURL }} style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 100}} />

      <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose a new image from camera roll</Text>
      </TouchableOpacity>


      {image && <View>
          <Text style={styles.title}>New Avatar</Text> 
          <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20, borderRadius: 100 }} />

          <View style = {{marginTop: 10}}>
            <TouchableOpacity style={styles.buttonContainer} onPress={UpdatePhoto}>
              <Text style={styles.buttonText}>Confirm Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

      

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ecc71',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    Stats: {
        borderRadius: 50,
        margin: 10,
        elevation: 2,
        backgroundColor: "#7befb2",
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },  
    textContainer: {
        width: '100%'
    },
    bubble: {
        backgroundColor: '#27ae60',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: '80%',
        marginBottom: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonContainer:{
        backgroundColor: '#27ae60',
        paddingVertical: 20,
        padding: 20,
        borderRadius: 50,
        width:"100%",
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '900'
    },
});
