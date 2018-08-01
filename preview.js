import React from 'react';
import ReactDOM from 'react-dom';
import Test from './index.js';

const customSettings = {
  dataSource: './json/data1.json',
  // dataSource: [
  //       {
  //     "guaranteed": true, // {boolean}
  //     "date": "2017/07/01", // {string} YYYY/MM/DD
  //     "price": "234567", // {string|number} XXXXXX | 近期上架
  //     "availableVancancy": 0, // {number}
  //     "totalVacnacy": 20, // {number}
  //     "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
  //   }, {
  //     "guaranteed": true, // {boolean}
  //     "date": "2017/07/02", // {string} YYYY/MM/DD
  //     "price": "234567", // {string|number} XXXXXX | 近期上架
  //     "availableVancancy": 0, // {number}
  //     "totalVacnacy": 20, // {number}
  //     "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
  //   },
  // ],
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
  <Test
    ref={app => {
      window.app = app;
    }}
    config={customSettings}
  />,
  document.getElementById('app'),
);
