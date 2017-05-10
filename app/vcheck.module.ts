import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { VcheckService } from './vcheck/vcheck.service';
import { VcheckQuizChoice } from './vcheck/vcheck.quiz.choice';
import { VcheckQuizWord } from './vcheck/vcheck.quiz.word';
import { VcheckComponent } from './vcheck/vcheck.component';

@NgModule({
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule
  ],
  declarations: [
	VcheckQuizChoice,VcheckQuizWord,VcheckComponent
  ],
	providers: [
    VcheckService,HttpModule
  ],
entryComponents: [ VcheckQuizChoice,VcheckQuizWord,VcheckComponent ],
  bootstrap: [ VcheckComponent ]
})
export class VcheckModule {
  // Diagnostic only: inspect router configuration
  //constructor(router: Router) {
    //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  //}
}
