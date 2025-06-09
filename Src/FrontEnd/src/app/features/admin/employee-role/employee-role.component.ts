import { Component } from '@angular/core';
import { AdminService, role } from '../../../services/admin-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserGroup } from '../../../Models/get-user-group-dto';
import { UpdateService } from '../../../services/update-service'

// import bootstrap from 'bootstrap';
declare var bootstrap: any;


@Component({
  selector: 'app-employee-role',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-role.component.html',
  styleUrl: './employee-role.component.css',
})
export class EmployeeRoleComponent {
  roles: role[] = [];
   userGroups: UserGroup[] = [];
  private updateRoleModal!: bootstrap.Modal;

  constructor(private adminService: AdminService ,
    private updateService: UpdateService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllUserGroups()

  }

  getAllUserGroups(): void {
  this.updateService.getAllUserGroups().subscribe({
    next: (res) => {
      this.userGroups = res;
      console.log('usergrop id',res)
    },
    error: (err) => {
      console.error("Failed to load user groups", err);
    }
  });
}
  getAllEmployee() {
    this.adminService.getEmployee().subscribe((res) => {
      this.roles = res;
    });
  }

  employeeUpdateForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
    fk_UserGroupId: new FormControl('', [Validators.required]),
    userGroupName: new FormControl('')
  })

 UpdateRole(code: string, fk_UserGroupId: number) {
  const payload = { code, fk_UserGroupId }; 
  console.log("Payload being sent:", payload);
  this.adminService.UpdateRole(payload).subscribe({
    next: (res) => {
      console.log('Success response:', res);
      this.getAllEmployee(); // optionally refresh list after update
    },
    error: (err) => {
      console.error('Update failed:', err);
    }
  });
}

   openAddModal(id: number): void {
  const role = this.roles.find(r => r.id === id);
  if (role) {
    const matchedUserGroup = this.userGroups.find(ug => ug.userGroupId === role.fk_UserGroupId);
    this.employeeUpdateForm.patchValue({
      code: role.code,
      fk_UserGroupId: matchedUserGroup ? matchedUserGroup.userGroupId : null,
      userGroupName: matchedUserGroup ? matchedUserGroup.userGroupName : ''
    });
    console.log('Patched form:', this.employeeUpdateForm.value);
  }

  const modalElement = document.getElementById('updateRoleModal');
  if (modalElement) {
    if(this.updateRoleModal){
      this.updateRoleModal.dispose();
    }
    this.updateRoleModal = new bootstrap.Modal(modalElement);
    this.updateRoleModal.show();
  }
}


  onSubmit() {
    if (this.employeeUpdateForm.valid) {
      const { code } = this.employeeUpdateForm.value;
      const fk_UserGroupId = Number(this.employeeUpdateForm.value.fk_UserGroupId);

      this.adminService.UpdateRole({code , fk_UserGroupId}).subscribe({
        next:(res) =>{
          console.log('res', res);
          this.updateRoleModal.hide();
          alert("Role Successfully Udpate")
          this.getAllEmployee();
        },
        error:(err)=>{
          console.error('update failed:', err);
          alert("Failed to update user role.")
        }
      });

     
    }
  }
  

}






