import React from 'react';
import { ImageBackground } from 'react-native';


export default BackgroundView = (props) => {
    return (
        <ImageBackground style={[{ flex: 1 }, props.style]} source={require('../../../../assets/img/background.png')}>
            {props.children}
        </ImageBackground>
    )
}