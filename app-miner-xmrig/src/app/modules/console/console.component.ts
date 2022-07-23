import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgTerminal} from 'ng-terminal';
import {Subscription} from 'rxjs';
import {WebsocketService} from 'src/app/services/websocket.service';

@Component({
	selector: 'lthn-console',
	templateUrl: './console.component.html',
	styleUrls: ['./console.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush


})
export class ConsoleComponent implements OnInit, AfterViewInit, OnDestroy {
	//@ts-ignore
  @ViewChild('term') terminal: NgTerminal;

	@Input()
	set cmd(name: string) {
		if(name.length > 1) {
			this.ws.sendMessage(`cmd:${this.attach}:${name}`)
			//this.terminal.underlying.writeln("\r\n");
			//this._cmd = (name && name.trim()) || '';
		}
	}

	@Input() attach: string  = 'letheand';
	private command: string[] = []

	subs: any = []
	constructor(private ws: WebsocketService, private ref: ChangeDetectorRef) {
		this.ref.detach()
		setInterval(() => {
			this.ref.detectChanges();
		}, 1000);

	}

	ngOnInit(): void {
		let that = this;

		if(this.subs['ws'] === undefined) {

			this.ref.detectChanges();
			this.subs['ws'] = this.ws.connect().subscribe((data: any) => {
				if (this.attach === data[0]) {
					if (data[0] === 'update-cli') {
						this.terminal.underlying.writeln(data[1]);
					} else {
						this.terminal.underlying.writeln(atob(data[1]).trim().replace('src/cryptonote_protocol/cryptonote_protocol_handler.inl', ''));
					}

					that.ref.markForCheck()
				}

			})

			this.changeStream(`daemon:${this.attach}`)
		}
    }

	getSub(){
		return this.ws.connect();
	}

	changeStream(channel:string){
		this.ws.sendMessage(channel)
		this.ref.markForCheck()
	}

	ngAfterViewInit() {
		const that = this;
		this.terminal.setRows(25)
		if(this.terminal.keyEventInput) {

			this.subs['term'] = this.terminal.keyEventInput.subscribe((e) => {
				//console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

				const ev = e.domEvent;
				const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

				if (ev.keyCode === 13) {

					//console.log(`cmd:letheand:${this.command.join('')}`)
					that.ws.sendMessage(`cmd:${this.attach}:${this.command.join('')}`)
					this.command = []
					this.terminal.underlying.writeln("\r\n");
					this.ref.detectChanges();
				} else if (ev.keyCode === 8) {
					 this.command.pop()
					if (this.terminal.underlying.buffer.active.cursorX > 0) {
						this.terminal.underlying.write('\b \b');
						this.ref.detectChanges();
					}
				} else if (printable) {
					this.command.push(e.key);
					this.terminal.write(e.key);
					this.ref.detectChanges();
				}
				//console.log(this.command.join(""))
			});
		}
	}

	public ngOnDestroy(): void {
		this.terminal.underlying.clear()
		//this.terminal = undefined
		this.ws.closeConnection()
		this.subs.forEach((sub: any) => sub.unsubscribe())
	}

}
