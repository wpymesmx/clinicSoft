'use strict';

var request = require('superagent');

var Constants = require('../utils/Constants.js');

var httpCodes = {
  OK: 200,
  ERROR: 500,
  NOT_FOUND: 404
};

var CommonService = {
  ajax: function(url, params, onSuccess, onError, onFail) {
    var user = window.ctx.get(Constants.USER);
    params['Web_Token'] = user.getJws();
    
    $.ajax({
      url: (Constants.appBackPath + Constants.appBackCtx + url + '?Web_Token=' + user.getJws()),
      headers: {
        'Web_Token': user.getJws(),
        'Content-Type': 'text/plain'
      },
      dataType: 'json',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(params),
      cache: false,
      success: function(data) {
        if(data.code == httpCodes.OK) {
          onSuccess(data);
        } else {
          onError(data);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        onFail(err);
      }.bind(this)
    });
  },
  send: function(url, params, onSuccess, onError, onFail) {
    var user = window.ctx.get(Constants.USER);
    params['Web_Token'] = user.getJws();

    request.post(Constants.appBackPath + Constants.appBackCtx + url)
    .query({Web_Token: user.getJws()})
    .set('Web_Token', user.getJws())
    .set('Content-Type', 'text/plain')
    .set('Accept', 'application/json')
    .accept('application/json')
    .send(JSON.stringify(params))
    .end(function(err, res){
      if(!err && res) {
        if(res.status == httpCodes.OK) {
            onSuccess(res.body);

        } else if(res.status == httpCodes.ERROR){
          onError(res.body);

        } else {
          onFail(res.body);
        }

      } else {
        onFail(err);
      }
    });
  }
};

module.exports = CommonService;
