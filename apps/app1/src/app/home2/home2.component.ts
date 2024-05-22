import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteCacheService } from 'src/cms/RouteCacheService';
import { CustomReuseStrategy } from 'src/cms/RouteReuseStrategy';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private routeCacheService: RouteCacheService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('执行销毁');
    debugger;
  }
}
