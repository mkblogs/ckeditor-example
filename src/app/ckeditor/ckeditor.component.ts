import {ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor } from "ckeditor5";
import { editorConfig } from "./editor.config";
import { Account } from "../app.component";

@Component({
  selector: 'app-ckeditor',
  standalone: true,
    imports: [CommonModule, CKEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CkeditorComponent implements OnInit{

  constructor(private controlContainer: ControlContainer,
    private changeDetector: ChangeDetectorRef) {
    }
 
  protected readonly Editor = ClassicEditor;
  isDisabled = false;
  config = editorConfig
  @Input() fieldname!: string;
  @Input() selectedObject: any | null = null;
 
  ngOnInit(): void {
    let fieldname = null;
    if (this.selectedObject != null){
      fieldname = this.selectedObject[this.fieldname];
    }
    if (this.fieldname != null) {      
      this.parentFormGroup.addControl(this.fieldname , new FormControl(fieldname)); 
    } else {
      this.parentFormGroup.addControl(this.fieldname , new FormControl('')); 
    }    
  }
  
  ngAfterViewInit(): void {
    
  }
  
  get parentFormGroup() {
    return this.controlContainer.control as FormGroup;
  }

  getFormControl(controlname: string) : FormControl{
    let object: FormControl = this.parentFormGroup.get(controlname) as FormControl;
    return object;
  }

}
