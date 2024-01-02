export default class CongratulationsScene extends Phaser.Scene {
  constructor() {
    super("CongratulationsScene");
    this.congratsOverlay = null;
    this.audioContext = null;
    this.isGameOver = false;
    this.music = null; // Declare music as a class property
  }
  init() {
    // Initialize the audio context here
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  
    // Check if the audio file is already loaded in the cache
    if (!this.cache.audio.exists('backgroundMusic')) {
      // Load the audio file
      this.load.audio('backgroundMusic', '../assets/Win.mp3');
    }
  }

  preload() {
    // Load your background image
    this.load.image("CongratulationsBG", "../assets/happy.png");
    this.load.image("ExitButton", "../assets/exit_button.png");
    // Trước hết, tải bản nhạc
    this.load.audio('backgroundMusic', '../assets/Win.wav');
    this.load.audio('buttonClick', '../assets/click.mp3');
  }

  create() {
    // Check if the audio file is loaded in the cache
    if (this.cache.audio.exists('backgroundMusic')) {
      // Create the background music
      this.music = this.sound.add('backgroundMusic', { volume: 0.9, loop: true });
      this.music.play();
    } else {
      console.error('Audio file "backgroundMusic" not found in the cache.');
    }
    // Add background image
    const bg = this.add.image(0, 0, "CongratulationsBG");
    bg.setOrigin(0, 0); // Set the origin to the top-left corner

    // Tạo nút thoát
    const exitButton = this.add.image(
      this.sys.game.config.width - 50,
      50,
      "ExitButton"
    ).setInteractive();

    exitButton.on('pointerup', function () {
      this.handleExitGame(); // Gọi hàm xử lý thoát game
    }, this);

    // Create a group for the congrats overlay
    this.congratsOverlay = this.add.group();

    // Access total time from scene settings
    const totalTime = this.scene.settings.data.totalTime;

    // Add your congratulatory message or any other content for the new scene
    const congratulationsText = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 50,
      'Chúc mừng bạn đã thành công giúp hoàng tử cứu được công chúa!',
      { font: '36px Arial', fill: '#000000', fontWeight: "bold" }
    );
    congratulationsText.setOrigin(0.5);

    // Add a text for displaying total time
    const timeText = this.add.text(
      this.sys.game.config.width / 2 - 50,
      this.sys.game.config.height / 2 + 200,
      `Thời gian hoàn thành: ${totalTime} giây`,
      { font: '30px Arial', fill: '#000000' }
    );

    // Add a button to play again
    const playAgainButton = this.add.text(
      this.sys.game.config.width / 2 - 20,
      this.sys.game.config.height / 2 + 290,
      'CHƠI LẠI',
      { font: '24px Arial', fill: '#FF0000' }
    ).setInteractive();

    playAgainButton.on('pointerdown', () => {
      // Play button click sound
      this.sound.play('buttonClick', { volume: 0.5 });
      // Reset game state in the Playscene
      this.scene.get('Playscene').resetGameState();

      // Stop and destroy the music when "Chơi Lại" button is clicked
      this.stopMusic();

      // Transition back to the main game scene (Playscene)
      this.scene.start('Playscene');
    });

    // Trong phương thức chơi lại
    playAgainButton.on('pointerdown', () => {
      // Kiểm tra xem trò chơi đã kết thúc chưa
      if (this.isGameOver) {
        // Reset game state và dừng âm nhạc
        this.scene.get('Playscene').resetGameState();
        this.isGameOver = false;
        this.stopMusic();
      }

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