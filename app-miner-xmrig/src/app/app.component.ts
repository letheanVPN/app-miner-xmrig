import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService, NotificationStyleType, NotificationType} from '@swimlane/ngx-ui';
import {interval, Subscription} from 'rxjs';
import {XmrigService} from 'src/app/xmrig.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  public poolInfo: any;
  private sub: Subscription = new Subscription();

  constructor(private xmrig: XmrigService, private notificationService: NotificationService) { }

  public config: any;
  public downloads: any;
  public wallet: any = '';
  public pool: any = 'pool.hashvault.pro';
  public xmrigData: any = {
    summary: {}
  }

  async ngOnInit() {
    // await this.setInstallConfig()
    this.config = await this.xmrig.checkInstallConfig()

    if(this.config['wallet']){
      this.wallet = this.config['wallet']
//      this.poolInfo = await this.getHashVaultStats()
//      console.log(this.poolInfo)
//      this.sub = interval(30000).subscribe(async () => {
//        this.poolInfo = await this.getHashVaultStats()
//        console.log(this.poolInfo)
//
//      });
    }
    try{
      this.xmrigData.summary =  await this.xmrig.getData()
      if(this.xmrigData.summary['id'] !== undefined){
        this.sub = interval(3000).subscribe(async () => {
          this.xmrigData.summary =  await this.xmrig.getData()
        });
      }

    }catch (e) {

    }

    //console.log(await this.getHashVaultStats())
  }

  public async startXmrig() {
    if(this.wallet.length < 10){
      this.notificationService.create({
        type: NotificationType.html,
        styleType: NotificationStyleType.error,
        title: 'Error',
        body: "Wallet address not set"
      })
      return false;
    }


    let config = this.config

    if(!config['wallet'] || config['wallet'] !== this.wallet){
      config['wallet'] = this.wallet
      config['url'] = this.pool
      await this.xmrig.setInstallConfig(config)
    }



    await this.xmrig.startXmrig({user: this.wallet, url: this.pool})

    this.sub = interval(3000).subscribe(async () => {
      this.xmrigData.summary = this.xmrig.getData()
    });

    this.notificationService.create({
      type: NotificationType.html,
      styleType: NotificationStyleType.success,
      title: 'Xmrig started!',
      body: "Make it so"
    })

    return true
  }

  async downloadXmrig(id: string) {
    await this.xmrig.downloadXmrig(id)
    this.notificationService.create({
      type: NotificationType.html,
      styleType: NotificationStyleType.success,
      title: 'Download Requested!',
      body: id
    })
  }

  async getHashVaultStats(){
    if(this.wallet.length < 10){
      return false
    }
    const res = await fetch(`https://api.hashvault.pro/v3/lethean/wallet/${this.wallet}/stats?chart=total&inactivityThreshold=10&order=name&period=daily&poolType=false&workers=true`)

    return await res.json()
  }

  public ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  public getNow(){
    // console.log(new Date().getTime() *1000)
    return new Date().getTime()
  }

}
