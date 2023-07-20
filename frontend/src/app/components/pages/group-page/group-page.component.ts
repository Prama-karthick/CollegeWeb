import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Products } from 'src/app/shared/Product';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  loading!: boolean;

  

  ngOnInit(): void {
    this.loading=true;

    delay(5000)

    this.loading=false;

  }
}
