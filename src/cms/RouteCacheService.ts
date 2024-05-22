import { ComponentRef, Injectable } from '@angular/core';
import { DetachedRouteHandle, OutletContext, Router } from '@angular/router';
import { CustomReuseStrategy } from './RouteReuseStrategy';

@Injectable({
  providedIn: 'root',
})
export class RouteCacheService {
  constructor(private router: Router) {}

  private deactivateOutlet(handle: DetachedRouteHandle): void {
    const componentRef: ComponentRef<any> = handle['componentRef'];
    if (componentRef) {
      componentRef.destroy();
    }

    let contexts: Map<string, OutletContext> = handle['contexts'];
    contexts.forEach((context: OutletContext, key: string) => {
      if (context.outlet) {
        // Destroy the component
        context.outlet.deactivate();
        // Destroy the contexts for all the outlets that were in the component
        context.children.onOutletDeactivated();
      }
    });
  }

  clearCache(routePath: string): void {
    if ((window as any).handlers[routePath]) {
      let asd = (window as any).handlers[routePath];
      delete (window as any).handlers[routePath];
      this.deactivateOutlet(asd);
    }
  }
}
