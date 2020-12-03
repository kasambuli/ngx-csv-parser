
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'CSV-Reader';
  csvRecords: any[] = [];
  header: boolean = true;

  constructor(private ngxCsvParser: NgxCsvParser) { };

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(): void { };

  validateEmail(emails): any {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const validEmails = [];
    const invalidEmails = [];

    for (const email of emails) {
      emailRegex.test(email.email) ? validEmails.push(email) : invalidEmails.push(email);
    }

    return { valid: validEmails, invalid: invalidEmails }
  }

  uploadCsvFile($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' }).pipe().subscribe((res: Array<any>) => {
      this.csvRecords.push(this.validateEmail(res));
      console.log(this.csvRecords)
      console.log(this.csvRecords[0].valid[0]);
      console.log(this.csvRecords[0].invalid[0]);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    })
  }
}
