import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface VideoItem {
  _id: string,
  title: string,
  description: string,
  link: string,
  owner: string,
  createdAt: string,
  updatedAt: string
}

interface VideoItemAdd {
  title: string,
  description: string,
  link: string,
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrlApi = 'https://video-tecks-backend-aqh8.onrender.com/api/video/';
  private dataSubject = new Subject<VideoItem[]>();
  public data$ = this.dataSubject.asObservable();
  public data: VideoItem[] = []

  constructor(private http: HttpClient) {
    this.getVideo();
  }


  getDataSubject(): Observable<VideoItem[]> {
    return this.dataSubject.asObservable();
  }

  getVideo() {
  return this.http.get<VideoItem[]>(this.baseUrlApi).pipe(
    tap(data => {
          
      this.dataSubject.next(data);
    })
  );
}

   addVideo(payload: VideoItemAdd): Observable<VideoItem> {
    return this.http.post<VideoItem>(this.baseUrlApi, payload).pipe(
      tap(() => {
        this.getVideo().pipe(
        tap(data => {
          
      this.dataSubject.next(data);
    })
  );
      })
    );
  }


  update(): void {
    
  }
  
  deleteVideo(id: string): void {
    this.http.delete(`${this.baseUrlApi}${id}`)
      .pipe(
    tap(() => {
      // Оновлюємо дані після успішного видалення
      this.getVideo().subscribe(
        data => {
          this.dataSubject.next(data); // Оновлюємо dataSubject з новими даними
        },
        error => {
          console.error('Помилка при оновленні відео після видалення:', error);
        }
      );
    })
  ).subscribe(
    () => {
      console.log('Відео успішно видалено');
    },
    error => {
      console.error('Помилка при видаленні відео:', error);
    }
  );
}

  
  
}

