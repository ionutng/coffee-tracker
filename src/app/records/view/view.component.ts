import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../record';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  record!: Record;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recordService.getRecord(id).subscribe((record: Record) => {
      record.date = new Date(record.date.slice(0, 10)).toLocaleDateString(
        undefined, 
        {year: 'numeric', month: 'long', day: 'numeric'});
      this.record = record;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService) { }
}
