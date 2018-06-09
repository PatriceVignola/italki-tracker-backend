/* @flow */

import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import environment from './relay/environment';

function App() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query AppQuery {
          user {
            id,
          }
        }
      `}
      variables={{}}
      render={({error, props}) => {
        if (error) {
          return <div>Error!</div>;
        }

        if (!props) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            User ID: {props.user.id}
          </div>
        );
      }}
    />
  );
}

export default App;
