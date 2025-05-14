import { Component } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';

@Component({
  selector: 'app-timesheet-update',
  imports: [],
  templateUrl: './timesheet-update.component.html',
  styleUrl: './timesheet-update.component.css',
})
export class TimesheetUpdateComponent {
  constructor(private timeSheetService: TimeSheetService) {}

  punchIn() {
    console.log('punchIn');
    this.timeSheetService.punchIn(1).subscribe((res) => console.log(res));
  }

  punchOut() {
    this.timeSheetService.punchOut(1).subscribe((res) => console.log(res));
  }
}
