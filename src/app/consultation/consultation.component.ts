import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})

export class ConsultationComponent implements OnInit {
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
  PatientName: any;
  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { }


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        PatientName: ['', Validators.required],
        age: ['', [Validators.required, Validators.maxLength(3)]],
        phyName: ['', Validators.required],
        testsList: ['', Validators.required]
      }
    );

    // this.form.controls.PatientName.setValue('abc');

    this.dropdownList = [
      { item_id: 1, item_text: 'CBC' },
      { item_id: 2, item_text: 'Chemistry' },
      { item_id: 3, item_text: 'RTC' },
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.consData = [{ patientName: "Beverly Hogan", physName: "Albert", prescTest: "CBC, Chemistry" },
    { patientName: "Glenn French", physName: "Cesar Quinn", prescTest: "Chemistry, CBC" },
    { patientName: "Derek Harper", physName: "Roger Hardy", prescTest: "RTC, RTC" },
    { patientName: "Dora Simpson", physName: "Stanley Byrd", prescTest: "CBC, RTC" }
    ]
    this.setStatus();
    this.piechart()

  }

  piechart() {
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    // chart.scrollbarX = new am4core.Scrollbar();
    chart.data = [{
      "test": "CBC",
      "value": 60,
      "color": am4core.color("#FFE4B5")
    }, {
      "test": "Chemistry",
      "value": 30,
      "color": am4core.color("#6495ED")
    }, {
      "test": "RTC",
      "value": 10,
      "color": am4core.color("#32CD32")
    }];
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "test";
    chart.legend = new am4charts.Legend();
    pieSeries.slices.template.propertyFields.fill = "color";
  }

  onItemSelect(item: any) {
    console.log(item);
    this.isItemSelected = true;
  }

  onItemDeSelect(item: any) {
    console.log(item);
    this.selectedItems.length > 0 ? this.isItemSelected = true : this.isItemSelected = false;
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.selectedItems.length > 0 ? this.isItemSelected = true : this.isItemSelected = false;
      return;
    }
    else {
      this.newList = [];
      this.form.value.testsList.forEach((element: any) => {
        this.newList.push(element.item_text);
      });
      const newRow = {
        patientName: this.form.value.PatientName,
        physName: this.form.value.phyName,
        age: this.form.value.age,
        prescTest: this.newList.toString()
      }
      this.consData.push(newRow);
    }



  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  setClass() {
    this.setStatus();
    if (!this.isItemSelected) { return 'invalidField' }
    else { return; }
  }

  setStatus() {
    (this.selectedItems.length > 0) ? this.requiredField = true : this.requiredField = false;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.selectedItems = [];
    // this.form.controls['PatientName'].Validators
    this.form.controls['PatientName'].setErrors(null);
    this.form.controls['physName'].setErrors(null);
    this.form.controls['age'].setErrors(null);
  }

}
