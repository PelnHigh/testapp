import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  OutletContext,
} from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  public handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Customize this condition to specify which routes should be cached
    return true;
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    this.handlers[(route as any)._routerState.url] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!(route as any).routeConfig && !!this.handlers[(route as any)._routerState.url!];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!(route as any).routeConfig || !this.handlers[(route as any)._routerState.url!]) {
      return null;
    }
    return this.handlers[(route as any)._routerState.url!];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if(future?.routeConfig?.component.name === 'EmptyComponent' || !future.routeConfig){
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}
