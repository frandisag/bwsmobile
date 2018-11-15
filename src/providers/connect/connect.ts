import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = "http://api.mondr1ve.com/mondrive/";
let apiUrl = "http://bws.com/api/";
//let apiUrl = "http://10.0.2.2:8000/api/";

@Injectable()
export class ConnectProvider {

  constructor(public http: Http) {}

  postData(credentials, type){
  	return new Promise((resolve, reject) =>{
      if(credentials.token){
        // let headers = new Headers({
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'Authorization': `Bearer ${credentials.token}`
        // });
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + credentials.token);

        let options = new RequestOptions({ headers: headers });
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

}