import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() request:any = {};
  @Input() index:number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
