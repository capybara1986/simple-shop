import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";

import { ResponsiveSidenavDirective } from "./responsive-sidenav.directive";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ResponsiveSidenavDirective],
  imports: [CommonModule, RouterModule, LayoutModule, MatSidenavModule],
  exports: [ResponsiveSidenavDirective]
})
export class ResponsiveSidenavModule {}
