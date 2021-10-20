/**
 * 入口文件
 */

// 样式文件
import './index.less';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Satge from './components/Stage';

ReactDOM.render(<Satge />, document.querySelector('#app'));