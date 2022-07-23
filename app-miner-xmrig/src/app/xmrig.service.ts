import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class XmrigService {

	constructor() {
	}

	async checkInstallConfig() {
		try {
			const containers = await fetch('http://localhost:36911/system/data/object/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({group: 'apps', object: 'xmrig'})
			});
			return await containers.json();
		} catch (e) {
			return false;
		}

	}

	async setInstallConfig(config: any) {
		const containers = await fetch('http://localhost:36911/system/data/object/set', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({group: 'apps', object: 'xmrig', data: config})
		});
		return await containers.json();
	}

	async fetchRelease() {
		const containers = await fetch('http://localhost:36911/mining/xmrig/downloads', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return await containers.json();

	}

	async downloadXmrig(id: string) {
		const containers = await fetch('http://localhost:36911/mining/xmrig/download', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: id})
		});
		//this.containers = await containers.json()
		return await containers.json();
	}

	async startXmrig(args: any) {

		if (!args['pass']) {
			args['pass'] = 'Lethean-GUI-Miner';
		}

//		if(!await this.fs.isFile('conf/xmrig/config.json')){
//			await this.fs.writeFile('conf/xmrig/config.json', JSON.stringify({}))
//		}
//    args['cpuMaxThreadsHint'] = '50%'
//    args['httpPort'] = '36979'
//    args['httpHost'] = 'localhost'
//    args['httpAccessToken'] = 'dave1wasneverhere'
		args['httpNoRestricted'] = true;
		args['logFile'] = `data/xmrig/${args['user']}.log`;

		const containers = await fetch('http://localhost:36911/mining/xmrig/start', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(args)
		});
		//this.containers = await containers.json()
		return await containers.json();
	}

	async getData() {
		// dave1wasneverhere
      const args = {
        endpoint: "/2/summary",
        method: "GET"
      }
		const apiData = await fetch('http://localhost:36911/mining/xmrig/api',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(args)
			}
		);

      return await apiData.json()
	}
}
