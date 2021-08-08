import axios from 'axios';

class APIService {
    static LoginUser(body) {

        return fetch('http://127.0.0.1:8000/api/v1/user/login/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            
            },
            body:JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static RegisterUser(body) {

        console.log("body",body)
        return fetch('/api/v1/user/register/account/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }

    static CreateChannel(body) {

        console.log("body",body)
        return axios.post('/api/v1/studio/create/channel/', body, {
        // return fetch('/api/v1/studio/create/channel/', {
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

      // .then(res => {
      //   console.log(res.data);
      // })
      // .catch(err => alert('BAD REQ'))

    }

    static UploadVideo(body) {

      console.log("body",body)
      return axios.post('/api/v1/studio/upload/video/', body, {
      headers: {
          'Content-Type': 'multipart/form-data'
        }, 
      })

    }

    static DisplayVideo() {

      return axios.get('/api/v1/user/display/video/')
      .then(responce => responce.json())
      // .then(res => setData(res))
      // .catch(err => console.log(err))

    }
}


export default APIService;