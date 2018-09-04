import React, { Component } from 'react';
import { navigate } from '../router/NavigationService';
import { connect } from 'react-redux';
import { getFoodData } from './actionCreator';
import AppFeed from '../elements/feed/AppFeed';
import { myFetch } from '../../api/utils';
import { GET_MY_SUB } from '../../api/api';
import { showToast } from '../toast/rafToast';
import { errorToast } from '../toast/consts';
class FoodFeed extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            subscriptionStatus: {
                loading: true,
                subbed: false,
            }
        }
    }

    _getSubscriptionStatus = async () => {
        try {
            let result = await myFetch(GET_MY_SUB, { method: 'POST' }, { category: this.props.category });
            console.log('resultat sub', result);
            if (result.ok) {
                this.setState({
                    subscriptionStatus: {
                        loading: false,
                        subbed: result.sub != null
                    }
                })
            }
        } catch (error) {
            console.error(error);
            showToast(errorToast());
        }

    }

    componentDidMount() {
        if (this.props.items.length <= 0) {
            this.props.getData();
        }
        this._getSubscriptionStatus();
    }

    render() {
        return (
            <AppFeed
                subbed={this.state.subscriptionStatus}
                loading={this.props.loading}
                items={this.props.items}
                category={'Food'}
                title={'Tasty and we love it!'}
            />
        )
    }
}

mapStateToProps = (state) => {
    let { food } = state.food;
    return {
        ...food
    }
}
mapDispatchToProps = (dispatch) => {
    return {
        getData: (data) => (dispatch(getFoodData(data))),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FoodFeed);
