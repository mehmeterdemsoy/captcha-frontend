import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface VerifyResult {
  request_id: string;
  human_detected: boolean;
  spoof_flagged: boolean;
  confidence: number;
  processing_ms: number;
}

@Injectable({ providedIn: 'root' })
export class CaptchaService {

  private api = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  verifyImage(data: FormData) {
    return this.http.post<VerifyResult>(
      `${this.api}/verify`,
      data
    );
  }
}

