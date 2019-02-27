
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import style from 'Less/index.less'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){

  }
  componentWillUnmount(){
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className={style['root-wrap']}>
          {this.props.children}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

const getState = (state) => {
  return state ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(AppComponent);
