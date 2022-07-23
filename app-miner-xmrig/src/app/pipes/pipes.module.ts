import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSizePipe} from './filesize.pipe';
import {EffortPipe} from './effort.pipe';
import {HashRatePipe} from './hashrate.pipe';


@NgModule({
	declarations: [
		HashRatePipe,
		EffortPipe,
		FileSizePipe
	],
	exports: [
		HashRatePipe,
		EffortPipe,
		FileSizePipe
	],
	imports: [CommonModule]
})
export class PipesModule {
}
