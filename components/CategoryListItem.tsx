import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ImageSlider from 'react-native-image-slider';
import {API_URL} from './../env.json';

import CategoryButton from './CategoryButton';
import CategoryImage from './CategoryImage';

const CategoryListItem = (props) => {
  const goBack = (value) => {
    props.callBack(value);
  };

  const successCallBackData = (value) => {
    goBack(value);
  };

  if(Object.entries(props.categories).length === 0
    || Object.entries(props.entityTypes).length === 0)
  {
    return <ActivityIndicator size="large" />
  }

  const entityTypeId = props.categories[0]?.entityTypeId;
  const lastEntityType = props.entityTypes.slice(-1)[0].id;

  if(entityTypeId === lastEntityType){
    const urlImages = `${API_URL}/Resources/Images/`;
    const images = Object.keys(props.categories).map(key => urlImages + props.categories[key].image);
    return(
        <View style={styles.container} >
          <Text style={styles.title}>{props?.entityType?.name}</Text>
          {/* <FlatList
            data={props.categories}
            horizontal={true}
            renderItem={({item}) => {
              return(
                <CategoryImage
                callBack={successCallBackData}
                category={item}
               />
              )
            }}
          /> */}
          <ImageSlider
            dotColor={"black"}
            dotStyle={styles.dot}
            images={images}
          />
        </View>        
    )
  }
  else if(true)
  return(
    <>
      <Text style={styles.title}>{props?.entityType?.name}</Text>
      <FlatList
        data={props.categories}
        renderItem={({item}) => {
          return(
            <CategoryButton
              callBack={successCallBackData}
              category={item}
             />
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex"
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  dot: {
    width: 50,
    height: 50,
    backgroundColor: "orange",
  },
  });

export default CategoryListItem;
