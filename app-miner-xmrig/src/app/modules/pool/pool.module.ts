import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolComponent } from './pool.component';
import { ToolbarModule } from '@swimlane/ngx-ui';
import { MomentModule } from 'ngx-moment';
import { FlexModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    PoolComponent
  ],
  exports: [
    PoolComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    MomentModule,
    FlexModule,
    NgChartsModule,
    MatListModule,
    PipesModule
  ]
})
export class PoolModule { }
