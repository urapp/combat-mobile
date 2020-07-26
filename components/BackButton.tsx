import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const BackButton = (props) => {
    const resetObject = {id: '00000000-0000-0000-0000-000000000000'};
    const emptyObject = {};
    
    const goBack = (value) => {
        props.callBack(value);
    };
    
    if(props.image){
        return(
            <View>
                <TouchableOpacity
                    onPress={() => goBack(props.refresh ? resetObject : emptyObject)}
                >
                    <Image style={styles.image} source={props.image} />
                </TouchableOpacity>
            </View>
        );
    }else{
        return(
            <View>
                <TouchableOpacity
                    onPress={() => goBack(props.refresh ? resetObject : emptyObject)}
                >
                    <Text style={props.style}>{props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        margin: 1,
        height: 60,
        width: 60,
    },
  });

export default BackButton