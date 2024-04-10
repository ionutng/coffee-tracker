import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  id!: number;
  record!: Record;

  editRecordForm = new FormGroup({
    date: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)])
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
    if (this.editRecordForm.invalid) {
      return;
    }

    const date = this.editRecordForm.value.date ?? this.record.date;

    if (new Date(date) > new Date()) {
      return;
    }

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
