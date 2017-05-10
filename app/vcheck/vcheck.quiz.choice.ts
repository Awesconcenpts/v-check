import {Component,Injectable, OnInit, ElementRef, Directive , Host, Inject,ViewContainerRef } from '@angular/core';
import {Router, Resolve, ActivatedRoute} from '@angular/router';
import {Form} from '@angular/forms';
import { VcheckService } from './vcheck.service';
@Component({
    selector: 'host',
    template:require('./vcheck.quiz.choice.html'),
	styleUrls: ['./app/vcheck/vcheck.quiz.choice.css']
})
@Injectable()
export class VcheckQuizChoice {
	public _question = {};
	public _result = [];
	constructor(public viewContainerRef:ViewContainerRef, private vcheckService:VcheckService){
		this.vcheckService.setClasses([{"class":"none"},{"class":"none"},{"class":"none"}]);
		this._question=vcheckService.getQuestion();
		this._result=this.vcheckService.getClasses();
	}
	onOptionChoosed(event){
		var _cl=[{"class":"icon fa fa-close"},{"class":"icon fa fa-close"},{"class":"icon fa fa-close"}];
		_cl[parseInt(this._question['question']["a"])-2]['class']='icon fa fa-check'
		this.vcheckService.setClasses(_cl);
		this._result=_cl;
		var _th=this;
		setTimeout(function(){
			_th.vcheckService.setClasses([{"class":"none"},{"class":"none"},{"class":"none"}]);
			_th.vcheckService.onSetAnswerChange({"status":"trueAnswer","method":"onChange"});
		},600);
		
	}
}
