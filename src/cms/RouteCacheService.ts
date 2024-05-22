import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomReuseStrategy } from './RouteReuseStrategy';

@Injectable({
  providedIn: 'root',
})
export class RouteCacheService {
  constructor(private router: Router) {}

  clearCache(routePath: string): void {
    const reuseStrategy = this.router
      .routeReuseStrategy as CustomReuseStrategy;
    if (reuseStrategy.handlers[routePath]) {
      delete reuseStrategy.handlers[routePath];
    }
  }
}
