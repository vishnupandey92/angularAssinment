import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routerConstant } from '../../../constant/routerConstant';
import { Store } from '@ngrx/store';
import { CounterState } from '../../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { selectTotalCounters } from '../../../../state/counter/counter.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  store = inject(Store<CounterState>)
  totalCounters$!: Observable<number>;
  routerConstant = routerConstant

  ngOnInit(): void {
    this.totalCounters$ = this.store.select(selectTotalCounters);
  }
  
}
