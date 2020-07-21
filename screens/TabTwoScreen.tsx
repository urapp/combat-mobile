import React, { useState, useEffect } from "react";
import { View } from "../components/Themed";
import { StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";

import RefreshButton from '../components/RefreshButton';
import CategoryListItem from "../components/CategoryListItem";
import getEntityTypes from "./../data/getEntityTypes";
import getCategories from "./../data/getCategories";

export default function TabTwoScreen() {
  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const [propertyId, setPropertyId] = useState(emptyGuid);
  const [loading, setLoading] = useState(false);
  const [entityTypes, setEntityTypes] = useState({});
  const [categories, setCategories] = useState({});

  const getEntityTypesData = async () => {
    const entityTypesResult = await getEntityTypes();
    setEntityTypes(entityTypesResult.sort((a, b) => a.rank - b.rank));
    console.log("ORDER: ", entityTypesResult.sort((a, b) => a.rank - b.rank));
    const topEntityType = entityTypesResult.sort((a, b) => a.rank - b.rank)[0];
    console.log("topEntityType: ", topEntityType);
    if(propertyId === emptyGuid){
      getCategoriesData('EntityTypeId', topEntityType?.id)
    }
    else{
      getCategoriesData('ParentId', propertyId);
    }
  };

  const getCategoriesData = async (properyName: string, propertyId: any) => {
    const categoriesResult = await getCategories(properyName, propertyId);
    setCategories(categoriesResult.sort((a, b) => a.rank - b.rank));
  };

  useEffect(() => {
    setLoading(true);
    getEntityTypesData();
    setLoading(false);
  }, [propertyId]); 

  const successCallBackData = (data) => {
    if(Object.entries(data).length > 0){
      setPropertyId(data?.id);
    }
  };

  const restart = () =>{
    setPropertyId(emptyGuid);
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
          {/* <ScrollView 
            horizontal={true} 
            pagingEnabled={true}
            refreshControl={
              <RefreshControl 
                refreshing={loading}
                onRefresh={restart} 
              />
            }
          > */}
            <CategoryListItem 
              callBack={successCallBackData}
              categories={categories}
              entityTypes={entityTypes}
              entityTypeId={propertyId}
              loading={loading}
            />

          {/* </ScrollView> */}
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
