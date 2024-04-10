import { Component, OnInit } from '@angular/core';
import { Record } from '../record';
import { RecordService } from '../record.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  records: Record[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit(): void {
    this.recordService.getRecords().subscribe((records: Record[]) => {
      records.forEach(record => {
        record.date = new Date(record.date.slice(0, 10)).toLocaleDateString(
            undefined, 
            {year: 'numeric', month: 'long', day: 'numeric'});
      });

      records.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this.records = records;
    });
  }

  filterRecords(text: string): void {
    if (text === 'date') {
      this.records.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (text === 'quantity') {
      this.records.sort((a, b) => {
        return b.quantity - a.quantity;
      });
    } else if (text === 'id') {
      this.records.sort((a, b) => {
        return b.id! - a.id!;
      });
    }
  }
}
