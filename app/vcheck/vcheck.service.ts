import {Injectable,EventEmitter,Output} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class VcheckService implements Resolve<any>{ 
	public _question=[];
	public _classes=[];
	public _answer: any;
	private _answerChange = new Subject<any>();
	notifyObservable$ = this._answerChange.asObservable();
	constructor(private http:Http) {
	}
	resolve(): Observable<any> {
		return this.http.get('json.html').map(response => response.json());
	}
	loadBooks():Observable<any>{
		return this.http.get('json.html').map(res => res.json());//.catch(error => console.log(error));
	}
	loadQuestion(id):Observable<any>{
		//_headers.append('Accept', 'application/xml');
		//return this.http.get('vcheck.php?id='+id+"&t="+new Date().getTime()).map(res => res.json());//.catch(error => console.log(error));
		return this.http.get('http://localhost/test/vcheck.php?id='+(id)+"&t="+new Date().getTime()).map(res => res.json());//.catch(error => console.log(error));
	}
	setQuestion(e){
		this._question=e;
	}
	setClasses(e){
		this._classes=e;
	}
	getQuestion(){
		return this._question;
	}
	getClasses(){
		return this._classes;
	}
	
	onSetAnswerChange(e){
		this._answer =e;
		this._answerChange.next(this._answer);
  	}
}