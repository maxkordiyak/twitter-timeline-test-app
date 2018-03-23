import React, { Component } from 'react';
import { connect } from "react-redux";
import SearchForm from '../../components/Search/SearchForm';
import SearchResults from '../../components/Search/SearchResults';
import LoadingSpinner from '../../components/Loading';
import { getUserTimeline } from '../../actions';

class SearchPageContainer extends Component {
    render() {
        let isLoading = this.props.isLoading;
        return(
            <div>
                <SearchForm
                    getUserTimeline={(data) => this.props.getUserTimeline(data)}
                    errorMessage={this.props.errorMessage}
                />
                {
                    isLoading ?
                        (
                            <LoadingSpinner />
                        ) : (
                            <SearchResults
                                timeline={this.props.timeline}
                                getUserTimeline={(data) => this.props.getUserTimeline(data)}
                            />
                        )
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        timeline: state.user.timeline,
        isLoading: state.user.isLoading,
        errorMessage: state.user.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserTimeline: data => dispatch(getUserTimeline(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);