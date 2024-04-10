import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  addRecordForm = new FormGroup({
    date: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)])
  });


  addRecord() {
    if (this.addRecordForm.invalid) {
      return;
    }

    const date = this.addRecordForm.value.date ?? '';

    if (new Date(date) > new Date()) {
      return;
    }

    const quantity = Number(this.addRecordForm.value.quantity);

    const record: Record = {
      date: date,
      quantity: quantity
    };
    this.recordService.addRecord(record).subscribe(() => {
      this.router.navigate(['/records/index']);
    });
  };

  constructor(
    private recordService: RecordService,
    private router: Router) { }
}
