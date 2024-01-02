export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
    this.totalTime = 0;
  }
  init() {
    // Initialize the audio context here
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  
    // Check if the audio file is already loaded in the cache
    if (!this.cache.audio.exists('Gameover')) {
      // Load the audio file
      this.load.audio('Gameover', '../assets/gameover.mp3');
      this.load.audio('backgroundMusic', '../assets/Win.mp3');
    }
  }

  preload() {
    // Load your background image
    this.load.image("GameOverBG", "../assets/Gameover.png");
    this.load.image("ExitButton", "../assets/exit_button.png");
    // Trước hết, tải bản nhạc
    this.load.audio('Gameover', '../assets/gameover.mp3');
  }

  create() {
    // Check if the audio file is loaded in the cache
    if (this.cache.audio.exists('Gameover')) {
      // Create the background music
      this.music = this.sound.add('Gameover', { volume: 0.7, loop: true });
      this.music.play();
    } else {
      console.error('Audio file "Gameover" not found in the cache.');
    }
  
    // Access total time from scene settings
    const totalTime = this.scene.settings.data.totalTime;
  
    // Add background image
    const bg = this.add.image(0, 0, "GameOverBG");
    bg.setOrigin(0, 0);
  
    // Tạo nút thoát
    const exitButton = this.add.image(
      this.sys.game.config.width - 50,
      50,
      "ExitButton"
    ).setInteractive();
  
    exitButton.on('pointerup', function () {
      this.handleExitGame(); // Gọi hàm xử lý thoát game
    }, this);
  
    // Add your game over message or any other content for the new scene
    const gameoverText = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 300,
      'Thật tiếc! Bạn không hoàn thành được nhiệm vụ.',
      { font: '36px Arial', fill: '#BB0000', fontWeight: "bold", align: 'center' }
    );
    gameoverText.setOrigin(0.5);
  
    // Sử dụng totalTime để hiển thị thời gian hoàn thành:
    const timeText = this.add.text(
      this.sys.game.config.width / 2 - 170,
      this.sys.game.config.height / 2 + 260,
      `Thời gian hoàn thành: ${totalTime} giây`,
      { font: '30px Arial', fill: '#000000' }
    );
  
    // Add a button to play again
    const playAgainButton = this.add.text(
      this.sys.game.config.width / 2 - 50,
      this.sys.game.config.height / 2 + 290,
      'CHƠI LẠI',
      { font: '24px Arial', fill: '#FF0000' }
    ).setInteractive();
  
    playAgainButton.on('pointerdown', () => {
      // Play button click sound
      this.sound.play('buttonClick', { volume: 0.5 });
      // Stop the music before transitioning back to Playscene
      this.stopMusic();
    
      // Reset game state in the Playscene
      this.scene.get('Playscene').resetGameState();
    
      // Transition back to the main game scene (Playscene)
      this.scene.start('Playscene');
    });
  }
  
  handleExitGame() {
    this.isGameOver = true;

    // Stop music and perform other cleanup
    this.stopMusic();

    // Close the window if it's not in an iframe
    if (window.opener === null) {
        window.close();
    } else {
        console.error('Cannot close the window: It is embedded in an iframe.');
    }
}

  

  stopMusic() {
    // Dừng âm nhạc nếu đang phát
    if (this.music) {
      this.music.stop();
      this.music.destroy();
    }
  }
}