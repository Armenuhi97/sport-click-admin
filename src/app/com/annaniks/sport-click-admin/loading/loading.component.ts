import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  private _show = false;
  private _subscription: Subscription;

  constructor(
    private _loadingService: LoadingService
  ) { }

  ngOnInit() {
    this._subscription = this._loadingService.getLoaderState()
      .subscribe((state: { show: boolean }) => {
        this._show = state.show;
      });
  }
  public closeLoading() {
    this._loadingService.hideLoading();
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  get show(): boolean {
    return this._show;
  }

}
