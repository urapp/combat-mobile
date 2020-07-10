import * as React from 'react';
import { StyleSheet, Image, Dimensions} from 'react-native';

import imageLogo from "../assets/images/combatLogo.png"

const style = StyleSheet.create({
    image: {
        flex: 1,
        width: Dimensions.get("window").width - 20,
        resizeMode: 'contain'
    }
});

const Logo = () => {
    return <Image style={style.image} source={imageLogo} />
}



export default Logo;