import { Component, ElementRef, ViewChild } from '@angular/core';
import {CaptchaService, VerifyResult} from '../../services/captcha.service';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-webcam-page',
  templateUrl: './webcam-page.component.html',
  styleUrls: ['./webcam-page.component.css'],
})
export class WebcamPageComponent {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  streaming = false;
  status = '';

  constructor(private captchaService: CaptchaService) {}

  async startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoRef.nativeElement.srcObject = stream;
    this.videoRef.nativeElement.play();
    this.streaming = true;
  }

  stopCamera() {
    const stream = this.videoRef.nativeElement.srcObject as MediaStream;
    stream?.getTracks().forEach((t) => t.stop());
    this.streaming = false;
  }


  result?: VerifyResult;
  loading = false;

  captureAndVerify(): void {
    const video = this.videoRef.nativeElement as HTMLVideoElement;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob: Blob | null) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');

      this.loading = true;

      this.captchaService.verifyImage(formData)
        .subscribe({
          next: (res: VerifyResult) => {
            this.result = res;
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Verification failed', err);
            this.loading = false;
          }
        });
    }, 'image/jpeg');
  }
}
