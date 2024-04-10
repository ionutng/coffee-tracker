import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  addRecordForm = new FormGroup({
    date: new FormControl(''),
    quantity: new FormControl('')
  });


  addRecord() {
    const date = this.addRecordForm.value.date ?? '';
    const quantity = Number(this.addRecordForm.value.quantity) ?? 0;
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
