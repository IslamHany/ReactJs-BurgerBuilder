import React, {useEffect, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';
const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});
const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});
const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});
const App = props => {
    useEffect(() => {
        props.onTryAutoSignUp();
    }, []);
        let routes = (
            <Switch>
                <Route path='/' exact component={BurgerBuilder} />
                <Route path='/auth' render={(props)=><Auth{...props}/>} />
                <Redirect to="/"/>
            </Switch>
        );
        if(props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/checkout' render={(props) => <Checkout {...props}/>} />
                    <Route path='/orders' render={(props) => <Orders {...props}/>} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' render={(props)=><Auth{...props}/>} />
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    <Suspense fallback={<Spinner />}>
                        {routes}
                    </Suspense>
                </Layout>
            </div>
        );
}
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return{
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
