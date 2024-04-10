import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Record } from '../record';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
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

  deleteRecord(id: number): void {
    this.recordService.deleteRecord(id).subscribe(() => {
      this.router.navigate(['/records/index']);
    });
  }

  constructor(
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router) { }
}
