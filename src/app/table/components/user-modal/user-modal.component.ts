import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() user: User | null = null;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [this.user?.id || null],
      name: [this.user?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      age: [this.user?.age || null, [Validators.required, Validators.min(18), Validators.max(65)]],
      status: [this.user?.status || 'active', [Validators.required]],
      department: [this.user?.department || '', [Validators.required, this.departmentValidator]]
    });
  }

  // Custom validator
  departmentValidator(control: AbstractControl): ValidationErrors | null {
    const validDepartments = ['IT', 'HR', 'Sales', 'Finance', 'Marketing'];
    if (!control.value || !validDepartments.includes(control.value)) {
      return { invalidDepartment: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.modalRef.close(this.userForm.value);
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel(): void {
    this.modalRef.close(null);
  }
}
