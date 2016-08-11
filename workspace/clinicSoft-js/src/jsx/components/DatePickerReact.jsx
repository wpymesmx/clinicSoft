'use strict';

var Context = require('../utils/Context.js');
var Constants = require('../utils/Constants.js');

var DatePickerReact = React.createClass({
  getInitialState: function() {
    return {
      isShow: false,
      label: '',
      datePicked: new Date(),
      dateView: new Date(),
      dateFormat: this.props.dateFormat,
      inputLabel: this.props.inputLabel
    };
  },
  getDefaultProps: function() {
    var oneMinute = 60 * 1000;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;
    var oneWeek = oneDay * 7;

    var ctx = new Context();
    ctx.put('oneMinute', oneMinute);
    ctx.put('oneHour', oneHour);
    ctx.put('oneDay', oneDay);
    ctx.put('oneWeek', oneWeek);
    ctx.put('lastDayInMonth', Constants.lastDayInMonth);

    return {
      dateFormat: 'dd/mm/yyyy',
      ctx: ctx
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {
  },
  componentWillReceiveProps: function(nextProps) {
  },
  shouldComponentUpdate: function() {
    return true;
  },
  componentWillUpdate: function() {
  },
  componentDidUpdate: function() {
  },
  componentWillUnmount: function() {
  },
  showDatePicker: function(evt) {
    evt.preventDefault();
    var showOrHide = false;

    if(this.state.isShow) {
      showOrHide = false;

    } else {
      showOrHide = true;
    }

    this.setState({
      isShow: showOrHide
    });
  },
  hideDatePicker: function() {
    this.setState({
      isShow: false
    });
  },
  onClickAceptarDatePicked: function(evt) {
    this.hide();
  },
  onChangeDatePicked: function(evt) {

  },
  getDatePicked: function() {
    return this.state.datePicked;
  },
  isBisiesto: function(dateView) {
    var isBisiesto = false;
    var anioCalcular = dateView.getFullYear();

    //calcular si es biciesto y comunicarlo
    if ((anioCalcular % 4 == 0) && ((anioCalcular % 100 != 0) || (anioCalcular % 400 == 0))) {
      isBisiesto = true;
    }

    return isBisiesto;
  },  
  lastDayInMonth: function(dateView) {
    var lastDay = 0;
    var month = dateView.getMonth();
    var isBiciesto = false;
    var BICIESTO_LAST_DAY = 28;

    isBiciesto = this.isBisiesto(dateView);    

    if(isBiciesto && month == Constants.Months.FEBREO) {
      lastDay = BICIESTO_LAST_DAY;
      
    } else {
      lastDay = this.props.ctx.get('lastDayInMonth')[month];
    }

    return lastDay;
  },
  firstDayInWeek: function(dateView) {
    var firstDayInWeek = 0;
    var dateTmp = new Date(dateView.getTime());
    var FIRST_DAY = 1;

    dateTmp.setDate(FIRST_DAY);

    return dateTmp.getDay();
  },
  onPickDateOn: function(dayCount, dateView, evt) {
    evt.preventDefault();
    var datePicked = new Date(dateView.getTime());

    datePicked.setDate(dayCount);

    this.setState({
      datePicked: datePicked,
      isShow: false
    });

    if(this.props.onDatePicked != undefined) {
      this.props.onDatePicked(datePicked, evt);
    }
  },
  onPickDateOff: function(dayCount, dateView, evt) {
    evt.preventDefault();
  },
  onNextMonth: function(evt) {
    evt.preventDefault();
    var dateView = this.state.dateView;

    dateView.setMonth(dateView.getMonth() + 1);

    this.setState({
      dateView: dateView
    });
  },
  onNextYear: function(evt) {
    evt.preventDefault();
    var dateView = this.state.dateView;

    dateView.setFullYear(dateView.getFullYear() + 1);

    this.setState({
      dateView: dateView
    });
  },
  onPrevMonth: function(evt) {
    evt.preventDefault();
    var dateView = this.state.dateView;

    dateView.setMonth(dateView.getMonth() - 1);   

    this.setState({
      dateView: dateView
    });
  },
  onPrevYear: function(evt) {
    evt.preventDefault();
    var dateView = this.state.dateView;

    dateView.setFullYear(dateView.getFullYear() - 1);

    this.setState({
      dateView: dateView
    });
  },
  findPos: function (obj) {
    var curleft = 0;
    var curtop = 0;

    if (obj.offsetParent) {
      curleft = obj.offsetLeft
      curtop = obj.offsetTop

      while (obj = obj.offsetParent) {
        curleft += obj.offsetLeft
        curtop += obj.offsetTop
      }
    }

    return {
      top: curtop,
      left: curleft
    };
  },
  reset: function() {
    this.setState({
      isShow: false,
      datePicked: new Date(),
      dateView: new Date(),
    });
  },
  render: function() {  
    var self = this;
    var componentShow = 'componentShow';
    var componentHide = 'componentHide';
    var datePickerStyle = 'cal-container';
    var rowsHTML = [];
    var colsHTML = [];
    var calTitle = '';
    var datePicked = '';

    if(this.state.isShow) {
      datePickerStyle += ' ' + componentShow;

    } else {
      datePickerStyle += ' ' + componentHide;
    }

    //crear el calendario
    var initCol = 0;
    var MAX_DAYS_PER_WEEK = 7;
    var continueDayOfMonth = false;

    var dayCount = 0;
    var lastDay = this.lastDayInMonth(this.state.dateView);
    var dayInWeek = this.firstDayInWeek(this.state.dateView);

    while(dayCount <= lastDay) {
      var colHTML = [];

      for(initCol = 0; initCol < MAX_DAYS_PER_WEEK; initCol++) {
        if(initCol == dayInWeek && !continueDayOfMonth) {
          dayCount++;
          continueDayOfMonth = true;
        }

        if(dayCount > 0 && dayCount <= lastDay) {
          var onPickDateOn = function(dayCount, dateView, evt){
            self.onPickDateOn(dayCount, dateView, evt);
          }.bind(self, dayCount, this.state.dateView);

          var stylePicked = {};

          if(this.state.datePicked.getDate() == dayCount && 
              this.state.datePicked.getMonth() == this.state.dateView.getMonth() && 
              this.state.datePicked.getFullYear() == this.state.dateView.getFullYear()) {
            stylePicked = {
              background: '#6FC1D6'
            }; 
          }

          colHTML.push(<td><a href='#' style={stylePicked} onClick={onPickDateOn}>{dayCount}</a></td>);
          dayCount++;

        } else {
          var onPickDateOff = function(dayCount, dateView, evt){
            self.onPickDateOff(dayCount, dateView, evt);
          }.bind(self, 0, this.state.dateView);

          colHTML.push(<td className='cal-off'><a href='#' onClick={onPickDateOff}></a></td>);
        }
      }

      rowsHTML.push(<tr>
        {colHTML}
      </tr>);
    }
    //crear etiqueta del titulo de mes y anio que se esta calculando
    calTitle = Constants.MonthsFull[this.state.dateView.getMonth()] + ' ' + this.state.dateView.getFullYear();
    //crear etiqueta para el campo en base al formato deseado (TODO)
    datePicked = (this.state.datePicked.getDate() + '/' + (this.state.datePicked.getMonth() + 1) + '/' + this.state.datePicked.getFullYear());

    return (
      <div style={{width:'100%', float:'left', marginRight: '3%'}}>        
        <span style={{float: 'left', marginLeft: '3%', marginRight: '3%'}}>{this.state.inputLabel}</span>
        <span style={{float: 'left', marginRight: '3%'}}>
          <input type='text' value={datePicked} onChange={this.onChangeDatePicked} readOnly={true} />
        </span>
        <span style={{float: 'left', marginLeft: '3%', marginRight: '3%'}}>
          <a id={this.props.idCal} className='IconCalStyle'  href='#' onClick={this.showDatePicker}></a>
        </span>

        <section className={datePickerStyle}>
          <div className='cal'>
            <table className='cal-table'>
              <caption className='cal-caption'>
                <a href='#' className='prev' onClick={this.onPrevYear}>&laquo;&laquo;</a>
                <a href='#' className='prev' onClick={this.onPrevMonth}>&laquo;</a>
                {calTitle}
                <a href='#' className='next' onClick={this.onNextYear}>&raquo;&raquo;</a>
                <a href='#' className='next' onClick={this.onNextMonth}>&raquo;</a>
              </caption>
              <thead>
                <tr>
                  <td className='cal-thead-td'>D</td>
                  <td className='cal-thead-td'>L</td>
                  <td className='cal-thead-td'>M</td>
                  <td className='cal-thead-td'>M</td>
                  <td className='cal-thead-td'>J</td>
                  <td className='cal-thead-td'>V</td>
                  <td className='cal-thead-td'>S</td>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td colSpan='100%'>
                  </td>
                </tr>
              </tfoot>
              <tbody className='cal-body'>
                {rowsHTML}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
});

module.exports = DatePickerReact;
