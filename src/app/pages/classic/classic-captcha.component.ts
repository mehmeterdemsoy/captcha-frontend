import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-classic-captcha',
  imports: [CommonModule, FormsModule],
  templateUrl: './classic-captcha.component.html'
})
export class ClassicCaptchaComponent {

  instruction = 'Klik op de afbeelding met een kat';

  // Replace these with your own images later
  images = [
    { src: '/assets/dog.jpeg', label: 'dog' },
    { src: '/assets/cat.jpeg', label: 'cat' },
    { src: '/assets/bird.jpeg', label: 'bird' },
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
