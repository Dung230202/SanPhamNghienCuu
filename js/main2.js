export default class Main2 extends Phaser.Scene {

  constructor() {
    super("Main2");
  }

  preload() {
    this.load.image("Công chúa", "../assets/main2.png");
    this.load.image("Playbutton", "../assets/Start.png");
    this.load.audio('buttonClick', '../assets/click.mp3');
  }

  create() {
    // Add the princess image
    const background = this.add.image(1300/2, 700/2, "Công chúa");
   

    // Add the Play button
    const PlayButton = this.add.sprite(1300/2.5, 700/1.2,  "Playbutton");
    PlayButton.setInteractive();
    PlayButton.on("pointerdown", () => {
      // Play button click sound
      this.sound.play('buttonClick', { volume: 0.5 });
      console.log("Nhấn nút Play!");
      this.scene.start("Playscene"); // Transition to the "Play" scene
    });
  }

  update() {

  }
}