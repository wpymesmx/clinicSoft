'use strict';

/* how to use
 *  <InputFileReact ref='dieta' maxSize='3000' extensions={['.docx', '.pdf', '.xlsx']} />
 *
 */
var React = require('react');

var InputFileReactDoc = React.createClass({
    getInitialState: function() {
      return {
        extensions: this.props.extensions,
        maxSize: this.props.maxSize,
        placeholder: this.props.placeholder,
        fileSelected: this.props.fileSelected,
        fileName: '',
        isErrorState: false,
      };
    },
    getDefaultProps: function() {
      return {
        maxSize: 3000,
        extensions: ['.docx', '.pdf', '.xlsx'],
        placeholder: '',
        fileName: '',
        inputFile: undefined,
        fileSelected: false
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
    storage: function() {
      return {
        inputFile: undefined
      };
    },
    getArchivo: function() {
      return this.storage.inputFile;
    },
    getArchivoBase64: function() {
      var archivoBase64 = '';

      if(this.storage.inputFile != undefined && this.storage.inputFile != '') {
        var splitFile = this.storage.inputFile.split('base64,');
        archivoBase64 = splitFile[1];
      }

      return archivoBase64;
    },
    setErrorState: function(message) {
      console.log('Error-> ' + message);
      this.storage.inputFile = undefined;
      this.setState({
        isErrorState: true,
        fileSelected: false,
        fileName: ''
      });

      if(this.props.onErrorFileSelected != undefined) {
        this.props.onErrorFileSelected(message);
      }
    },
    setSuccessState: function(fileName) {
      this.setState({
        isErrorState: false,
        fileSelected: true,
        fileName: fileName
      });
    },
    setNoFileSelected: function() {
      this.storage.inputFile = undefined;
      this.setState({
        isErrorState: false,
        fileName: '',
        fileSelected: false
      });

      if(this.props.onFileSelected != undefined) {
        this.props.onFileSelected('', undefined);
      }
    },
    clean: function() {
      this.storage.inputFile = undefined;
      this.setState({
        fileSelected: false,
        fileName: '',
        isErrorState: false,
      });
    },
    fileSelected: function() {
      return this.state.fileSelected;
    },
    handleFile: function(evt) {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];
      var target = evt.target;
      var fileSize = 0;
      var endsWith = function(str, suffix) {
        str = str.toLowerCase();
        var okFileType = false;

        suffix.every(function(suff) {
          suff = suff.toLowerCase();
          okFileType = (str.indexOf(suff, str.length - suff.length) !== -1);

          if(okFileType) {
            return false;
          }

          return true;
        });

        return okFileType;
      };

      reader.onload = function(upload) {
        self.storage.inputFile = upload.target.result;
        if(self.props.onFileSelected != undefined) {
          self.props.onFileSelected(self.state.fileName, self.storage.inputFile);
        }
      }

      if (typeof file != 'undefined') {
        if(endsWith(file.name, this.state.extensions)) {
          fileSize = file.size /1024;

          if(fileSize <= this.state.maxSize) {
            reader.readAsDataURL(file);
            this.setSuccessState(file.name);

          } else {
            this.setErrorState('El archivo debe tener un tamaño máximo de 3 MB.');
          }

        } else {
          this.setErrorState('El archivo debe tener formato valido: ' + this.getValidFormats());
        }

      } else {
        this.setNoFileSelected();
      }
    },
    getValidFormats: function() {
      var fileExtensions = '';
      this.state.extensions.forEach(function(ext, index) {
        if(index == 0) {
          fileExtensions += ext;

        } else {
          fileExtensions += ', ' + ext;
        }
      });

      return fileExtensions;
    },
    onClickInputFile: function(evt) {
      evt.preventDefault();
      this.refs.inputFile.click();
    },
    render: function() {
      var inputStyle = {};
      var fileExtensions = '';

      this.state.extensions.forEach(function(ext, index) {
        if(index == 0) {
          fileExtensions += ext;

        } else {
          fileExtensions += ', ' + ext;
        }
      });

      if(this.state.isErrorState) {
        inputStyle = {
          border: '1px solid',
          borderColor: 'red'
        };
      }

      return (
        <div className='inputFileReact'>
          <div className='fileInputGroup'>
            <input className='fileTextInput' style={inputStyle} type='text' value={this.state.fileName} placeholder={this.state.placeholder} readOnly={true}/>
            <div className='fileInputWraper'>
              <input key='inputFile' ref='inputFile' className='fileInput' type='file' onChange={this.handleFile} accept={fileExtensions} value=''/>
              <a href='#' className='inputIconFind' onClick={this.onClickInputFile} ></a>
            </div>
          </div>
        </div>
      );
    }
});

module.exports = InputFileReactDoc;
