import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error:HttpErrorResponse) => {
      if(error.status === 401){
        // Handle unauthorized error
        console.error('Unauthorized access - 401');
      }
      if(error.status === 404){
        // Handle not found error
        console.log('hhhhhResource not found - 404');
      }
      return throwError(() => error);
    })
    
  );
};
