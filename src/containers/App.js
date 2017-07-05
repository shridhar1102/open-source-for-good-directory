import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkUser, fetchGithubData, setSearch, setSortBy } from '../actions';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Search from '../components/Search';
import SortMenu from '../components/SortMenu';
import Main from '../components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    const { checkUser, fetchGithubData, repos } = this.props;
    checkUser();
    repos.map(repo => fetchGithubData(repo.name));
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.setSearch(value);
  }

  handleSort(e) {
    const mode = e.currentTarget.value;
    this.props.setSortBy(mode);
  }

  render() {
    const {
      isDev,
      isFetching,
      repos,
      search,
      sortBy,
      tagFilters
    } = this.props;
    return (
      <div className='app'>
        <Header />
        <Banner />
        <Testimonial />
        <Search onChange={this.handleChange} search={search} />
        <SortMenu setSortBy={this.handleSort} />
        <Main
          isDev={isDev}
          isFetching={isFetching}
          repos={repos}
          search={search}
          sortBy={sortBy}
          tagFilters={tagFilters}
        />
      </div>
    );
  }
}

App.propTypes = {
  checkUser: PropTypes.func,
  fetchGithubData: PropTypes.func,
  isDev: PropTypes.bool,
  isFetching: PropTypes.bool,
  repos: PropTypes.array,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string,
  tagFilters: PropTypes.array
};

const mapStateToProps = state => {
  const { isDev, isFetching, repos, search, sortBy, tagFilters } = state;
  return {
    isDev,
    isFetching,
    repos,
    search,
    sortBy,
    tagFilters
  };
};

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(checkUser()),
  fetchGithubData: repo => dispatch(fetchGithubData(repo)),
  setSearch: value => dispatch(setSearch(value)),
  setSortBy: mode => dispatch(setSortBy(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
