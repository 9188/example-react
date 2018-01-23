import React from 'react'

import { Carousel, Icon } from 'antd-mobile';

import styles from './index.scss'

export default class Home extends React.Component {
  state = {
    data: [ '20160607030534209.jpg', '20090122145454_98994_9RDR.gif', '001P1kCfzy78jbkaHWT3f&690.gif'],
    imgHeight: 300,
  }
  componentDidMount() {
   
  }
  render() {
    return (
      <div className={styles.home}>
        <Carousel
          autoplay={true}
          infinite
          selectedIndex={0}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://5.9188.com/new/"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`http://ov0zo91tq.bkt.clouddn.com/${val}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <div className={styles.sub_title}>
          <img src={require('./img/1.png')}/>
          <Carousel className={styles.my_carousel}
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
        >
          <div className="v-item">我看过沙漠下暴雨</div>
          <div className="v-item">看过大海轻吻鲨鱼</div>
          <div className="v-item">看过黄昏追逐黎明</div>
          <div className="v-item">没看过你</div>
        </Carousel>
      </div>
      </div>
    );
  }
}

