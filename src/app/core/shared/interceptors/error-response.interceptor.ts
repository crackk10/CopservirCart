import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(catchError(handleErrorResponse))

function handleErrorResponse(error:HttpErrorResponse) {
  const errorResponse = `${error.status}, ${error.error.message}`;
  
 // console.error('MyError', errorResponse); // Esto imprime el error en la consola.
  return throwError(() => new Error(errorResponse)); // Retorna el error para manejarlo más adelante.
}