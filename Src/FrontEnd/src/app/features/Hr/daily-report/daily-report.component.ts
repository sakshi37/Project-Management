import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailyReportService } from '../../../services/daily-report-service';
import { MissPushOutModel } from '../../../Models/daily-report';

@Component({
  selector: 'app-daily-report',
  imports: [FormsModule,CommonModule],
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.css'
})
export class DailyReportComponent {

  reportDate: string = new Date().toISOString().slice(0, 10); // today's date in 'yyyy-MM-dd' format
  absenceType: string = '';
  todayString: string = new Date().toISOString().slice(0, 10);

   records: MissPushOutModel[] = [];

  constructor(private reportService:DailyReportService) {}

  fetchData() {
    if (this.absenceType === 'missPunchOut') {
      this.reportService.getMissPunchOut(this.reportDate).subscribe(data => {
        this.records = data;
      });
    }
  }

}
