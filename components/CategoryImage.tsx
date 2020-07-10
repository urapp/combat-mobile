import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Card } from "react-native-elements";

import {API_URL} from '../env.json';

const CategoryImage = (props) => {
  let categoryId = props?.category?.id;
  let categoryName = props?.category?.name;
  let imageUrl = `${API_URL}/Resources/Images/`;
  let categoryImage = imageUrl + props?.category?.image;
  let category = props?.category;

  const goBack = (value) => {
    props.callBack(value);
  };
  
  return(
    <Image style={styles.image} source={{uri: categoryImage}} />
  );
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        padding: 5,
        width: Dimensions.get("window").width - 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "stretch",
        backgroundColor: "rgba(255,255,255, .8)",
      },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 5
    },
    image: {
        margin: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    },
  });

  export default CategoryImage;