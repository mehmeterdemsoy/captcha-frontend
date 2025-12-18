import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CaptchaService {
  private backendUrl = 'http://localhost:8000/verify';

  constructor(private http: HttpClient) {}

  sendImage(blob: Blob): Observable<any> {
    const form = new FormData();
    form.append('image', blob, 'capture.png');
    return this.http.post(this.backendUrl, form);
  }
}
