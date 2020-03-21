import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ICurso } from '../../model/curso';

const apiUrl = 'http://localhost:3000/cursos';
const apiUrlPost = 'http://localhost:3000/post';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCursos(id: any): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(apiUrl).pipe(
      tap(data => console.log('leu os curso')),
      catchError(this.handleError('getCursos', []))
    );
  }

  addCurso(curso: any): Observable<any> {
    return this.http.post<any>(apiUrlPost, curso, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((curso: any) => console.log(`adicionou o curso com w/ id=${curso}`)),
      catchError(this.handleError<any>('addCurso'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
