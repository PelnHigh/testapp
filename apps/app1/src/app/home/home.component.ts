import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteCacheService } from 'src/cms/RouteCacheService';
import { CustomReuseStrategy } from 'src/cms/RouteReuseStrategy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
