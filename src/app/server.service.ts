import { Injectable} from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}
    fbUrl:string = 'https://x.firebaseio.com/data';
    storeServers(servers: any[]) {
        const headers = new Headers({'Content-Type': 'application/json'})
        return this.http.post(this.fbUrl, servers, {
            headers: headers
        });
        // return this.http.put(this.fbUrl, servers, {
        //     headers: headers
        // });
    }
    getServers(){
        return this.http.get(this.fbUrl)
            .map(
                (response: Response) => {
                    const data = response.json();
                    for (const server of data) {
                        server.name = 'FETCHED_' + server.name;
                    }
                    return data;
                }
            ).catch(
                (error: Response) => {
                    console.error(error);
                    return Observable.throw('Something went wrong!');
                }
            );
    }
    getAppName() {
        return this.http.get('https://x.firebaseio.com/data/appName.json')
        .map(
            (response: Response) => {
                return response.json();
            });
      }
}