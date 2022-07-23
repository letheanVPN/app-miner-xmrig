import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxUIModule} from '@swimlane/ngx-ui';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {MomentModule} from 'ngx-moment';
import {ConsoleModule} from 'src/app/modules/console/console.module';
import {PoolModule} from 'src/app/modules/pool/pool.module';
import {PipesModule} from 'src/app/pipes/pipes.module';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent
	],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxUIModule,
    MatTabsModule,
    MatListModule,
    FlexModule,
    MomentModule,
    ConsoleModule,
    PoolModule,
    PipesModule,
    MatButtonModule
  ],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
