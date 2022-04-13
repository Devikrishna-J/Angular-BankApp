import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent implements OnInit {

  @Input() item: string|undefined                 //to communicate b/w parent to child component create an Input Decorator ; 'item' is an element which holding 'acno' from parent using property binding 
  @Output() onCancel = new EventEmitter()         //to communicate b/w child to parent component create an Output Decorator ; here onCancel is a userdefined event 
  @Output() onDelete = new EventEmitter()         //to communicate b/w child to parent component create an Output Decorator ; here onDelete is a userdefined event 
  constructor() { }

  ngOnInit(): void {
  }
  delete(){
    this.onDelete.emit(this.item) 
  }
  cancel(){
   
    this.onCancel.emit() 
  }
}
