
export default class Mainscene extends Phaser.Scene {
    constructor() {
      super("Mainscene");
    }
  
    preload() {
      this.load.image("Castle", "../assets/Castle.jpg");
      this.load.image("Play", "../assets/Play.png");
      this.load.image("Learn", "../assets/learn.png")
      this.load.audio('backgroundMusic', '../assets/Nhạc nền.mp3');
      this.load.audio('buttonClick', '../assets/click.mp3');
      
      
    }
  
    create() {
       
      // Create a background music sound object
       const backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
       backgroundMusic.setVolume(0.2); 
       // Play the background music
       backgroundMusic.play();
      
    
      const background = this.add.image(1300 / 2, 700 / 2, "Castle");
      background.setScale(0.25);
  
      const tenbtn = this.add.sprite(380/0.75, 160/0.25, "Play");
      tenbtn.setInteractive();
      tenbtn.on("pointerdown", () => {
        // Play button click sound
        this.sound.play('buttonClick', { volume: 0.5 });
    
        console.log("Nhấn nút Play!");
        this.scene.start("Main2"); // Transition to the "Main2" scene
      });
      const learnbtn = this.add.sprite( 470/0.6, 765/1.2,'Learn')
      learnbtn.setInteractive();
      learnbtn.on('pointerdown',() => {
        this.sound.play('buttonClick', { volume: 0.5 });
        console.log('Nhấn nút Learn!');
        window.location.href = "/learn/learn.html";
    })
  }
  
    update() {}
  }