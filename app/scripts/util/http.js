function resolvePromise (resolve, reject) {
  this._xmlHttpRequest.onreadystatechange = () => {
    if(this._xmlHttpRequest.readyState === 4 && this._xmlHttpRequest.status === 200) {
      try {
        var responseJson = JSON.parse(this._xmlHttpRequest.responseText);
        resolve({data: responseJson});
      }
      catch(e) {
        reject({ data: this._xmlHttpRequest.responseText});
      }
    }
    if(this._xmlHttpRequest.readyState === 4 && this._xmlHttpRequest.status >= 400) {
      try {
        var responseJson = JSON.parse(this._xmlHttpRequest.responseText);
        reject({data: responseJson});
      }
      catch(e) {
        reject({data: this._xmlHttpRequest.responseText});
      }
    }
  };
  this._xmlHttpRequest.ontimeout = () => { throw new Error('timeout'); }
}

function resolveAudioPromise (resolve, reject) {
  var self = this;

  self.xhr.addEventListener('load', (buffer) => {
    self.audioContext.decodeAudioData(self.xhr.response, function(buffer) {
      resolve({data: buffer});
    });
  });

  self.xhr.addEventListener('error', (error) => {
    reject({error: error});
  });

  self.xhr.addEventListener('timeout', (event) => {
    reject({error: error});
  });

}



function buildQueryString (config) {
  if (config && config.params) {
    var params = config.params;
    var query = Object.keys(params).map((key) => {
      return key + '=' + params[key];
    }).join('&');
    return '?' + query;
  }
  else {
    return '';
  }
}

function XhrPromise (url, data, method) {
  this._xmlHttpRequest = new XMLHttpRequest();
  this._xmlHttpRequest.open(method, url);
  this._xmlHttpRequest.setRequestHeader('content-type', 'application/json;charset=UTF-8');
  this._xmlHttpRequest.send(data);
  return new Promise(resolvePromise.bind(this));
}

function XhrAudioPromise (url, audioContext) {
  this.audioContext = audioContext;
  this.xhr = new XMLHttpRequest();
  this.xhr.open('GET', url, true);
  this.xhr.responseType = 'arraybuffer';
  this.xhr.send();
  return new Promise(resolveAudioPromise.bind(this));
}


export default class Http {

  static get (url, config, data) {
    url += buildQueryString(config);
    return new XhrPromise(url, data, 'GET');
  }

  static getAudioSample (url, audioContext) {
    return new XhrAudioPromise(url, audioContext);
  }

  static post (url, data) {
    return new XhrPromise(url, JSON.stringify(data), 'POST');
  }

}
