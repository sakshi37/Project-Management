import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-employee',
  imports: [],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any, // Injected data from the dialog
){}}
