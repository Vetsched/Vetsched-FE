import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit, OnChanges {
  @Input() serviceProvider: any = {};
  @Input() index: number | undefined;
  @Input() sendRequest:boolean = false;
  @Output() request:EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {}
  sendRequestToProvider(): void {
    this.request.emit(this.serviceProvider);
  }
}
