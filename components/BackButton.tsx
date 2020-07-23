import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";


const BackButton = (props) => {
    const resetObject = {id: '00000000-0000-0000-0000-000000000000'};
    const emptyObject = {};
    
    const goBack = (value) => {
        props.callBack(value);
    };

    return(
        <View>
            <TouchableOpacity
                onPress={() => goBack(props.refresh ? resetObject : emptyObject)}
            >
                <Text style={props.style}>{props.name}</Text>
            </TouchableOpacity>
            {/* <Button
            onPress={() => goBack(props.refresh ? resetObject : emptyObject)}
            title={props.name}
        /> */}
        </View>
    );
}


export default BackButton