import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'hashrate', pure: false })
export class HashRatePipe implements PipeTransform {
	constructor() {}

	transform(content: number | string = 0, decorator?: boolean) {
		if (typeof content == 'string' || content === null) {
			content = 0;
		}
		let i = 0;
		const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z'];
		while (content > 1000) {
			content /= 1000;
			i++;
		}
		if (decorator === false) {
			return content.toFixed(2);
		} else {
			return `${content.toFixed(2)} ${units[i]}H`;
		}
	}
}
