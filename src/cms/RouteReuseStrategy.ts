import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  OutletContext,
} from '@angular/router';
(window as any).handlers = {};

export class CustomReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Customize this condition to specify which routes should be cached
    return true;
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (handle) {
      if (
        handle &&
        (handle as any).componentRef.componentType.name === 'EmptyComponent'
      ) {
        return;
      }
      (window as any).handlers[(route as any)._routerState.url] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return (
      !!(route as any).routeConfig &&
      !!(window as any).handlers[(route as any)._routerState.url!]
    );
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (
      !(route as any).routeConfig ||
      !(window as any).handlers[(route as any)._routerState.url!]
    ) {
      return null;
    }
    return (window as any).handlers[(route as any)._routerState.url!];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (
      future?.routeConfig?.component.name === 'EmptyComponent' ||
      !future.routeConfig
    ) {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}
