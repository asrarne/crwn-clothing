import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user-actions";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userSnap = await createUserProfileDocument(userAuth);
        this.props.setCurrentUser({
          id: userSnap.id,
          ...userSnap.data()
        });
        // this.setState({
        //   currentUser: {
        //     id: userSnap.id,
        //     ...userSnap.data()
        //   }
        // });
        // console.log('history.location.pathname: ', this.props.history.location.pathname);
        // console.log('this.props.history: ', this.props.history);
        if (this.props.history.location.pathname === '/signin') {
          this.props.history.push('/');
        }
        // console.log(this.state.currentUser)
      } else {
        // this.setState({ currentUser: userAuth });
        this.props.setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  // currentUser={this.state.currentUser}
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect (null, mapDispatchToProps)(withRouter(App));
// withRouter