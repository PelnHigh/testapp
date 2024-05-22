import { Component, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { ApplicationStatus, Planet, SwitchModes } from '@worktile/planet';
import { filter } from 'rxjs/operators';
import { RouteCacheService } from 'src/cms/RouteCacheService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  activatedMenuIndex = -1;
  menus: any[] = [];
  tabs: { path: string; title: string }[] = [];
  get loadingDone() {
    return this.planet.loadingDone;
  }

  constructor(
    private routeCacheService: RouteCacheService,
    private planet: Planet,
    private router: Router
  ) {
    this.planet.setOptions({
      switchMode: SwitchModes.coexist,
      errorHandler: (error) => {
        console.error(`Failed to load resource, error:`, error);
      },
    });

    this.planet.registerApps([
      {
        name: 'app1',
        hostParent: '#app-host-container',
        hostClass: 'thy-layout',
        routerPathPrefix: '/app1',
        selector: 'app1-root',
        resourcePathPrefix: 'static/app1/',
        preload: true,
        scripts: ['main.js'],
        styles: [],
      },
    ]);
    this.planet.start();

    this.planet.appStatusChange.subscribe((data) => {
      //console.log(data);
      if (data.status == ApplicationStatus.loadError) {
        console.error('Error al cargar aplicación');
      }
    });
    this.planet.appsLoadingStart.subscribe((event) => {
      //console.log(event);
      let activeAppNames = event.shouldLoadApps.map((item) => item.name);
      console.log(`Active app names: ${activeAppNames.join(',')}`);
    });

    this.router.events
      .pipe(filter((e) => e instanceof ActivationEnd))
      .subscribe((e) => {
        const thisEvt = <ActivationEnd>e;
        const activatedRoutePath = thisEvt.snapshot.routeConfig?.path;
        const routeData = thisEvt.snapshot.routeConfig?.data;
        let menuTitle = '新标签页';
        if (routeData) {
          menuTitle = routeData['title'];
        }
        let isExist = false;
        this.tabs.every((t, i) => {
          if (activatedRoutePath === t.path) {
            this.activatedMenuIndex = i;
            isExist = true;
            return false;
          }
          return true;
        });

        if (!isExist) {
          this.activeMenu(activatedRoutePath, menuTitle);
        }
      });
  }

  activeMenu(menuPath: string | undefined, menuTitle: string): void {
    if (!menuPath) return;
    let menuIndex = -1;
    this.tabs.every((t, i) => {
      if (menuPath === t.path) {
        menuIndex = i;
        return false;
      }
      return true;
    });

    if (menuIndex === -1) {
      this.tabs.push({ path: menuPath, title: menuTitle });
      menuIndex = this.tabs.length - 1;
      this.activatedMenuIndex = menuIndex;
    }
  }

  activeRoute(path: string): void {
    this.router.navigateByUrl(path).finally();
  }

  toggleTab(path: string): void {
    this.activeRoute(path);
  }

  toggleTheme(): void {
    // this.themeService.toggleTheme().then();
  }

  closeTab(path: string): void {
    if (1 === this.tabs.length) return;

    let selectedIndex = -1;
    this.tabs.every((t, i) => {
      if (t.path === path) {
        selectedIndex = i;
        return false;
      }

      return true;
    });
    this.tabs.splice(selectedIndex, 1);

    if (selectedIndex === this.activatedMenuIndex) {
      let prevIndex = this.activatedMenuIndex - 1;
      this.activatedMenuIndex = prevIndex > 0 ? prevIndex : 0;
      this.activeRoute(this.tabs[this.activatedMenuIndex].path);
    } else if (this.activatedMenuIndex > selectedIndex) {
      this.activatedMenuIndex -= 1;
    }

    setTimeout(() => {
      this.routeCacheService.clearCache(path);
      // this.routeCacheService.clearAllRouteCache();
    }, 100);
  }

  ngOnInit(): void {}
}
