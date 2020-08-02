import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator, RefreshControl, Modal, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {API_URL} from './../env.json';

import CategoryButton from './CategoryButton';
import CategoryImage from './CategoryImage';

const CategoryListItem = (props) => {
  const emptyGuidObj = {id:'00000000-0000-0000-0000-000000000000'};
  const [loading, setLoading] = useState(false);

  const refhresing = () => {
    props.callBack(emptyGuidObj);
  }

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

  const entityTypeId = props.categories.slice(-1)[0]?.entityTypeId;
  const lastEntityType = props.entityTypes.sort((a, b) => a.rank - b.rank).slice(-1)[0].id;
  const entityName = props.entityTypes.find((item) => item.id == entityTypeId).name;

  if(entityTypeId === lastEntityType){
    const images = [];
    const urlImages = `${API_URL}/Resources/Images/`;
     Object.keys(props.categories).map( (key, index) => 
      images.push(
        { key:index.toString(), 
          url:urlImages + props.categories[key].image,
          name:props.categories[key].name,
          description:props.categories[key].description}
      )
    );
    return(
        
        <View style={styles.container} >
          <FlatList
          // refreshControl={
          //   <RefreshControl 
          //     refreshing={loading}
          //     onRefresh={refhresing} 
          //   />
          // }
          data={images}
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled
          decelerationRate='fast'
          renderItem={({item}) => {
            return(
              <CategoryImage
                callBack={successCallBackData}
                url={item.url}
                description={item.description}
              />                
            )
          }}
        />
        </View>        
    )
  }
  else if(true)
  return(
      <View style={styles.container}>
        <Text style={styles.title}>{entityName}</Text>
        <FlatList
          refreshControl={
            <RefreshControl 
              refreshing={loading}
              onRefresh={refhresing} 
            />
          }
          data={props.categories}
          style={styles.flatList}
          renderItem={({item}) => {
            return(
              <CategoryButton
                callBack={successCallBackData}
                category={item}
              />
            )
          }}
        />
      </View>      
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
    marginTop: 5
  },
  flatList: {
    flex: 1,
  },
});

export default CategoryListItem;
