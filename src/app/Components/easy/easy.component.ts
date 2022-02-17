import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css']
})
export class EasyComponent implements OnInit {

  x: any;
  constructor() {

  }

  ngOnInit(): void {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MatchOrNot(180, cards);
    let diffButton = document.getElementById('playButton');

    diffButton?.addEventListener('click', () => {
      game.restart();
    });


    overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
        game.startGame();
      });
    });

    cards.forEach(card => {
      card.addEventListener('click', () => {
        game.flipCard(card);
      });
    });
  }
  restart() {
    this.x = document.getElementById('seconds');
    this.x.innerText = 180;
  }
}

class AudioController {

  matchSound: HTMLAudioElement;
  flipSound: HTMLAudioElement;
  victorySound: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;

  constructor() {
    this.flipSound = new Audio('assets/audio/flip.wav');
    this.matchSound = new Audio('assets/audio/match.wav');
    this.victorySound = new Audio('assets/audio/victory.wav');
    this.gameOverSound = new Audio('assets/audio/gameOver.wav');
  }

  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.victorySound.play();
  }
  gameOver() {
    this.gameOverSound.play();
  }
}


class MatchOrNot {
  cardsArray: any;
  totalTime: any;
  timeRemaining: any;
  cardToCheck: any;
  timer: any;
  ticker: any;
  errorValue: any;
  audioController: AudioController;
  matchedCards: any;
  totalClicks: any;
  busy: any;
  countDown: any;
  error: any;
  gameOverTime: any;
  gameOverFlip: any;
  gameOverError: any;


  constructor(totalTime: any, cards: any) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('seconds');
    this.ticker = document.getElementById('flip');
    this.errorValue = document.getElementById('error');
    this.audioController = new AudioController();
    this.gameOverTime = document.getElementById('game-over-time');
    this.gameOverFlip = document.getElementById('game-over-flip');
    this.gameOverError = document.getElementById('game-over-error');
    this.error = 0;
  }

  restart() {
    clearInterval(this.countDown);
    this.gameOverTime.innerText = 0;
    this.gameOverFlip.innerText = this.totalClicks;
    this.gameOverError.innerText = this.error;
    this.hideCards();
  }

  startGame() {
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
    this.error = 0;


    setTimeout(() => {
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
    this.errorValue.innerText = this.error;
  }

  hideCards() {
    this.cardsArray.forEach((card: { classList: { remove: (arg0: string) => void; }; }) => {
      card.classList.remove('visible');
      card.classList.remove('matched');
    });
  }

  flipCard(card: Element) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add('visible');

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      }
      else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardMatch(card: Element) {
    if (this.getCardType(card) == this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    }
    else {
      this.cardMisMatch(card, this.cardToCheck);
    }
    this.cardToCheck = null;
  }

  cardMatch(card1: Element, card2: Element) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    this.audioController.match();
    if (this.matchedCards.length === this.cardsArray.length) {
      this.gameOverTime.innerText = 180 - this.timeRemaining;
      this.gameOverFlip.innerText = this.totalClicks;
      this.gameOverError.innerText = this.error;
      this.victory();
    }
  }

  cardMisMatch(card1: Element, card2: Element) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;
      this.error++;
      this.errorValue.innerText = this.error;
    }, 1000);
  }


  getCardType(card: any) {
    return card.getElementsByClassName('card-value')[0].src;
  }
  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining == 0) {
        this.gameOver();
      }
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countDown);
    this.audioController.gameOver();
    this.gameOverTime.innerText = 0;
    this.gameOverFlip.innerText = this.totalClicks;
    this.gameOverError.innerText = this.error;
    document.getElementById('game-over-text')?.classList.add('visible');
    this.hideCards();
  }

  victory() {
    clearInterval(this.countDown);
    this.audioController.victory();
    document.getElementById('victory-text')?.classList.add('visible');
    this.hideCards();
  }

  shuffleCards() { // Fisher-Yates Shuffle Algorithm.
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      this.cardsArray[randIndex].style.order = i;
      this.cardsArray[i].style.order = randIndex;
    }
  }

  canFlipCard(card: Element) {
    return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
  }
}