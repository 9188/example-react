import React from 'react'
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { Link, Route, Redirect, Switch } from 'dva/router';
import NotFound from '../pages/404'

import styles from './basic.scss'

export default class Basic extends React.PureComponent {
  render() {
    const { routeData, app, dynamicWrapper } = this.props;

    const content = (
        <div className={styles.body}>
            <div className={styles.content}>
              <Switch>
                {
                  routeData.map(item =>{
                    let component = dynamicWrapper(app, item.redux, item.component);
                    return (
                      <Route
                        exact={true}
                        key={item.path}
                        path={item.path}
                        component={component}
                      />
                    )
                  })
                }
                <Redirect exact from="/" to="/home" />
                <Route component={NotFound} />
              </Switch>
            </div>
            <div className={styles.tabbar}>
              <Link to={'/home'}>首页</Link>
              <Link to={'/space'}>空间</Link>
              <Link to={'/time'}>时间</Link>
              <Link to={'/user'}>用户</Link>
            </div>
        </div>
    );

    return (
      <DocumentTitle title={"react模板 - 9188cli"}>
        <div>{content}</div>
      </DocumentTitle>
    )
  }
}

// export default connect(state => ({
  
// }))(Basic);