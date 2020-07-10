import * as React from 'react';
import { StyleSheet, Image, Dimensions} from 'react-native';

import imageIcon from "../assets/images/combatIcon.png"

const style = StyleSheet.create({
    image: {
        flex: 1,
        width: 50,
        margin: 10,
        resizeMode: 'contain'
    }
});

const Logo = () => {
    return <Image style={style.image} source={imageIcon} />
}

export default Logo;