import axios from 'axios';

class APIService {
    static AdminLogin(body) {

        return fetch('http://127.0.0.1:8000/admin/login/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static CreateChannel(body) {

        console.log("body",body)
        return axios.post('http://127.0.0.1:8000/studio/create/channel/', body, {
        // return fetch('http://127.0.0.1:8000/studio/create/channel/', {
        // 'method':'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
            // 'Content-Type': 'undefined'
            // 'Content-Type' : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            // 'Content-Type':'application/json',
          }, 
          // body:JSON.stringify(body)
        // body : body

      })
      // .then(resp => resp.json())

      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))

    }

    static UploadVideo(body) {

      console.log("body",body)
      return axios.post('http://127.0.0.1:8000/studio/upload/video/', body, {
      headers: {
          'Content-Type': 'multipart/form-data'
        }, 
      })
      .then(res => {
        console.log(res.data);
        })
      .catch(err => console.log(err))

    }

    static DisplayVideo() {

      return axios.get('http://127.0.0.1:8000/display/video/')
      .then(responce => responce.json())
      // .then(res => setData(res))
      // .catch(err => console.log(err))

    }
}


export default APIService;