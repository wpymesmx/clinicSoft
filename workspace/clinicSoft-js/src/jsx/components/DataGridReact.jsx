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
      dataListOrg: this.props.dataList,
      dataList: this.props.dataList,
      dataListPage: undefined,
      colOptions: this.props.colOptions,
      headerOptions: this.props.headerOptions,
      rowsPerPage: 10,
      page: 0
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
  updateDateList: function(dataList) {
    var page = this.state.page;

    if(dataList != undefined) {
      var pagesNum = Math.ceil((dataList.length/this.state.rowsPerPage));

      if(this.state.page < pagesNum) {
        page = 0;
      }
    }

    this.createBodyRows(this.state.rowsPerPage, page, dataList, this.state.colOptions, this.state.headerOptions, dataList);
  },
  onClickButton: function(dataObj, index, onClickFun, evt) {
    onClickFun(dataObj, index, evt);
  },
  onClickOrderBy: function(headerOpt, index, evt) {
    var headerOptions = this.state.headerOptions;
    var dataList = this.state.dataList;

    headerOptions[index] = headerOpt;
    //console.log('orderByAscDesc-> ' + headerOpt.orderByAscDesc);
    if(headerOpt.orderByAscDesc != 'asc') {
      headerOpt.orderByAscDesc = 'asc';
      dataList = dataList.sort(function(a, b) {
        var nameA = a[headerOpt.property].toUpperCase();
        var nameB = b[headerOpt.property].toUpperCase();

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
        var nameA = a[headerOpt.property].toUpperCase();
        var nameB = b[headerOpt.property].toUpperCase();

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
  onChangeFilter: function(headerOpt, index, evt) {
    var headerOptions = this.state.headerOptions;
    var dataListOrg = this.state.dataListOrg;
    var filterDataList = [];

    headerOptions[index].filterText = evt.target.value;

    if(dataListOrg != undefined && dataListOrg.length > 0) {
      for(var i = 0; i < dataListOrg.length; i++) {
        var data = dataListOrg[i];
        var addFilterList = true;

        for(var j = 0; j < headerOptions.length; j++) {
          var headerOption = headerOptions[j];
          //console.log('filterText:' + headerOption.filterText + ', isFilterText:' + headerOption.isFilterText);
          if(headerOption.isFilterText != undefined && headerOption.isFilterText == true) {
            if(data[headerOption.property].indexOf(headerOption.filterText) > -1) {
              addFilterList = true;

            } else {
              addFilterList = false;
              break;
            }
          }
        }

        if(addFilterList == true) {
          filterDataList.push(data);
        }
      }
    }

    if(headerOpt.onChangeFilter != undefined) {
      headerOpt.onChangeFilter(headerOpt, index, evt);
    }

    this.createBodyRows(this.state.rowsPerPage, 0, filterDataList, this.state.colOptions, headerOptions);
  },
  createBodyRows: function(rowsPerPage, page, dataList, colOptions, headerOptions, dataListOrg) {
    var self = this;
    var dataListPage = [];
    var rowsPerPageTmp = (rowsPerPage != undefined ? rowsPerPage : this.state.rowsPerPage);
    var dataListTmp = (dataList != undefined ? dataList : this.state.dataList);
    var dataListOrgTmp = (dataListOrg != undefined ? dataListOrg : this.state.dataListOrg)
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

              dataObj.dataIndex = dataIndex;
              rows.push(dataObj);
              dataIndex++;
            }
          }
        }

        dataListPage[i] = rows;
      }
    }
    //construccion de los headers
    if(headerOptionsTmp != undefined) {
      for(var i=0; i < headerOptionsTmp.length; i++) {
        var headerOpt = headerOptionsTmp[i];

        if(headerOpt.isOrderBy != undefined && headerOpt.isOrderBy == true) {
          if(headerOpt.orderByAscDesc == undefined) {
            headerOpt.orderByAscDesc = 'asc';
          }

          if(headerOpt.isFilterText == true) {
            if(headerOpt.filterText == undefined) {
              headerOpt.filterText = '';
            }

            if(headerOpt.placeholder == undefined) {
              headerOpt.placeholder = '';
            }
          }
        }
      }

    } else {
      console.log('No existe configuracion para cabeceras.');
    }

    this.setState({
      dataListOrg: dataListOrgTmp,
      dataList: dataListTmp,
      colOptions: colOptionsTmp,
      headerOptions: headerOptionsTmp,
      rowsPerPage: rowsPerPageTmp,
      dataListPage: dataListPage,
      page: page
    });
  },
  onClickGoToPage: function(newPage, evt) {
    evt.preventDefault();
    var newBodyRows = this.state.dataListPage[newPage];

    if(newPage >= 0 && newPage <= (this.state.dataListPage.length-1)) {
      this.setState({
        page: newPage
      });
    }
  },
  onChangeRowsPerPage: function(evt) {
    this.createBodyRows(evt.target.value, 0);
  },
  render: function() {
    //console.log('# App->render #');
    var self = this;
    var filters = '';
    var paginador = '';
    var headers = [];
    var bodyRows = [];
    var rowDataObjs = [];
    var LABEL_TYPE = 1;
    var BUTTON_TYPE = 2;
    //recorrer la lista de paginas para contruir el paginador
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
                <button className='firstDataGrid' title={this.getText('MSG_208')} value='' onClick={this.onClickGoToPage.bind(this, 0)}>&nbsp;</button>
              </div>
              <div style={{float: 'left', marginRight: '5%'}}>
                <button className='previousDataGrid' title={this.getText('MSG_209')} value='' onClick={this.onClickGoToPage.bind(this, (this.state.page-1))}>&nbsp;</button>
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
                <button className='nextDataGrid' title={this.getText('MSG_210')} value='' onClick={this.onClickGoToPage.bind(this, (this.state.page+1))}>&nbsp;</button>
              </div>
              <div style={{float: 'left', marginLeft: '5%'}}>
                <button className='lastDataGrid' title={this.getText('MSG_211')} value='' onClick={this.onClickGoToPage.bind(this, (this.state.dataListPage.length-1))}>&nbsp;</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    //construccion de los headers
    if(this.state.headerOptions != undefined) {
      for(var i=0; i < this.state.headerOptions.length; i++) {
        var headerOpt = this.state.headerOptions[i];
        var headerStyle = (headerOpt.style != undefined ? headerOpt.style : '');
        var orderByHeader = '';
        var orderByStyle = 'orderStyleAsc';
        var filterText = '';
        var inputValue = undefined;

        if(headerOpt.isOrderBy != undefined && headerOpt.isOrderBy == true) {
          if(headerOpt.orderByAscDesc != undefined) {
            orderByStyle = (headerOpt.orderByAscDesc == 'asc' ? 'orderStyleAsc' : 'orderStyleDesc');
          }

          if(headerOpt.isFilterText == true) {
            inputValue = (headerOpt.filterText == undefined ? '' : headerOpt.filterText);

            filterText = (
              <div style={{width: '100%', float: 'left'}}>
                <input type='text' className='form-control' value={inputValue} placeholder={this.getText(headerOpt.placeholder)}
                  onChange={this.onChangeFilter.bind(this, headerOpt, i)}/>
              </div>);
          }

          orderByHeader = (<button className={orderByStyle} title={this.getText('MSG_212')} onClick={this.onClickOrderBy.bind(this, headerOpt, i)}>&nbsp;</button>);
        }

        headers.push(
          <div key={i+'f'} className={headerOpt.headerStyle} style={{width: headerOpt.width, height: '100%', float: 'left', overflowX: 'hidden', textAlign: 'center'}}>
            <div style={{float: 'left', overflowX: 'hidden', width: '80%', padding: '0.4%'}}>
              {this.getText(headerOpt.label)}
            </div>
            <div style={{float: 'left', overflowX: 'hidden', width: '20%', paddingLeft: '3%'}}>
              {orderByHeader}
            </div>
            {filterText}
          </div>
        );
      }
    }
    //construir renglones del data grid
    if(this.state.dataListPage != undefined && this.state.dataListPage.length > 0) {
      bodyRows = this.state.dataListPage[this.state.page].map(function(dataObj, index) {
        var cols = [];
        var rowDataGridStyle = '';
        //construr clolunas por renglon
        for(var k = 0; k < self.state.colOptions.length; k++) {
          var col = '';
          var colOpt = self.state.colOptions[k];
          var type = (colOpt.type == undefined ? 1 : colOpt.type);
          //TODO construir columanas en base al tipo de columna
          if(type == LABEL_TYPE) {
            var colValue = dataObj[colOpt.property];

            if(colOpt.catalog != undefined) {
              for(var l=0; l < colOpt.catalog.length; l++) {
                if(dataObj[colOpt.property] == colOpt.catalog[l].id) {
                  colValue = self.getText(colOpt.catalog[l].value);
                  break;
                }
              }
            }

            if(colOpt.textAlign == undefined) {
              colOpt.textAlign = '';
            }

            col = (
              <div key={Date.now()+k} className={colOpt.style} style={{width: colOpt.width, height: '100%', float: 'left', overflowX: 'hidden', textAlign: colOpt.textAlign}}>
                {colValue}
              </div>
            );

          } else if(type == BUTTON_TYPE) {
            if(colOpt.onClickButton != undefined) {
              var labelButton = (colOpt.labelButton != undefined ? self.getText(colOpt.labelButton) : '');

              col = (
                <div key={Date.now()+k} style={{width: colOpt.width, height: '100%', float: 'left', overflowX: 'hidden', textAlign: 'center'}}>
                  <button className={colOpt.style} title={labelButton} value='' onClick={self.onClickButton.bind(self, dataObj, dataObj.dataIndex, colOpt.onClickButton)}>
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

        rowDataGridStyle = ((index%2) > 0 ? 'rowDataGridOdd' : 'rowDataGridEven');
        return (
          <div key={Date.now()+index} className={rowDataGridStyle} style={{width: '100%', float: 'left'}}>
            {cols}
          </div>
        );
      });
    }

    return (
      <div style={{width: '100%', height: '100%'}}>
        {paginador}
        <div className='headerDataGrid' style={{width: '100%', float: 'left'}}>
          {headers}
        </div>
        <div style={{width: '100%', float: 'left'}}>
          {bodyRows}
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
        type: 1|2, //tipo de comportamiento o componente 1-label(default), 2-button
        style: '', //estilo a aplicar al componente text o button
        onClickButton: fun(dataObj, index, evt),  //funsion a ejecutar en el evento onClick (type=2)
        labelButton: '', //Codigo del diccionario propiedad title a mostrar (type=2)
        catalog: [{id:valor(Codigo del diccionario)}] //catalogo que se utilizara para buscar y substituir valores
      }
    ]
  * headerOptions: [
      {
        property: '', //nombre de la propiedad en el lista de oobjetos
        placeholder: '', //Codigo del diccionario utilizado para placeholder en el campo de filtro
        label: '', //Codigo del diccionario utilizado para ser utilizado como etiqueta del header
        width: '100%', //ancho del contenedor del header,
        isOrderBy: true|false(default), //bandera que indica si se aplica ordenamiento a la columna
        isFilterText: true|false(default), //bandera que indica si se aplica campo de texto para filtro
        style: '', //nombre del estilo que se aplicara al header
        onChangeFilter: fun(dataObj, index, evt), //funcion utilizada para invocar cuando el usuario escribe sobre el campo de texto
        textAlign: '' //propiedad del estilo que indica la alineacion horizontal del texto
      }
    ]

    ejemplo:
    <DataGridReact ref='personalGrid' dataList={this.state.personalList}
      headerOptions={[
        {property: 'pers_nombre', label: 'MSG_500', placeholder: 'MSG_500', width: '18%', isOrderBy: true, isFilterText: true},
        {property: 'pers_apellido_pat', label: 'MSG_501', placeholder: 'MSG_501', width: '18%', isOrderBy: true, isFilterText: true},
        {property: 'pers_apellido_mat', label: 'MSG_502', placeholder: 'MSG_502', width: '18%', isOrderBy: true, isFilterText: true},
        {property: 'pers_correo', label: 'MSG_503', placeholder: 'MSG_503', width: '18%', isOrderBy: true, isFilterText: true},
        {property: 'pers_estado', label: 'MSG_504', placeholder: 'MSG_504', width: '14%', isOrderBy: true},
        {property: '', label: '', width: '7%'},
        {property: '', label: '', width: '7%'}
      ]}
      colOptions={[
        {property: 'pers_nombre', width: '18%'},
        {property: 'pers_apellido_pat', width: '18%'},
        {property: 'pers_apellido_mat', width: '18%'},
        {property: 'pers_correo', width: '18%'},
        {property: 'pers_estado', width: '14%', textAlign: 'center', catalog:[{id: 'A', value: 'MSG_202'}, {id: 'I', value: 'MSG_203'}]},
        {property: '', width: '7%', type: 2, style: 'detailButton', onClickButton: this.onClickDetalle, labelButton: 'MSG_201'},
        {property: '', width: '7%', type: 2, style: 'editarButton', onClickButton: this.onClickEditar, labelButton: 'MSG_200'}
      ]}/>
      //para actualizar la lista se debe ejecutar la funcion updateDateList
      this.refs.personalGrid.updateDateList(newDataList);
  *
*/
