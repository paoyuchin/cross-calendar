import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const customSettings = {
  dataSource: './json/data1.json',
  initYearMonth: '201707',
  dataKeySetting: {
    guaranteed: 'guaranteed',
    status: 'status',
    available: 'availableVancancy',
    total: 'totalVacnacy',
    price: 'price',
  },
  onClickPrev(data) {
    console.log(data);
  },
  onClickNext(getMonthInfo) {
    console.log(getMonthInfo);
  },
  onClickDate(data) {
    console.log(data)
  },
};


ReactDOM.render(
  <App
    ref={app => {
      window.app = app;
    }}
    config={customSettings}
  />,
  document.getElementById('app'),
);
