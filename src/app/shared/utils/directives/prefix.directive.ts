import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPrefix]'
})
export class PrefixDirective implements AfterViewInit{

  @Input() prefixNumber: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2 ) {
  }

  ngAfterViewInit() {
    this.renderer.setProperty(this.el.nativeElement.querySelector('.mat-mdc-list-item-unscoped-content'), 'textContent', this.numberToLetter() + ". " + this.el.nativeElement.textContent);
  }

  private numberToLetter(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.prefixNumber >= 0 && this.prefixNumber < alphabet.length) {
      return alphabet.charAt(this.prefixNumber);
    } else {
      return '';
    }
  }


}
