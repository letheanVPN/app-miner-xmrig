import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'effort', pure: false })
export class EffortPipe implements PipeTransform {
	constructor() {}

	transform(value: any, valid?: boolean) {
		if (valid === false) {
			return 'black';
		}
		const mid = 100;
		let r = 0;
		let g = 0;
		const b = 0;
		if (value <= 95) {
			r = Math.floor(80 * (value / mid));
			g = 128;
		} else if (value <= 105) {
			g = 128;
		} else if (value <= 200) {
			r = 255;
			g = Math.floor(160 * ((mid - (value % mid)) / mid));
		} else {
			r = 255;
		}
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	}
}
