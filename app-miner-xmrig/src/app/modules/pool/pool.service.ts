import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  hashvaultPool = 'lethean'

  public stats = {
    wallet: undefined
  }

  pollLog = {
    wallet: undefined
  }

  constructor() { }

  async getWalletStats(wallet: string) {

    if(wallet.length < 10){
      return false
    }

    const res = await fetch(`https://api.hashvault.pro/v3/${this.hashvaultPool}/wallet/${wallet}/stats?chart=total&inactivityThreshold=10&order=name&period=daily&poolType=false&workers=true`)

    this.stats['wallet'] = await res.json()
    return this.stats['wallet']
  }
}
