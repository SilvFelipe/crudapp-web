import { TutorialService } from './../../services/tutorial.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() searchTitle = new EventEmitter();

  constructor(private service: TutorialService) { }

  ngOnInit(): void {
  }

  onChange(title: string) {
    this.service.setTitle(title);
  }

}
