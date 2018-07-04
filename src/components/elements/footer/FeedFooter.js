import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';

const FeedFooter = (props) => {
    return (
        <Footer>
            <FooterTab style={{backgroundColor:"#324291"}}>
                <Button onPress={() => { props.onPress && props.onPress() }}>
                    <Icon type="FontAwesome" name="plus" />
                </Button>
            </FooterTab>
        </Footer>
    );
};
export default FeedFooter;
