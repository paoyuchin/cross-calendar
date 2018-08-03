import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import moment from 'moment/src/moment';
import ControlTab from './ControlTab';
import Board from './Board';
import style from '../css.scss';
import classnames from 'classnames';
import DayNode from './DayNode';

const ModuleDefaults = {
  dataSource: [
    // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
    {
      guaranteed: true, // {boolean}
      date: '2016/12/15', // {string} YYYY/MM/DD
      price: '234567', // {string|number} XXXXXX | 近期上架
      availableVancancy: 0, // {number}
      totalVacnacy: 20, // {number}
      status: '報名', // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
    },
  ],
  // 輸入一開始要在哪一個月份 [string] YYYYMM
  // 若輸入的年月沒有資料，就要找相近的年月
  // 若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
  initYearMonth: '201807',
  // 設定各資料的key
  dataKeySetting: {
    // 保證出團
    guaranteed: 'guaranteed',
    // 狀態
    status: 'status',
    // 可賣團位
    available: 'availableVancancy',
    // 團位
    total: 'totalVacnacy',
    // 價格
    price: 'price',
  },
  // 點上一個月時
  // @param $btn {$object} jquery 物件
  // @param $data {array} 上一個月的資料
  // @param module {object} 此模組實例物件
  // console.log($btn, data, module);
  onClickPrev(data) {
    console.log(data);
  },
  // 點下一個月時
  onClickNext(data) {
    console.log(data);
  },
  // 點日期時
  onClickDate(data) {
    console.log(data);
  },
};

class App extends React.Component {
  //1
  constructor(props) {
    super(props);
    this.option = Object.assign(ModuleDefaults, this.props.config);

    this.data = {};
    this.state = {
      currentYearMonth: this.option.initYearMonth,
      dayState: true,
      error: null,
      isLoaded: false,
      data: [], // 1
    };
  }
  nextMonth() {
    this.handleClick(1);
  }
  prevMonth() {
    this.handleClick(-1);
  }
  switch() {
    this.switchBtn();
  }
  resetData(data) {
    this.data = {};
    for (let i = 0; i < data.length; i++) {
      this.addEvent(data[i]); // 讓data的每一個放進當作參數，執行addEvent
    }
    // this.forceUpdate();
    this.setState(this.state);
  }
  inputData(data) {
    for (let i = 0; i < data.length; i++) {
      this.addEvent(data[i]); // 讓data的每一個放進當作參數，執行addEvent
    }
    this.setState(this.state);
    // this.forceUpdate();
  }



  componentDidMount() {
    if (typeof this.option.dataSource === 'string') {
      fetch(this.option.dataSource)
        .then(res => res.json())
        .then(
          data => {
            // prepare this.data
            for (let i = 0; i < data.length; i++) {
              this.addEvent(data[i]);
            }
            // 再轉成json檔
            this.setState({
              isLoaded: true,
            }); //setState goes to render()
          },
          error => {
            this.setState({
              isLoaded: true,
              error,
            });
          },
        );
    } else {
      this.readData(this.option.dataSource);
    }
    // console.log(this.data)
  }
  readData(data) {
    for (let i = 0; i < data.length; i++) {
      this.addEvent(data[i]);
      this.setState({
        isLoaded: true,
      });
    }
  }

  getCurrentNodes(currentYearMonth) {
    let nodes = [];
    let targetYearMonth = moment(currentYearMonth, 'YYYYMM');
    const event = this.data[targetYearMonth.get('year')][
      targetYearMonth.get('month')
    ];
    const monthlyDays = targetYearMonth.daysInMonth();
    const firstWeekDay = targetYearMonth.startOf('month').get('weekday');
    for (let i = 0; i < 42; i++) {
      let day = {};
      let date = i + 1 - firstWeekDay;
      if (i >= firstWeekDay && date <= monthlyDays) {
        // 每月的日子
        day.day = date;
        if (event[date]) {
          //如果 每月的日子 裡面 有活動的
          day = Object.assign(day, event[date]);
        }
      }
      nodes.push(day);
    }
    return nodes;
  }


  getAllYearMonth() {
    const yearMonth = [];
    for (const year in this.data) {
      // 把每個key都取出來
      for (let month in this.data[year]) {
        month = ('0' + (parseInt(month) + 1)).slice(-2);
        const ele = {};
        ele.title = `${year}${month}`;
        ele.literal = `${year}年 ${month}月`;
        yearMonth.push(ele);
      }
    }
    return yearMonth;
  }

