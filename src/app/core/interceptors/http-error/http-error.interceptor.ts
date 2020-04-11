import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private modalService: ModalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(catchError(err => {
        console.log(err);

        if (err.status === 401 && err.error.message === 'Unauthenticated.') {
            // auto logout if 401 response returned from api
            // this.authenticationService.logout();
            // this.toastr.error('Session expired.');
            setTimeout( () => {
                location.reload(true);
            }, 2000);
            console.log(err.message);
            this.authService.clearData();
            this.modalService.toast('Not logged in!');

        }else if(err.status == 404){
          this.modalService.toast('Resource not found.', 'Oops!', 'error');
        }
        // else if(err.status == 0){
        //   this.modalService.toast('Server not available.', 'Oops!', 'error');
        // }
        else if(!(err.status == 401 || err.status == 422)) {
          console.log(err.error.message || err.statusText);
          this.modalService.toast('Something went wrong :(', 'Oops!', 'error');
        }

        return throwError(err);
    }));
  }
}
