import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activate-employee',
  imports: [],
  templateUrl: './activate-employee.component.html',
  styleUrl: './activate-employee.component.css'
})
export class ActivateEmployeeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActivateEmployeeComponent>
  ) {}

  activate(): void {
    // Call backend API or emit event
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close();
  }
}