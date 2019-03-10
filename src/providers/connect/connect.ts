import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

const apiUrl = "https://sales.bintangmotor.com/api/";
// const apiUrl = "http://bws.com/api/";
// const apiUrl = "http://127.0.0.1:8000/api/";
// const apiUrl = "http://10.0.2.2:8000/api/";

@Injectable()
export class ConnectProvider {

  constructor(public http: Http) {}

  postData(credentials, type){
  	return new Promise((resolve, reject) =>{
      if(credentials.token){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + credentials.token);

        let options = new RequestOptions({ headers: headers });
        delete credentials.token
        this.http.post(apiUrl+type, JSON.stringify(credentials),options).subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
          reject(err);
        });
      }else{
        let headers = new Headers();
        this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
          reject(err);
        });
      }
    });
  }

  getData(credentials, type){
  	return new Promise((resolve, reject) =>{
      let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + credentials);

        let options = new RequestOptions({ headers: headers });
        this.http.get(apiUrl+type,options).subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
          reject(err);
        });
    });
  }

}
