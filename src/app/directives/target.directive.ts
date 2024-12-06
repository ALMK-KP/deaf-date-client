import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { PortalService } from '../services/portal.service';

@Directive({
  selector: '[appTarget]',
  standalone: true,
})
export class TargetDirective implements OnInit {
  @Input('appTarget') targetName: string;

  constructor(
    private vcr: ViewContainerRef,
    private portal: PortalService,
  ) {}

  ngOnInit() {
    this.portal.addTarget(this.targetName, this.vcr);
  }
}
