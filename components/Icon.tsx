import * as React from 'react';
import { StyleSheet, Image, Dimensions, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: 50,
        margin: 10,
        resizeMode: 'contain'
    }
});

const Logo = (props) => {
    const resetObject = {id: '00000000-0000-0000-0000-000000000000'};
    const emptyObject = {};
    
    const goBack = (value) => {
        props.callBack(value);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => goBack(props.refresh ? resetObject : emptyObject)}
            >
                <Image style={styles.image} source={props.image} />
            </TouchableOpacity>
        </View>
    )
}

export default Logo;