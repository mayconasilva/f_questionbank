import { Directive, forwardRef, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: 'trix-editor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrixEditorValueAccessorDirective),
      multi: true,
    },
  ],
})
export class TrixEditorValueAccessorDirective implements ControlValueAccessor {
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private elementRef: ElementRef) {}

  writeValue(value: any): void {
    const editor = this.elementRef.nativeElement.editor;
    if (editor) {
      editor.loadHTML(value || '');
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 100); // Aguarda 100ms e tenta novamente
    }
  }
  

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('trix-change', ['$event'])
  onTrixChange(event: any): void {
    const value = this.elementRef.nativeElement.innerHTML;
    this.onChange(value);
  }

  @HostListener('blur')
  onTrixTouched(): void {
    this.onTouched();
  }
}
