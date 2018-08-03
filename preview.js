import React from 'react';
import ReactDOM from 'react-dom';
import Entry from './index.js';

const customSettings = {
  dataSource: './json/data1.json',
  // dataSource: [
  //       {
  //     "guaranteed": true, // {boolean}
  //     "date": "2017/09/05", // {string} YYYY/MM/DD
  //     "price": "234567", // {string|number} XXXXXX | 近期上架
  //     "availableVancancy": 0, // {number}
  //     "totalVacnacy": 20, // {number}
  //     "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
  //   }, {
  //     "guaranteed": true, // {boolean}
  //     "date": "2017/09/14", // {string} YYYY/MM/DD
  //     "price": "234567", // {string|number} XXXXXX | 近期上架
  //     "availableVancancy": 0, // {number}
  //     "totalVacnacy": 20, // {number}
  //     "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
  //   }, {
  //     "guaranteed": true, // {boolean}
  //     "date": "2017/09/17", // {string} YYYY/MM/DD
  //     "price": "234567", // {string|number} XXXXXX | 近期上架
  //     "availableVancancy": 0, // {number}
  //     "totalVacnacy": 20, // {number}
  //     "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
  //   }, {
  //     "guaranteed": true, // {boolean}
  //     "date": "2017/09/23", // {string} YYYY/MM/DD
  //     "price": "234567", // {string|number} XXXXXX | 近期上架
  //     "availableVancancy": 0, // {number}
  //     "totalVacnacy": 20, // {number}
  //     "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
  //   }
  // ],
  initYearMonth: '201709',
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
  onClickNext(data) {
    console.log(data);
  },
  onClickDate(data) {
    console.log(data);
  },
};

window.calendar = ReactDOM.render(
  <Entry
    ref={app => {
      window.app = app; //window.app 
    }}
    config={customSettings}
  />,
  document.getElementById('app'),
);

