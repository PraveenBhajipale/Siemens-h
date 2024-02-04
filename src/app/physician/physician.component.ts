import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-physician',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './physician.component.html',
  styleUrl: './physician.component.scss'
})
export class PhysicianComponent implements OnInit {

  dropdownList: any;
  selectedItems: any;
  dropdownSettings = {};
  consData: any;
  submitted = false;
  form: any
  requiredField: boolean = false;
  isItemSelected: boolean = true;
  newList: any[] = [];
  spreadedList: any;
  dropDownValue: String = '';

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        physicianName: ['', Validators.required],
        age: ['', [Validators.required, Validators.maxLength(3)]],
        specialization: ['', Validators.required],
        qualification: ['', Validators.required]
      }
    );
    this.form.controls['physicianName'].disable();
    this.consData = [
      { physicianName: "Stanley Byrd", specialization: "Pediatrics", qualification: "qual1", age: 21 },
      { physicianName: "June Carr", specialization: "Pediatrics", qualification: "qual2", age: 21 },
      { physicianName: "Percy Foster", specialization: "Pediatrics", qualification: "qual3", age: 21 }
    ]
  }

  onItemSelect(item: any) {
    console.log(item);
    this.dropDownValue = item
    // this.isItemSelected = true;
  }

  onSubmit(): void {
    this.setStatus();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.consData.forEach((item: any) => {
        if (this.form.controls['physicianName'].value === item.physicianName) {
          item.physicianName = this.form.controls['physicianName'].value;
          item.age = this.form.controls['age'].value;
          item.specialization = this.form.controls['specialization'].value;
          item.qualification = this.form.controls['qualification'].value;
        }
      }
      )
      console.log(this.consData)
    }



  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  setClass() {
    // this.setStatus();
    if (this.dropDownValue === '' && this.requiredField) { return 'invalidField' }
    else { return; }
  }

  setStatus() {
    this.requiredField = true;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.selectedItems = [];
    // this.form.controls['PatientName'].Validators
    this.form.controls['physicianName'].setErrors(null);
    this.form.controls['qualification'].setErrors(null);
    this.form.controls['age'].setErrors(null);
  }

  rowData(data: any): void {
    console.log(data)
    this.form.controls['physicianName'].setValue(data.physicianName)
    this.form.controls['qualification'].setValue(data.qualification);
    this.form.controls['age'].setValue(data.age);
    this.form.controls['specialization'].setValue(data.specialization);
    this.dropDownValue = data.specialization
  }
}
