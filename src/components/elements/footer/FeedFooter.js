import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { DEFAULT_FONT_COLOR } from '../../../styles/style';

const FeedFooter = (props) => {
    return (
        <Footer>
            <FooterTab style={{backgroundColor:DEFAULT_FONT_COLOR}}>
                <Button onPress={() => { props.onPress && props.onPress() }}>
                    <Icon type="FontAwesome" name="plus" />
                </Button>
            </FooterTab>
        </Footer>
    );
};
export default FeedFooter;
