import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Container, Header, Content, Form } from 'native-base';
import BackgroundView from '../elements/view/BackgroundView';

class UserDetails extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            bio: ''
        }
    }

    setBio = (text) => {
        this.setState({ bio: text });
    }

    render() {
        return (
            <Container>
                <BackgroundView>
                    <Header transparent>
                        <Text> User details </Text>
                    </Header>
                    <Content contentContainerStyle={style.content}>
                        <ScrollView>
                            <View style={{backgroundColor: 'purple' }}>
                                <Text> Upload your profile picture </Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'green' }}>
                                <Form>
                                    <Item>
                                        <Label floatingLabel> Username </Label>
                                        <Input disabled={true} value={this.props.user.username} />
                                    </Item>
                                    <Item>
                                        <Label floatingLabel> Email </Label>
                                        <Input disabled={true} value={this.props.user.email} />
                                    </Item>
                                    <Item>
                                        <Label floatingLabel> Bio </Label>
                                        <Input value={this.state.bio} onChangeText={this.onChangeBio} />
                                    </Item>
                                    <Item>
                                        <Label floatingLabel> New Password </Label>
                                        <Input value={this.state.newPassword} />
                                    </Item>
                                    <Item>
                                        <Label floatingLabel> Confirm new password </Label>
                                        <Input value={this.state.confirmNewPasswordk} />
                                    </Item>
                                </Form>
                            </View>
                        </ScrollView>
                    </Content>
                </BackgroundView>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
});

mapStateToProps = (state) => {
    let { auth } = state.auth;
    return {
        ...auth,
    }
}

mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default UserDetails;