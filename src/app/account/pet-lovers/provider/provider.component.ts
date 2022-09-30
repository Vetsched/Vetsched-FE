import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  @Input() serviceProvider: any = {};
  @Input() index: number | undefined;
  constructor() {}

  ngOnInit(): void {}
}
