
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {

        constructor( private spinnerSvc: SpinnerService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
            this.spinnerSvc.show();
            return next.handle(req).pipe( finalize( () => this.spinnerSvc.hide() ))
    }
    
}
