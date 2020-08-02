import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, Text } from 'react-native';
import { Card } from "react-native-elements";

const CategoryImage = (props) => {
  const goBack = (value) => {
    props.callBack(value);
  };
  
  return(
    <Card
      image={{ uri: props.url }}
      imageStyle={styles.image}
      containerStyle={styles.container}
      featuredSubtitle={"COMBAT"}
      featuredSubtitleStyle={styles.subTitle}
    >
    </Card>
      //<Image style={styles.image} source={{uri: props.url}} />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  button: {
      margin: 5,
      padding: 5,
      width: Dimensions.get("window").width - 10,
      borderWidth: 1,
      borderRadius: 10,
      alignSelf: "stretch",
      backgroundColor: "rgba(255,255,255, .8)",
    },
  subTitle: {
    fontSize: Dimensions.get("window").height / 10,
    padding: 5,
    opacity: 0.3,
  },
  image: {
    resizeMode: "contain",
    height: Dimensions.get("window").height - 120,
    width: Dimensions.get("window").width - 32,
    padding: 5,
  },
});

  export default CategoryImage;