  getCurrentYearMonthTabs(currentYearMonth) {
    const allYearMonth = this.getAllYearMonth(); //array obj
    allYearMonth.push({ title: '', literal: '' });
    allYearMonth.unshift({ title: '', literal: '' });
    const resultCurrentYearMonth = [];
    for (let i = 0; i < allYearMonth.length; i++) {
      if (allYearMonth[i].title === currentYearMonth) {
        resultCurrentYearMonth.push(
          allYearMonth[i - 1],
          allYearMonth[i],
          allYearMonth[i + 1],
        );
      }
    }
    // console.log(resultCurrentYearMonth); //[{...},{...},{...}]
    return resultCurrentYearMonth;
  }

  addEvent(event) {
    const date = moment(event.date);
    const year = date.get('year');
    const month = date.get('month');
    const day = date.get('date');
    const dataKeySetting = this.option.dataKeySetting;
    // 每一筆key的guaranteed = this.option.dataKeySetting的guaranteed的value 也就是"key"
    event.guaranteed = event[dataKeySetting.guaranteed];
    event.status = event[dataKeySetting.status];
    event.available = event[dataKeySetting.available];
    event.total = event[dataKeySetting.total];
    event.price = event[dataKeySetting.price];
    if (!this.data[year]) {
      // 還沒加資料前， this.data[year]是 undefined
      this.data[year] = {};
    }

    if (!this.data[year][month]) {
      this.data[year][month] = {};
    }
    if (!this.data[year][month][day]) {
      this.data[year][month][day] = event;
    } else {
      // already has event
      // 去比對資料當有資料相同一筆的時後
      if (
        // 保證出團
        this.data[year][month][day].guaranteed == false &&
        event.guaranteed == true
      ) {
        this.data[year][month][day] = event;
      } else if (
        // 報名
        this.data[year][month][day].guaranteed == true &&
        event.guaranteed == true &&
        this.data[year][month][day].status != '報名' &&
        event.status == '報名'
        // 報名 後補 預定 截止
      ) {
        this.data[year][month][day] = event;
      } else if (
        // 價格便宜
        this.data[year][month][day].status == '報名' &&
        event.status == '報名' &&
        this.data[year][month][day].price < event.price
      ) {
        this.data[year][month][day] = event;
      } // 還是本來的比較厲害
    }
  }

  focused(data) {
    if (data.date) {
      this.setState(() => ({
        currentNode: data.date, //update
      }));
    }
    if (data.price) {
      this.option.onClickDate(data);
    }
  }

  handleClick(target) {
    let currentYearMonth = this.state.currentYearMonth;
    const allYearMonth = this.getAllYearMonth();
    let thisIndex;
    for (let i = 0; i < allYearMonth.length; i++) {
      if (allYearMonth[i].title === currentYearMonth) {
        thisIndex = i;
      }
    }
    currentYearMonth = allYearMonth[thisIndex + target].title;
    console.log('currentYearMonth', currentYearMonth);
    this.setState(Object.assign(this.state, { currentYearMonth }));
    //更新state  this.setState的currentYearMonth
    let getMonthInfo = this.getCurrentNodes(currentYearMonth);
    for (let i = 0; i < 42; i++) {
      if (getMonthInfo[i].price) {
        console.log(getMonthInfo[i]);
      }
    }
  }

  switchBtn() {
    // console.log(this.state)
    this.setState(origState => ({
      //origState is this.state
      dayState: !origState.dayState, //false
    }));
  }

  render() {
    if (this.state.isLoaded) {
      const { currentYearMonth, currentNode, dayState } = this.state;
      let modeClass = {};
      modeClass[style.calendar_daymode] = dayState;
      modeClass[style.calendar_listmode] = !dayState;
      const btnClassName = classnames(modeClass);
      return (
        <div className={btnClassName}>
          <div onClick={() => this.switchBtn()} className={style.switchBtn}>
            換
          </div>
          <ControlTab
            currentYearMonthTabs={this.getCurrentYearMonthTabs(
              currentYearMonth,
            )}
            // handleClick={target => this.handleClick(target)}
            handleClick={target => this.handleClick(target)}
          />
          <Board
            currentNodes={this.getCurrentNodes(currentYearMonth)}
            // focused={data => this.focused(data)}
            focused={data => this.focused(data)}
            currentNode={currentNode}
          />
        </div>
      );
    }
    return <div>Loading...</div>; //2
  }
}
export default App;
