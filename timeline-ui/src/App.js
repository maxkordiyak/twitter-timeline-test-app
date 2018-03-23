import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import Nav from './components/Nav';
import { Grid, Cell, Toolbar, ToolbarRow, ToolbarSection } from 'react-mdc-web/lib';
import Routes from './Routes';
import logo from './img/logo.png';
import { logout } from './actions';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Toolbar className="main-toolbar">
                <ToolbarRow className="main-toolbarRow">
                    <ToolbarSection className="main-toolbarSection" align="start">
                        <Link to="/">
                            <img className="logo" src={logo} alt="Twitter Timeline Logo"/>
                        </Link>
                    </ToolbarSection>
                    <ToolbarSection className="main-toolbarSection" align="end">
                        <Nav logout={this.props.logout}
                             isAuthenticated={this.props.isAuthenticated}/>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>

            <main>
                <div className="search-title">
                    <h1>Search user's timeline by their username</h1>
                </div>
                <Grid className="centered-grid">
                    <Cell col={12}>
                        <Routes />
                    </Cell>
                </Grid>
            </main>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));