import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFoodData } from './actionCreator';
import AppFeed from '../elements/feed/AppFeed';
import { myFetch } from '../../api/utils';
import { GET_MY_SUB, SUBSCRIBE_TOPIC, UNSUBSCRIBE_TOPIC } from '../../api/api';
import { showToast } from '../toast/rafToast';
import { errorToast } from '../toast/consts';
import { FOOD_TYPE } from '../../const';
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
            let result = await myFetch(GET_MY_SUB, { method: 'POST' }, { category: FOOD_TYPE });
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
    _toggleSubscription = async () => {
        try {
            let result = null;
            console.log('Is subbed', this.state.subscriptionStatus)
            if (this.state.subscriptionStatus.subbed) {
                result = await myFetch(UNSUBSCRIBE_TOPIC, { method: 'POST' }, { category: FOOD_TYPE });
            } else {
                result = await myFetch(SUBSCRIBE_TOPIC, { method: 'POST' }, { category: FOOD_TYPE });
            }
            if (result.ok) {
                this._getSubscriptionStatus();
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
                toggleSubscription={this._toggleSubscription}
                subbed={this.state.subscriptionStatus}
                loading={this.props.loading}
                items={this.props.items}
                category={FOOD_TYPE}
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
