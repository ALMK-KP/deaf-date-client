import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { PortalService } from '../services/portal.service';

@Directive({
  selector: '[appAttachTo]',
  standalone: true,
})
export class AttachToDirective implements OnInit, OnDestroy {
  @Input('appAttachTo') targetName: string;

  constructor(
    private template: TemplateRef<any>,
    private portal: PortalService,
  ) {}

  ngOnInit() {
    this.portal.attach(this.targetName, this.template);
  }

  ngOnDestroy() {
    this.portal.clear(this.targetName);
  }
}
