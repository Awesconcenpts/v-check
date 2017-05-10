import {Component,Injectable, OnInit, Renderer,ElementRef, Directive, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { VcheckService } from './vcheck.service';
import { VcheckQuizWord } from './vcheck.quiz.word';
import { VcheckQuizChoice } from './vcheck.quiz.choice';
@Component({
	selector: 'vcheck',
	template: require('./vcheck.component.html'),
	styleUrls: ['./app/vcheck/vcheck.component.css']
})
@Injectable()
export class VcheckComponent implements OnInit,OnDestroy{
	public _isLoaded:string='';
	public _quizIndex=1;
	public _progress="0%";
	public _totalQuestion=28;
	public _subscription: Subscription;
	public _isStartActive='active';
	public _isQuizActive='';
	public _yellowCard=2;// less than
	public _redCard=3; //grater than yellow and less than
	public _reStart=4; //grater than red and less than
	public _falseAnswerCount=0;
	public _typeComponent:any;
	public _lastType='';
	public _isPopupActive='';
	public _isPopupContent="";
	public _isFinishedLastWordSlide=true;;
	public _isResultActive='';
	public _isResultContent="<h1>Test </h1><p>This is test.";
	public _serviceSubscription: Subscription;
	public _isErrorActive="";
	public _countDown=0;
	public _countDownFront="- -";
	public _countStart=true;
	public _timeColor='';
	@ViewChild('host', {read: ViewContainerRef}) host;
	constructor(
		public viewContainerRef:ViewContainerRef, 
		private componentFactoryResolver:ComponentFactoryResolver,
		private vcheckService:VcheckService,
		private el:ElementRef
	){
		var _th=this;
		this._subscription=this.vcheckService.notifyObservable$.subscribe(value => {
			switch(value.status){
					case 'trueAnswer':
					_th.onChange();
					break;
					case 'wrongAnswer':
						_th._falseAnswerCount++;
						if(_th._falseAnswerCount<=_th._yellowCard){
							_th._isPopupContent="<h1 class='head'>Yellow Card</h1><p>You clicked 'Yes' to a word that is NOT real word. Be careful, there are many false words in this test. Click 'Yes' only if you think you know the meaning.";
							_th._isPopupActive='yellow active';
						}else if(_th._falseAnswerCount>_th._yellowCard && _th._falseAnswerCount<=_th._redCard){
							_th._isPopupContent="<h1 class='head'>Red Card</h1><p>You clicked 'Yes' to many words which are NOT real words. Be careful, there are many false words in this test. Click 'Yes' only if you think you know the meaning.";
							_th._isPopupActive='red active';
						}else if(_th._falseAnswerCount>=_th._reStart){
							_th._isQuizActive='inactive';
							_th._isErrorActive='active';
						}
					break;
					case 'noAnswer':
					_th.onChange();
					break;
			}
		});
	}
	
	ngOnInit() {
		this.vcheckService.loadQuestion(this._quizIndex).subscribe(data => this.onPageInit(data), error =>console.log(error));
		Observable.interval(1000).map((x) => {
			if(this._countStart){
				if(this._countDown>1){
        			this._countDown--;
					this._timeColor='';
					this._countDownFront=""+(this._countDown < 10 ? "0" : "") + this._countDown;
				}else{
					this._timeColor='red';
					this._countDownFront="00";
				}
			}else{
				this._timeColor='';
				this._countDownFront="- -";
			}
    	}).subscribe((x) => {
            //this.message = x;
          });
		
	}
	onStart(){
		this._isStartActive='inactive';
		this._isQuizActive='active';
		this.onCountDownStart();
	}
	onCountDownStart(){
	this._countStart=true;this._countDown=61;	
	}
	onCountDownStop(){
		this._timeColor='';
		this._countStart=false;
		this._countDown=0;
		this._countDownFront="- -";
	}
	onPageInit(e){
		//this.onChangeProgressBar();
		var _chass=' word';
		this.vcheckService.setQuestion(e);
		this._typeComponent=VcheckQuizWord;
		if(e.type=='calibration'){
			this._typeComponent=VcheckQuizChoice;
			_chass=" choice";
		}
		this._lastType=_chass;
		const factory = this.componentFactoryResolver.resolveComponentFactory(this._typeComponent);
		const ref = this.host.createComponent(factory).changeDetectorRef.detectChanges();	
		this.el.nativeElement.querySelectorAll('host')[0].className='view vsible'+this._lastType;
		var _th=this;
		this._quizIndex++;
		setTimeout(function(){
			_th._isLoaded='loaded';
			document.querySelector('.loader').className='loader loaded';
		},500)
	}
	onChangeProgressBar(){
		this._progress=(100/this._totalQuestion*(this._quizIndex-1))+"%";
	}
	onDataLoad(e){ 
		this._serviceSubscription.unsubscribe();
		var em=this.el.nativeElement.querySelectorAll('host');
		var _chass=' word';
		if(em.length){
			this.onChangeProgressBar();
			this.vcheckService.setQuestion(e);
			this._typeComponent=VcheckQuizWord;
			if(e.type=='calibration'){
				this._typeComponent=VcheckQuizChoice;
				_chass=" choice";
			}
			
			//em[0].className='view invsible'+this._lastType;
			const factory = this.componentFactoryResolver.resolveComponentFactory(this._typeComponent);
			const ref = this.host.createComponent(factory).changeDetectorRef.detectChanges();
			const elms=this.el.nativeElement.querySelectorAll('host')[1];
			this.el.nativeElement.querySelectorAll('host')[1].className='view vsible'+_chass; 
			this._lastType=_chass;
			var _th=this;
			this._quizIndex++;
			this.onCountDownStart();
			setTimeout(function(){
				_th.host.remove(0);
				_th._isFinishedLastWordSlide=true;
			},1000)
		}
		
	}
	onChange(){
		if(!this._isFinishedLastWordSlide)return false;
		this.onCountDownStop();
		//const factory = this.componentFactoryResolver.resolveComponentFactory(VcheckQuizWord);
        //const ref = this.viewContainerRef.createComponent(factory);
        //ref.changeDetectorRef.detectChanges();
		//this.vcheckService.setBooks(this._index);
		//const refs = this.host.clear();
		//console.log(this.host.get(0));
		//console.log(this.host.length);
		//console.log(this.host.get(0).element.nativeElement);
		//const factory = this.componentFactoryResolver.resolveComponentFactory(VcheckQuizWord);
		//const ref = this.host.createComponent(factory);
		//ref.changeDetectorRef.detectChanges();
		if(this._quizIndex==(this._totalQuestion+1)){
			this._quizIndex++;
			this.onChangeProgressBar();
			var _th=this;
			setTimeout(function(){
				_th._isQuizActive='inactive';
				_th._isResultActive='active';
			},500)
			
		}else{
			this._isFinishedLastWordSlide=false;
			if(typeof(this._serviceSubscription)!=='undefined')this._serviceSubscription.unsubscribe();
			var em=this.el.nativeElement.querySelectorAll('host');
			em[0].className='view invsible'+this._lastType;
			this._serviceSubscription=this.vcheckService.loadQuestion(this._quizIndex).subscribe(data =>this.onDataLoad(data), error => console.log(error));
		}

	}
	onContinue(){
		if(this._falseAnswerCount<=this._yellowCard){
			this._isPopupActive='yellow inactive';
		}else{
			this._isPopupActive='red inactive';
		}

		var _th=this;
		setTimeout(function(){
			_th.onChange();
		},500)
		setTimeout(function(){
			_th._isPopupActive='';
		},800)
		
	}
	onRegistered(){
		
	}
	onResultContinue(){
		this._quizIndex=1;
		this._falseAnswerCount=0;
		this._isErrorActive='inactive';
		var _th=this;
		setTimeout(function(){
			_th._isStartActive='active';
			_th.onChange();
		},400)
		
	}
	ngOnDestroy() {
    	this._subscription.unsubscribe();
  	}
}
