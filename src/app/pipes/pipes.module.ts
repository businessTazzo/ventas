import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicadoPipe } from './publicado.pipe';



@NgModule({
  declarations: [
    PublicadoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [PublicadoPipe]
})
export class PipesModule { }
