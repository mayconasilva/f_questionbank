import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrixEditorValueAccessorDirective } from './trix-editor-value-accessor';

@NgModule({
  declarations: [TrixEditorValueAccessorDirective],
  imports: [CommonModule],
  exports: [TrixEditorValueAccessorDirective]
})
export class TrixEditorModule {}
