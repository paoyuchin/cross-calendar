import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const customSettings = {
  dataSource: './json/data1.json',
  initYearMonth: '201707',
  dataKeySetting: {
    guaranteed: 'guaranteed',
    available: 'availableVancancy',
    status: 'status',
    total: 'totalVacnacy',
    price: 'price',
  },
  onClickPrev(data) {
    console.log(data);
  },
  // onClickNext(getMonthInfo) {
  //   console.log(getMonthInfo);
  // },
  onClickDate(data) {
    console.log(data);
  },
};
// [{
//   "guaranteed": true, // {boolean}
//   "date": "2017/07/01", // {string} YYYY/MM/DD
//   "price": "234567", // {string|number} XXXXXX | 近期上架
//   "availableVancancy": 100, // {number}
//   "totalVacnacy": 20, // {number}
//   "status": "報名" // {string} 報名 | 後補 | 預定 | 截止 | 額滿 | 關團
// },
//   // ...
// ]

ReactDOM.render(
  <App
    ref={app => {
      window.app = app;
    }}
    config={customSettings}
  />,
  document.getElementById('app'),
);
