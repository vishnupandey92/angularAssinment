import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addCounter, decrementCounter, deleteCounter, incrementCounter, resetCounters } from '../../state/counter/counter.action';
import { selectAllCounters} from '../../state/counter/counter.selector';
import { AsyncPipe } from '@angular/common';
import { CounterState } from '../../core/interfaces/interfaces';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  store = inject(Store<CounterState>)
  allCounters$!: Observable<any[]>;

  ngOnInit() {
    this.allCounters$ = this.store.select(selectAllCounters);
  }

  onAddCounter() {
    this.store.dispatch(addCounter());
  }

  onIncrement(id: number) {
    this.store.dispatch(incrementCounter({ id }));
  }

  onDecrement(id: number) {
    this.store.dispatch(decrementCounter({ id }));
  }

  onDelete(id: number) {
    this.store.dispatch(deleteCounter({ id }));
  }

  onReset() {
    this.store.dispatch(resetCounters());
  }
}
