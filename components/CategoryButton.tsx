import React, { useState, useContext }  from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import { TouchableHighlight} from 'react-native-gesture-handler';

import {API_URL} from '../env.json';

const CategoryButton = (props) => {
  let categoryId = props?.category?.id;
  let categoryName = props?.category?.name;
  let imageUrl = `${API_URL}/Resources/Images/`;
  let categoryImage = imageUrl + props?.category?.image;
  let category = props?.category;

  const goBack = (value) => {
    props.callBack(value);
  };
  
  return(
    <>
        <TouchableHighlight style={styles.button}
          onPress={() => goBack(category)}
          underlayColor="#2196F3">
            <View style={styles.row}>
                <Image style={styles.buttonImage} source={{uri: categoryImage}} />
                <Text style={styles.buttonText} key={categoryId}>{categoryName}</Text>
            </View>
        </TouchableHighlight>
    </>
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
    buttonImage: {
        margin: 1,
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        backgroundColor: "white"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
  });

  export default CategoryButton;