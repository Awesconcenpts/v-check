import {Component,Injectable, OnInit, ElementRef, Directive , Host,forwardRef, Inject,ViewContainerRef } from '@angular/core';
import {Form} from '@angular/forms';
import { VcheckService } from './vcheck.service';
import { VcheckComponent } from './vcheck.component';
import * as $ from 'jquery';
@Component({
    selector: 'host',
    template:require('./vcheck.quiz.word.html'),
	styleUrls: ['./app/vcheck/vcheck.quiz.word.css']
})
@Injectable()
export class VcheckQuizWord {
	public _question = [];
	constructor(
		public viewContainerRef:ViewContainerRef,
		private vcheckService:VcheckService,
		private vcheckComponent: VcheckComponent
		){
		this._question=this.vcheckService.getQuestion();
		
	}
	onAnswered(event){
		var _e=this._question['question']["real"];
		if(_e==event){
			this.vcheckService.onSetAnswerChange({"status":"trueAnswer","method":"onChange"});
		}else if(event=='true' && _e!=event){
			this.vcheckService.onSetAnswerChange({"status":"wrongAnswer"});
		}else{
			this.vcheckService.onSetAnswerChange({"status":"noAnswer","method":"onChange"});
		}
	}
}
