import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { DailyReportService } from '../../../services/daily-report-service';
import { HalfDayModel, MissPushOutModel } from '../../../Models/daily-report';

@Component({
  selector: 'app-daily-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent {
records: (MissPushOutModel | HalfDayModel)[] = [];

  // Pagination
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  // Filters
  reportDate: string = '';
  absenceType: string = '';
  todayString: string = new Date().toISOString().split('T')[0];

  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private reportService: DailyReportService) {}

 fetchData() {
  if (this.absenceType === 'missPunchOut') {
    this.reportService.getMissPunchOut(this.reportDate).subscribe(data => {
      this.records = data;
    });
  } else if (this.absenceType === 'halfDay') {
    this.reportService.getHalfDay(this.reportDate).subscribe(data => {
      this.records = data;
    });
  }
}


  onDateChange() {
    this.records = [];
    this.absenceType = '';
  }

 exportexceldata(): void {
    const exportData = this.records.map(record => {
      const startDate = record.startDate ? new Date(record.startDate) : null;
      const endDate = record.endDate ? new Date(record.endDate) : null;

      return {
        Code: record.code,
        Name: record.name,
        Department: record.departmentName,
        Date: startDate ? this.formatDate(startDate) : '',
        InTime: startDate ? this.formatTime(startDate) : '',
        OutTime: endDate ? this.formatTime(endDate) : ''
      };
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Daily Report': worksheet },
      SheetNames: ['Daily Report']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    FileSaver.saveAs(data, `Daily_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-CA').format(date);
  }
  

  private formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const getValue = (item: MissPushOutModel) => {
      switch (column) {
        case 'code': return item.code.toLowerCase();
        case 'name': return item.name.toLowerCase();
        case 'departmentName': return item.departmentName.toLowerCase();
        case 'startDate': return new Date(item.startDate);
        case 'endDate': return item.endDate ? new Date(item.endDate) : new Date(0);
        default: return '';
      }
    };

    this.records.sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string) {
    if (this.sortColumn !== column) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }
}
