import { Tutorial } from './../../model/tutorial';
import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs';


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

  title?: string;

  constructor(private service: TutorialService) { }

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

}
