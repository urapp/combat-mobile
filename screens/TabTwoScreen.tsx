import React, { useState, useEffect } from "react";
import { View } from "../components/Themed";
import { StyleSheet, ActivityIndicator, SafeAreaView, Alert, BackHandler } from "react-native";

import BackButton from '../components/BackButton';
import CategoryListItem from "../components/CategoryListItem";
import getEntityTypes from "./../data/getEntityTypes";
import getCategories from "./../data/getCategories";
import backButtonImage from "../assets/images/backButton.png";
import {CacheManager} from "react-native-expo-image-cache";

export default function TabTwoScreen({ navigation }) {
  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const [propertyId, setPropertyId] = useState(emptyGuid);
  const [loading, setLoading] = useState(false);
  const [entityTypes, setEntityTypes] = useState({});
  const [categories, setCategories] = useState({});
  const [theArray, setTheArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        theArray.length > 0 &&
        <BackButton
        callBack={backButtonClick}
        image={backButtonImage}
        refresh={false}
        style={styles.backButton}
      />
      ),
    });
    if(theArray.length > 0){
      const backAction = () => {
        backButtonClick();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }
    else{
      CacheManager.clearCache();
    }
  }, [theArray]);

  useEffect(() => {
    setLoading(true);
    getEntityTypesData();
    setLoading(false);   
  }, [propertyId]);

  const getEntityTypesData = async () => {
    const entityTypesResult = await getEntityTypes();
    setEntityTypes(entityTypesResult.sort((a, b) => a.rank - b.rank));
    const topEntityType = entityTypesResult.sort((a, b) => a.rank - b.rank)[0];
    
    if(propertyId === emptyGuid){
      getCategoriesData('EntityTypeId', topEntityType?.id);
    }
    else{
      getCategoriesData('ParentId', propertyId);
    }
  };

  const getCategoriesData = async (properyName: string, propertyId: any) => {
    let categoriesResult = await getCategories(properyName, propertyId);
    categoriesResult = categoriesResult.sort((a, b) => a.rank - b.rank);
    setCategories(categoriesResult);
  };

  const successCallBackData = (data) => {
    if(Object.entries(data).length > 0){
      if(data.id === emptyGuid){
        setTheArray([]);
      }
      else{
        setTheArray(theArray => [...theArray, data?.id]);
      }
      setPropertyId(data?.id);
    }
  };

  const backButtonClick = () => {
    let lastBack = theArray.slice(-1)[0];
    let newarray = theArray.filter((e)=>(e !== lastBack));
    let lastInArray = newarray.slice(-1)[0];
    setTheArray(theArray.filter((e)=>(e !== lastBack)));
    if(lastInArray === undefined){
      setPropertyId(emptyGuid);
      return;
    }
    setPropertyId(lastInArray);
  };

  if(Object.entries(categories).length === 0){
    return (
      <>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      <CategoryListItem 
        callBack={successCallBackData}
        categories={categories}
        entityTypes={entityTypes}
        entityTypeId={propertyId}
        loading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
  },
  backButton: {
    textAlign: "center",
    padding: 3,
    borderColor: "#000",
    borderWidth: 0,
    borderRadius: 10,
    fontSize: 30,
  },
  refreshButton: {
    margin: 5,
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  }
});
