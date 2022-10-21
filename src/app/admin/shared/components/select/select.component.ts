import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() selctedValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
  detectChanges(event: any) {
    this.selctedValue.emit(event);
  }
  detectChanges(value: any): void {
    this.selctedValue.emit(value);
  }
}
