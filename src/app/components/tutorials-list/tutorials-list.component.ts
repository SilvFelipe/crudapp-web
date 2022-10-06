import { Tutorial } from './../../model/tutorial';
import { TutorialService } from './../../services/tutorial.service';
import { Component, Input, OnInit } from '@angular/core';
import { find } from 'rxjs';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';


@Component({
  selector: 'tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})

export class TutorialsListComponent implements OnInit {

  tutorials!: Tutorial[];
  checkedItems: number[] = [];
  checkAll: boolean = false;
  checkAllHeader: boolean = false;
  modal: any;

  title?: string;


  constructor(private service: TutorialService,
    private serviceModal: NgbModal,
    private config: NgbModalConfig) {
      config.backdrop = true;
      config.keyboard = false;
      config.animation = true;
      config.ariaLabelledBy = "modalLabel";
     }

  ngOnInit(): void {
    this.service.currentTitle.subscribe(title =>
      this.findAll(title));
  }

  findAll(title: string) {
    this.title = title;
    if(title == ''){
      console.log(title);
      this.service.findAll().subscribe(res => {
        this.tutorials = res
      });
    } else{
      this.service.findByTitle(title).subscribe(res =>
        this.tutorials = res
      )};
  }

  checkedTutorials(id: number) {
    if(this.alreadyChecked(id)){
      this.checkedItems = this.checkedItems.filter(item =>
        item != id);
    } else {
      this.checkedItems.push(id);
    }
    if(this.checkedItems.length == this.tutorials.length) {
      this.checkAllHeader = true;
      this.checkAll = true;
    } else {
      this.checkAllHeader = false;
    }
    console.log(this.checkedItems);
    console.log("All - "+this.checkAll);
    console.log("Header - "+this.checkAllHeader);
  }

  alreadyChecked(id: number) {
    if(this.checkedItems.includes(id)){
      return true;
    }
    return false;
  }

  turnAllCheckboxes(){
    this.checkAll = !this.checkAll;
    if(this.checkAll){
      this.checkedItems = this.tutorials.map(tutorial =>
        tutorial.idTutorial);
    } else {
      this.checkedItems = [];
    }
    console.log(this.checkedItems);
    console.log("All - "+this.checkAll);
    console.log("Header - "+this.checkAllHeader);
  }

  setTitle() {

  }

  open() {
    const modalRef = this.serviceModal.open(TutorialDetailsComponent);
    modalRef.componentInstance.name = 'World';
  }

}
