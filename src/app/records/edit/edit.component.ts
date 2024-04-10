import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  id!: number;
  record!: Record;

  editRecordForm = new FormGroup({
    quantity: new FormControl(0),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.recordService.getRecord(this.id).subscribe((record: Record) => {
      record.date = record.date.slice(0, 10);
      this.record = record;
      this.editRecordForm.patchValue({
        date: record.date,
        quantity: record.quantity
      })
    });
  }

  updateRecord() {
    const date = this.editRecordForm.value.date ?? this.record.date;
    const quantity = Number(this.editRecordForm.value.quantity) ?? this.record.quantity;
    const record: Record = {
      id: this.id,
      date: date,
      quantity: quantity
    };
    this.recordService.updateRecord(record).subscribe(() => {
      this.router.navigate(['/records/index']);
    });
  };

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService,
    private router: Router) { }
}
