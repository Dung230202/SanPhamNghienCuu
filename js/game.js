import Mainscene from "./scene.js";
import Playscene from "./play.js";
import Main2 from "./main2.js";
import CongratulationsScene from "./end.js";
import GameOverScene from "./end2.js";

const config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    physics: {
        default: "arcade",
      },
    backgroundColor: 0x1B1B1D,
    scene: [Mainscene, Main2, Playscene, CongratulationsScene, GameOverScene],
    create() {
      // Tạo một đối tượng Sprite mới
      const bubble = this.add.sprite(400, 300, '../assets/Bubble.png');

      // Thiết lập các thuộc tính cho đối tượng Sprite
      bubble.scale.set(0.5, 0.5);
      bubble.alpha = 0.8;

      // Thêm đối tượng Sprite vào thế giới trò chơi
      this.stage.addChild(bubble);
    }
};

var game = new Phaser.Game(config)
