import React, { useRef, useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import { Animated, StyleSheet, TouchableOpacity, Button } from 'react-native';

import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';

import Logo from './../components/Logo';

export default function TabOneScreen() {

  const [effect, setEffect] = useState(1);

  const fadeAnim = useRef(new Animated.Value(effect)).current;

  const fadeInOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: effect,
      duration: 2000,
      useNativeDriver: true, 
    }).start();
  };

  const applyFadInFadeOutEffect = () => {
    if(effect === 0){
      fadeInOut();
      setEffect(1);
    }
    else{
      fadeInOut();
      setEffect(0);
      setTimeout(function(){
        applyFadInFadeOutEffect();
      }, 2000);
    }
  }

  useEffect(() => {
    applyFadInFadeOutEffect();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.helpContainer}>
      <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          ...
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View> */}
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://facebook.com/'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  Logo: {
    flex: 1,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
