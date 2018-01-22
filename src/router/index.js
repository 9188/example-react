import React from 'react'
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';

import nav from './nav'

const loading = require('../constant/img/loading.gif')

dynamic.setDefaultLoadingComponent(() => {
  return <div style={{position:'absolute', top:0, bottom:0, left:0, right:0, display:'flex', justifyContent:'center', alignItems:'center'}}><img src={loading}/></div>
});

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});


function getPlainNode(nodeList, app) {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.component = dynamicWrapper(app, item.redux, item.component)
    item.path = `${''}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    delete item.redux
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}



function RouterConfig({ history, app }) {

  return (
    <Router history={history}>
      <Switch>
        {
          nav.map((item, i)=>{
            const Page = dynamicWrapper(app, item.redux, item.component)

            const passProps = {
              app,
              routeData: item.children,
              dynamicWrapper
            };

            return <Route path="/" key={i} render={props => <Page {...props} {...passProps} />} />
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
