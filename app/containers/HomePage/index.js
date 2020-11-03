/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { fetchInfo } from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

function RepoList(props) {
  return (
    <List>
      {props.data.map(repo => (
        <ListItem alignItems="flex-start">
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {repo.name}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const { data, loading } = props.homePage;

  const [username, setUsername] = useState('');

  return (
    <div className="d-flex w-100 mt-5 align-items-center">
      <TextField
        className="ml-5"
        id="outlined-basic"
        label="Username"
        variant="outlined"
        value={username}
        onChange={e => {
          setUsername(e.target.value);
        }}
      />

      <Button
        className="ml-5"
        variant="contained"
        color="primary"
        disabled={username.length < 2 || loading}
        onClick={() => {
          props.dispatch(fetchInfo(username));
        }}
      >
        Primary
      </Button>

      <RepoList data={data} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
