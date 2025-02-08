import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemLists from './components/Lists';
import ItemDetails from './components/Details';
import { Stack, Text } from '@fluentui/react';

export const App: React.FunctionComponent = () => {
  return (
    <>
      <Stack
        horizontalAlign="center"
        styles={{ root: { margin: '1rem' } }}
        >
        <Text variant="xxLargePlus">Indian cuisine</Text>
      </Stack>
      <Switch>
        <Route path="/" exact component={ItemLists} />
        <Route path="/dish/:dishId" component={ItemDetails} />
      </Switch>
    </>
  );
};
