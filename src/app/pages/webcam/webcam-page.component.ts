import { Component, ElementRef, ViewChild } from '@angular/core';
import { CaptchaService } from '../../services/captcha.service';

@Component({
  standalone: true,
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

  capture() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;

      this.status = 'Verifying...';

      this.captchaService.sendImage(blob).subscribe({
        next: (res) =>
          (this.status =
            'Human detected: ' +
            res.human_detected +
            ' | confidence=' +
            res.confidence),
        error: () => (this.status = 'Request failed'),
      });
    });
  }
}
