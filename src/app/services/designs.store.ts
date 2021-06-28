import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Design, sortDesignesByDesignId} from '../model/design';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messages/messages.service';


@Injectable({
  providedIn: 'root'
})
export class DesignsStore {

  private subject = new BehaviorSubject<Design[]>([]);

  courses$: Observable<Design[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService) {

    this.loadFirstDesignes();
  }

  private loadFirstDesignes() {

    const loadDesignes$ = this.http.get<Design[]>('https://www.cross-stitch-pattern.net/api/Albums/GetLastDesignsJson')
      .pipe(
        map(response => response),
        catchError(err => {
          const message = 'Could not load desighs';
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(designs => {
          this.subject.next(designs);
          console.log(designs);
        })
      );

    this.loading.showLoaderUntilCompleted(loadDesignes$)
      .subscribe();

  }

}
