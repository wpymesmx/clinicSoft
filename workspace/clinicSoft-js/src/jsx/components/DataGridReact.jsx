'use strict';

var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');

var DataGridReact = React.createClass({
  mixins: [LanguageMixin()],
    getDefaultProps: function() {
    //console.log('# MedicamentoAlta->getDefaultProps #');
    return {
      dataList: [],
      colOptions: [],
      headerOptions: []
    };
  },
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: Constants.DATA_GRID_COMPONENT,
      language: window.language,
      dataList: this.props.dataList,
      dataListPage: undefined,
      colOptions: this.props.colOptions,
      headerOptions: this.props.headerOptions,
      rowsPerPage: 10,
      page: 0,
      bodyRows: (<div></div>),
      headers: (<div></div>)
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
    this.createBodyRows(this.state.rowsPerPage, this.state.page);
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# App->componentWillReceiveProps #');
    var page = this.state.page;

    if(nextProps.dataList != undefined) {
      var pagesNum = Math.ceil((nextProps.dataList.length/this.state.rowsPerPage));
      if(this.state.page < pagesNum) {
        page = 0;
      }
    }

    this.createBodyRows(this.state.rowsPerPage, page, nextProps.dataList, nextProps.colOptions, nextProps.headerOptions);
  },
  shouldComponentUpdate: function() {
    //console.log('# App->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# App->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# App->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# App->componentWillUnmount #');
    this.unSubscribeLanguage(this.state.componentKey);
  },
  onClickButton: function(dataObj, index, onClickFun, evt) {
    onClickFun(dataObj, index, evt);
  },
  onClickOrderBy: function(headerOpt, index, evt) {
    var headerOptions = this.state.headerOptions;
    var dataList = this.state.dataList;

    headerOptions[index] = headerOpt;
    console.log('orderByAscDesc-> ' + headerOpt.orderByAscDesc);
    if(headerOpt.orderByAscDesc != 'asc') {
      headerOpt.orderByAscDesc = 'asc';
      dataList = dataList.sort(function(a, b) {
        var nameA = a[headerOpt.orderBy].toUpperCase();
        var nameB = b[headerOpt.orderBy].toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

    } else {
      headerOpt.orderByAscDesc = 'desc';
      dataList = dataList.sort(function(a, b) {
        var nameA = a[headerOpt.orderBy].toUpperCase();
        var nameB = b[headerOpt.orderBy].toUpperCase();

        if (nameA < nameB) {
          return 1;
        }

        if (nameA > nameB) {
          return -1;
        }

        return 0;
      });
    }

    this.createBodyRows(this.state.rowsPerPage, this.state.page, dataList, this.state.colOptions, headerOptions);
  },
  createBodyRows: function(rowsPerPage, page, dataList, colOptions, headerOptions) {
    var bodyRows = undefined;
    var headers = [];
    var dataListPage = [];
    var LABEL_TYPE = 1;
    var BUTTON_TYPE = 2;
    var rowsPerPageTmp = (rowsPerPage != undefined ? rowsPerPage : this.state.rowsPerPage);
    var dataListTmp = (dataList != undefined ? dataList : this.state.dataList);
    var colOptionsTmp = (colOptions != undefined ? colOptions : this.state.colOptions);
    var headerOptionsTmp = (headerOptions != undefined ? headerOptions : this.state.headerOptions);
    //construccion del renglones para el boy
    if(dataListTmp != undefined && dataListTmp.length > 0) {
      //calcular el numero de paginas en base al numero de filas por paginas
      var pagesNum = Math.ceil((dataListTmp.length/rowsPerPageTmp));
      var dataIndex = 0;
      //construir paginas
      for(var i = 0; i < pagesNum; i++) {
        var rows = [];
        //construir renglones
        if(dataIndex < dataListTmp.length) {
          for(var j = 0; j < rowsPerPageTmp; j++) {
            if(dataIndex < dataListTmp.length) {
              var dataObj = dataListTmp[dataIndex];
              var cols = [];
              var col = (<div></div>);
              var rowDataGridStyle = '';
              //construr clolunas por renglon
              for(var k = 0; k < colOptionsTmp.length; k++) {
                var colOpt = this.state.colOptions[k];
                var type = (colOpt.type == undefined ? 1 : colOpt.type);
                //TODO construir columanas en base al tipo de columna
                if(type == LABEL_TYPE) {
                  col = (
                    <div key={Date.now()+k} style={{width: colOpt.width, height: '100%', float: 'left', overflowX: 'hidden'}}>
                      {dataObj[colOpt.property]}
                    </div>
                  );

                } else if(type == BUTTON_TYPE) {
                  if(colOpt.onClickButton != undefined) {
                    var labelButton = (colOpt.labelButton != undefined ? colOpt.labelButton : '');

                    col = (
                      <div key={Date.now()+k} style={{width: colOpt.width, height: '100%', float: 'left', overflowX: 'hidden', textAlign: 'center'}}>
                        <button className={colOpt.buttonStyle} title={labelButton}
                           onClick={this.onClickButton.bind(this, dataObj, dataIndex, colOpt.onClickButton)}>
                          &nbsp;
                        </button>
                      </div>
                    );
                  } else {
                    console.log('onClick de boton no implementado, property: onClickButton');
                  }

                } else {
                  console.log('tipo de columna no identificada, property type: ' + type);
                }

                cols.push(col);
              }

              if((j%2) > 0) {
                rowDataGridStyle = 'rowDataGridOdd';

              } else {
                rowDataGridStyle = 'rowDataGridEven';
              }

              rows.push(
                <div key={Date.now()+j} className={rowDataGridStyle} style={{width: '100%', float: 'left'}}>
                  {cols}
                </div>
              );
              dataIndex++;

            } else {
              //console.log('1. ya no hay mas elementos');
              break;
            }
          }

        } else {
          //console.log('2. ya no hay mas elementos');
          break
        }

        dataListPage[i] = rows;
      }
    }

    if(dataListPage.length > 0) {
      bodyRows = dataListPage[page];

    } else {
      console.log('No hay paginas que mostrar');
      bodyRows = (<div></div>);
    }
    //construccion de los headers
    if(headerOptionsTmp != undefined) {
      for(var i=0; i < headerOptionsTmp.length; i++) {
        var headerOpt = headerOptionsTmp[i];
        var headerStyle = (headerOpt.headerStyle != undefined ? headerOpt.headerStyle : '');
        var orderByHeader = '';
        var orderByStyle = '';

        if(headerOpt.orderBy != undefined && headerOpt.orderBy != '') {
          if(headerOpt.orderByAscDesc != undefined) {
            if(headerOpt.orderByAscDesc == 'asc') {
              headerOpt.orderByAscDesc = 'asc';
              orderByStyle = 'orderStyleAsc';

            } else {
              headerOpt.orderByAscDesc = 'desc';
              orderByStyle = 'orderStyleDesc';
            }

          } else {
            headerOpt.orderByAscDesc = 'asc';
            orderByStyle = 'orderStyleAsc';
          }

          orderByHeader = (
            <div style={{float: 'left', overflowX: 'hidden', width: '20%', paddingLeft: '3%'}}>
              <button className={orderByStyle} title={this.getText('MSG_212')} onClick={this.onClickOrderBy.bind(this, headerOpt, i)}>&nbsp;</button>
            </div>
          );
        }

        headers.push(
          <div key={Date.now()+i} className={headerOpt.headerStyle} style={{width: headerOpt.width, height: '100%', float: 'left', overflowX: 'hidden', textAlign: 'center'}}>
            <div style={{float: 'left', overflowX: 'hidden', width: '80%'}}>
              {headerOpt.label}
            </div>
            {orderByHeader}
          </div>
        );
      }

    } else {
      console.log('No existe configuracion para cabeceras.');
    }

    this.setState({
      dataList: dataListTmp,
      colOptions: colOptionsTmp,
      headerOptions: headerOptionsTmp,
      rowsPerPage: rowsPerPageTmp,
      dataListPage: dataListPage,
      bodyRows: bodyRows,
      headers: headers,
      page: page
    });
  },
  onClickGoToPage: function(page, evt) {
    evt.preventDefault();
    if(page >= 0 && page <= (this.state.dataListPage.length-1)) {
      this.setState({
        page: page,
        bodyRows: this.state.dataListPage[page]
      });
    }
  },
  onChangeRowsPerPage: function(evt) {
    this.createBodyRows(evt.target.value, 0);
  },
  render: function() {
    //console.log('# App->render #');
    var filters = (<div></div>);
    var paginador = (<div></div>);

    if(this.state.dataListPage != undefined) {
      var pageNum = this.state.dataListPage.length;
      var pageSugesLast = this.state.page - 5;
      var pagesLast = [];
      var pageSugesNext = this.state.page + 5;
      var pagesNext = [];

      for(var i = this.state.page-1; i >= pageSugesLast; i--) {
        if(i >= 0) {
          pagesLast.push(
            <div key={Date.now()+i} style={{float: 'left', marginLeft: '1%', marginRight: '1%'}}>
              <a href='#' onClick={this.onClickGoToPage.bind(this, i)}>{i+1}</a>
            </div>
          );
        }
      }
      //invertir el arreglo para posicionarlos elementos en forma de decendente
      pagesLast.reverse();

      for(var i = this.state.page+1; i <= pageSugesNext; i++) {
        if(i <= (this.state.dataListPage.length-1)) {
          pagesNext.push(
            <div key={Date.now()+i} style={{float: 'left', marginLeft: '1%', marginRight: '1%'}}>
              <a href='#' onClick={this.onClickGoToPage.bind(this, i)}>{i+1}</a>
            </div>
          );
        }
      }

      paginador = (
        <div style={{width: '100%', float: 'left', marginTop: '1%', marginBottom: '1%'}}>
          <div style={{float: 'left', width: '10%'}}>
            <select value={this.state.rowsPerPage} onChange={this.onChangeRowsPerPage}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
              <option value='50'>50</option>
            </select>
          </div>
          <div style={{float: 'left', width: '90%', paddingLeft: '10%', paddingRight: '10%'}}>
            <div style={{float: 'left', width: '20%'}}>
              <div style={{float: 'left', marginRight: '5%'}}>
                <button className='firstDataGrid' title={this.getText('MSG_208')} onClick={this.onClickGoToPage.bind(this, 0)}>&nbsp;</button>
              </div>
              <div style={{float: 'left', marginRight: '5%'}}>
                <button className='previousDataGrid' title={this.getText('MSG_209')} onClick={this.onClickGoToPage.bind(this, (this.state.page-1))}>&nbsp;</button>
              </div>
            </div>
            <div style={{float: 'left', width: '60%', paddingLeft: '5%', paddingRight: '5%'}}>
              {pagesLast}
              <div style={{float: 'left', marginLeft: '5%', marginRight: '5%', border: 'solid', borderWidth: '2px', borderRadius: '4px'}}>
                <a href='#' onClick={this.onClickGoToPage.bind(this, (this.state.page))}>
                  {(this.state.dataListPage.length > 0 ? (this.state.page+1) : this.state.page)}
                </a>
              </div>
              {pagesNext}
              <div style={{float: 'left', marginLeft: '10%', marginRight: '5%'}}>
                {(this.state.dataListPage.length > 0 ? (this.state.page+1) : this.state.page) + ' / ' + (this.state.dataListPage.length)}
              </div>
            </div>
            <div style={{float: 'left', width: '20%'}}>
              <div style={{float: 'left', marginLeft: '5%'}}>
                <button className='nextDataGrid' title={this.getText('MSG_210')} onClick={this.onClickGoToPage.bind(this, (this.state.page+1))}>&nbsp;</button>
              </div>
              <div style={{float: 'left', marginLeft: '5%'}}>
                <button className='lastDataGrid' title={this.getText('MSG_211')} onClick={this.onClickGoToPage.bind(this, (this.state.dataListPage.length-1))}>&nbsp;</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{width: '100%', height: '100%'}}>
        {paginador}
        <div className='headerDataGrid' style={{width: '100%', float: 'left'}}>
          {this.state.headers}
        </div>
        <div style={{width: '100%', float: 'left'}}>
          {this.state.bodyRows}
        </div>
        {paginador}
      </div>
    );
  }
});

module.exports = DataGridReact;

/* Documentacion para implementar componente DataGridReact
 *  colOptions: [
      {
        property: 'col1', //nombre de la propiedad en el lista de oobjetos
        width: '10%', //ancho de la columna
        type: 1 //tipo de comportamiento o componente 1-label(default), 2-button
      }
    ]
 *
 *
*/
