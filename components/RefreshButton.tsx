import React from "react";
import { View, Button, StyleSheet } from "react-native";


const RefreshButton = (props) => {

    const goBack = (value) => {
    props.callBack(value);
    };

    const restart = {id:'00000000-0000-0000-0000-000000000000'};

    return(
        <View style={styles.container}>
            <Button
            onPress={() => goBack(restart)}
            title="Refresh"
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
 });


export default RefreshButton