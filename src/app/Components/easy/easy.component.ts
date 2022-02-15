import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css']
})
export class EasyComponent implements OnInit {

  
  constructor() {
    
  }

  ngOnInit(): void {
      let overlays = Array.from(document.getElementsByClassName('overlay-text'));
      let cards = Array.from(document.getElementsByClassName('card'));
      

      overlays.forEach(overlay =>{
        overlay.addEventListener('click',()=>{
          overlay.classList.remove('visible');
          // game.startGame();
        });
      });
      
      cards.forEach(card => {
        card.addEventListener('click', () => {
          // game.flipCard(card);
        });
    });
  }

  
  
  onStart() {}
  
}

class AudioController{
  
  matchSound: HTMLAudioElement;
  flipSound: HTMLAudioElement;
  victorySound: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;
 
  constructor(){
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