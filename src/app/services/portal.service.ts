import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private targets: Map<string, ViewContainerRef>;

  constructor() {
    this.targets = new Map<string, ViewContainerRef>();
  }

  addTarget(targetName: string, container: ViewContainerRef) {
    this.targets.set(targetName, container);
  }

  attach(targetName: string, template: TemplateRef<any>) {
    this.targets.get(targetName)?.createEmbeddedView(template);
  }

  clear(targetName: string) {
    this.targets.get(targetName)?.clear();
  }
}
