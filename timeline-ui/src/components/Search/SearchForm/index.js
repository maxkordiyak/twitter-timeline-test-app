import React, { Component } from 'react';
import { MDCTextField, MDCTextFieldFoundation } from '@material/textfield/dist/mdc.textfield';
import { Grid, Cell, Button } from 'react-mdc-web/lib';
import '../index.css';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const textfield = new MDCTextField(this.refs.searchField);
        const foundation = new MDCTextFieldFoundation(this.refs.searchField)
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.username) { return false; }
        this.props.getUserTimeline(this.state.username);
    }

    render() {
        let errorMsg = null;
        if (this.props.errorMessage) {
            errorMsg =
                <div className="timeline-errorMessage">
                    <p>An error occured. Message: </p>
                    <p>{this.props.errorMessage}</p>
                </div>;
        };

        return(
            <div>
                <form className="form-horizontal col-sm-6" onSubmit={this.onSubmit}>
                    <p>Enter a username:</p>
                    <Grid className="search-grid">
                        <Cell col={8}>
                            <div className="mdc-text-field mdc-text-field--fullwidth contact__textfield" ref='searchField'>
                                <input type="text"
                                       required
                                       id="username"
                                       className="mdc-text-field__input"
                                       name="username"
                                       placeholder="Username"
                                       value={this.state.username}
                                       onChange={({target : {value : username}}) => {
                                           this.setState({ username })
                                       }}
                                />
                                <div className="mdc-text-field__bottom-line"></div>
                            </div>
                        </Cell>
                        <Cell col={4} className="search-col">
                            <Button raised className="search-button" type="submit">Search</Button>
                        </Cell>
                    </Grid>
                    {errorMsg}
                </form>
            </div>
        )
    }
};

export default SearchForm;