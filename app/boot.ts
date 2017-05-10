import 'core-js';
import 'zone.js/dist/zone';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { VcheckModule } from './vcheck.module';
//enableProdMode();
platformBrowserDynamic().bootstrapModule(VcheckModule);

