import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { StatusPipe } from './pipes/status.pipe';

// NG-ZORRO imports
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    TableComponent,
    UserModalComponent,
    StatusPipe
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzInputNumberModule
  ]
})
export class TableModule { }
