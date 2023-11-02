import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Art, ArtWork, ArtWorks, Arts, Pagination } from '../interfaces/art';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArtService {
  artWork: ArtWork[] = [];
  pagination! : Pagination;

  artWorkUrl: string = 'https://api.artic.edu/api/v1/artworks/';
  params: string[] = [
    'id',
    'title',
    'artist_title',
    'date_display',
    'place_of_origin',
    'description',
    'dimensions',
    'image_id',
  ];

  constructor(private http: HttpClient) {}

  getImageBasedOnUrl = (image_id: String) =>
    `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;

  getArtWork(): Observable<ArtWorks> {
    return this.http
      .get<ArtWorks>(this.artWorkUrl, {
        params: { fields: this.params.join(',') },
      })
      .pipe(
        tap((artWork) => {
          this.artWork = artWork.data;
          this.pagination = artWork.pagination;
        }),
        catchError(this.handleError)
      );
  }

  getArtWorkBasedOnId(id : String) : Observable<Art>{
    return this.http.get<Art>(this.artWorkUrl + id).pipe(
      catchError(this.handleError)
    )
  }

  getArtWorkBasedOnSearch(): Observable<Arts>{
    return this.http.get<Arts>(this.artWorkUrl+"search" , {
      params : {
        fields: this.params.join(','),
      }
    })
  }

  getArtWorkBasedOnPage(limit: string, page: string): Observable<Arts> {
    return this.http
      .get<Arts>(this.artWorkUrl, {
        params: {
          fields: this.params.join(','),
          page: page,
          limit: limit,
        },
      })
      .pipe(tap((data) => console.log(data)));
  }

  private handleError(err: HttpErrorResponse) {
    let error = '';
    if (err.error instanceof ErrorEvent) {
      error = `An error occured in ${err.error.message}`;
    } else {
      error = `Server returned with error ${err.status} and ${err.message}`;
    }
    console.log(error);
    return throwError(() => error);
  }
}
