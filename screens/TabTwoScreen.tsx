import React, { useState, useEffect } from "react";
import { View } from "../components/Themed";
import { StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, RefreshControl } from "react-native";

import RefreshButton from '../components/RefreshButton';
import CategoryListItem from "../components/CategoryListItem";
import getEntityTypes from "./../data/getEntityTypes";
import getCategories from "./../data/getCategories";

export default function TabTwoScreen() {
  const start = '00000000-0000-0000-0000-000000000000';
  const [propertyId, setPropertyId] = useState(start);
  const [loading, setLoading] = useState(false);
  const [entityTypes, setEntityTypes] = useState({});
  const [categories, setCategories] = useState({});

  const getEntityTypesData = async () => {
    const entityTypesResult = await getEntityTypes();
    setEntityTypes(entityTypesResult);
  };

  const getCategoriesData = async (properyName: string, propertyId: any) => {
    const categoriesResult = await getCategories(properyName, propertyId);
    setCategories(categoriesResult);
  };

  useEffect(() => {
    setLoading(true);
    getEntityTypesData();
    if(propertyId === start){
      getCategoriesData('EntityTypeId', '83c29baf-19a5-44ee-a883-44d9bb7b780c')
    }
    else{
      getCategoriesData('ParentId', propertyId);
    }
    setLoading(false);
  }, [propertyId]); 

  const successCallBackData = (data) => {
    if(Object.entries(data).length > 0){
      setPropertyId(data?.id);
    }
  };

  const restart = () =>{
    setPropertyId(start);
  }

  if(Object.entries(categories).length === 0){
    return (
      <>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>        
        <RefreshButton callBack={successCallBackData} />
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
          <ScrollView 
            horizontal={true} 
            pagingEnabled={true}
            refreshControl={
              <RefreshControl 
                refreshing={loading}
                onRefresh={restart} 
              />
            }
          >
            <CategoryListItem 
        callBack={successCallBackData}
        categories={categories}
        entityTypes={entityTypes}
        loading={loading}
      />

          </ScrollView>
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
});
