import { Component } from '@angular/core';

/**
 * 默认布局组件
 */
@Component({
  selector: 'app1-root-actual',
  templateUrl: './default-layout.component.html',
  host: {
    '[class.default-layout]': 'true',
  },
})
export class DefaultLayoutComponent {}
