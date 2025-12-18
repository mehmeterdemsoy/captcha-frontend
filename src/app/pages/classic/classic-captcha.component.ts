import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-classic-captcha',
  templateUrl: './classic-captcha.component.html',
  styleUrls: ['./classic-captcha.component.css'],
})
export class ClassicCaptchaComponent {
  instruction = 'Klik op de afbeelding met een kat';

  // Replace these with your own images later
  images = [
    { src: '/assets/dog.jpg', label: 'dog' },
    { src: '/assets/cat.jpg', label: 'cat' },
    { src: '/assets/bird.jpg', label: 'bird' },
  ];

  shuffled = [...this.images];
  message = '';

  constructor() {
    this.shuffle();
  }

  shuffle() {
    this.shuffled = [...this.images].sort(() => Math.random() - 0.5);
  }

  select(img: any) {
    if (img.label === 'cat') {
      this.message = '✔ Correct! You are human.';
    } else {
      this.message = '✘ Incorrect. Try again.';
      this.shuffle();
    }
  }
}
