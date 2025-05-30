import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserModalComponent } from './components/user-modal/user-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  users: User[] = [];
  displayData: User[] = [];
  pageIndex = 1;
  pageSize = 8;
  total = 0;

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.updateDisplayData();
  }

  loadUsers(): void {
    // Hardcoded data - at least 16 items for 2 pages
    this.users = [
      { id: 1, name: 'Ion Popescu', email: 'ion@example.com', age: 25, status: 'active', department: 'IT' },
      { id: 2, name: 'Maria Ionescu', email: 'maria@example.com', age: 30, status: 'inactive', department: 'HR' },
      { id: 3, name: 'Andrei Stanescu', email: 'andrei@example.com', age: 28, status: 'active', department: 'Sales' },
      { id: 4, name: 'Elena Dumitrescu', email: 'elena@example.com', age: 35, status: 'active', department: 'IT' },
      { id: 5, name: 'Mihai Radulescu', email: 'mihai@example.com', age: 32, status: 'inactive', department: 'Finance' },
      { id: 6, name: 'Ana Georgescu', email: 'ana@example.com', age: 27, status: 'active', department: 'Marketing' },
      { id: 7, name: 'Cristian Popa', email: 'cristian@example.com', age: 29, status: 'active', department: 'IT' },
      { id: 8, name: 'Raluca Marin', email: 'raluca@example.com', age: 31, status: 'inactive', department: 'HR' },
      { id: 9, name: 'George Constantinescu', email: 'george@example.com', age: 26, status: 'active', department: 'Sales' },
      { id: 10, name: 'Adriana Serban', email: 'adriana@example.com', age: 33, status: 'active', department: 'Finance' },
      { id: 11, name: 'Bogdan Stoica', email: 'bogdan@example.com', age: 28, status: 'inactive', department: 'IT' },
      { id: 12, name: 'Carmen Nicolae', email: 'carmen@example.com', age: 30, status: 'active', department: 'Marketing' },
      { id: 13, name: 'Dan Tudorache', email: 'dan@example.com', age: 34, status: 'active', department: 'Sales' },
      { id: 14, name: 'Florina Vasilescu', email: 'florina@example.com', age: 29, status: 'inactive', department: 'HR' },
      { id: 15, name: 'Gabriel Neagu', email: 'gabriel@example.com', age: 27, status: 'active', department: 'IT' },
      { id: 16, name: 'Ioana Barbu', email: 'ioana@example.com', age: 32, status: 'active', department: 'Finance' }
    ];
    this.total = this.users.length;
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.users.slice(startIndex, endIndex);
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayData();
  }

  openAddModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add New User',
      nzContent: UserModalComponent,
      nzComponentParams: {
        user: null
      },
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        const newUser: User = {
          ...result,
          id: Math.max(...this.users.map(u => u.id)) + 1
        };
        this.users.push(newUser);
        this.total = this.users.length;
        this.updateDisplayData();
      }
    });
  }

  editUser(user: User): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit User',
      nzContent: UserModalComponent,
      nzComponentParams: {
        user: { ...user }
      },
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        const index = this.users.findIndex(u => u.id === result.id);
        if (index !== -1) {
          this.users[index] = result;
          this.updateDisplayData();
        }
      }
    });
  }
}
