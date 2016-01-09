function XhrPromise (url, data, method) {
  let self = this;
  self.xhr = new XMLHttpRequest();
  self.xhr.open(method, url);
  self.xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
  self.xhr.send(data);

  return new Promise((resolve, reject) => {

    self.xhr.addEventListener('load', (event) => {
      try {
        var responseJson = JSON.parse(self.xhr.responseText);
        resolve({data: responseJson});
      }
      catch (error) {
        reject({data: self.xhr.responseText, error: error});
      }
    });

    self.xhr.addEventListener('error', (event) => {
      reject({error: event});
    });

    self.xhr.addEventListener('timeout', (event) => {
      response.reject({error: error});
    });

  });
}

function XhrAudioPromise (url, audioContext) {
  let self = this;
  self.audioContext = audioContext;
  self.xhr = new XMLHttpRequest();
  self.xhr.open('GET', url, true);
  self.xhr.responseType = 'arraybuffer';
  self.xhr.send();

  return new Promise((resolve, reject) => {

    self.xhr.addEventListener('load', (buffer) => {
      self.audioContext.decodeAudioData(self.xhr.response, (buffer) => {
        resolve({data: buffer});
      });
    });

    self.xhr.addEventListener('error', (error) => {
      reject({error: error});
    });

    self.xhr.addEventListener('timeout', (event) => {
      response.reject({error: error});
    });

  });
}


export default class Http {
  static get (url) {
    return new XhrPromise(url, undefined, 'GET');
  }
  static getAudioSample (url, audioContext) {
    return new XhrAudioPromise(url, audioContext);
  }
  static post (url, data) {
    return new XhrPromise(url, JSON.stringify(data), 'POST');
  }
}
