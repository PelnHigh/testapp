import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-page5',
  templateUrl: './page5.component.html',
  styleUrls: ['./page5.component.scss']
})
export class Page5Component implements OnInit ,OnDestroy{

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    debugger;
  }
}
