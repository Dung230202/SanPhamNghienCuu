export default class Playscene extends Phaser.Scene {
  constructor() {
    super("Playscene");
    //Trạng thái trò chơi
    this.isGameOver = false;
    this.isCongratulation = false;
    //Dữ liệu ban đầu
    this.originalNumbers = [];
    this.totalTime = 0;
    this.startTime = 0;
    this.currentTime = 0;
    //Các đối tượng trò chơi
    this.bubbles = null;
    this.timerEvent = null;
  }

  preload() {
    this.load.image("Ball", "assets/Bubble.png");
    this.load.image("BG", "assets/BG.png");
    this.load.image("GC", "assets/infante.png");
    this.load.image("ExitButton", "assets/Exit.png");
    this.load.image("ResetButton", "assets/Reset.png");
    this.load.audio('ButtonClick', 'assets/click.mp3');
    this.load.audio('PickClick', 'assets/pick.mp3');
  }

  create() {
    //Hình ảnh và nút điều khiển
    const bs = this.add.image(1300 / 2, 800 / 2, 'BG');
    const GC = this.add.image(500 / 2, 450 / 2, 'GC');
    
    const checkButton = this.add.text(
      this.sys.game.config.width - 270,
      10,
      'KIỂM TRA',
      { font: '30px Arial', fill: '#FF0000', align: "center", fontWeight: "bold" }
    ).setInteractive();
    
    const exitButton = this.add.image(this.sys.game.config.width - 70, 40, "ExitButton").setInteractive();
    exitButton.on('pointerup', function () {
      this.handleExitGame();
    }, this);
    
    const resetButton = this.add.image(this.sys.game.config.width - 70, 100, "ResetButton").setInteractive();
    this.sound.play('ButtonClick', { volume: 0.5 });

    resetButton.on('pointerup', function () {
      this.handleReset();
    }, this);
// Xử lí sự kiện kiểm tra
    checkButton.on('pointerdown', function (pointer) {
      console.log('Nhấn nút KIỂM TRA!');
      if (this.isBubbleSortCorrect(this.bubbles.getChildren(false))) {
        this.handleGameSuccess();
      } else {
        this.handleGameOver();
      }
    }, this);
    
//Tạo nhóm bong bóng
    this.bubbles = this.physics.add.group();
    const numBubbles = 5;
    const bubbleGap = 155;
    const bubbleColors = [0x00FFFF, 0xCCFF00, 0x33FF33, 0xFFCCFF,0xFF0033];
//Hàm tạo mảng số nguyên
    function generateUniqueNaturalNumbers(size, min, max) {
      const uniqueNumbers = new Set();

      for (let i = 0; i < size; i++) {
        uniqueNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
      }

      return Array.from(uniqueNumbers);
    }
// Trộn màu sắc
    Phaser.Utils.Array.Shuffle(bubbleColors);

    const minNumber = 1;
    const maxNumber = 1000;
    const uniqueNumbers = generateUniqueNaturalNumbers(numBubbles, minNumber, maxNumber);

    this.originalNumbers = [...uniqueNumbers].sort((a, b) => a - b);
//Tạo bong bóng
    for (let i = 0; i < numBubbles; i++) {
      const x = (this.sys.game.config.width / 1) - (bubbleGap * (numBubbles - 0) / 1) + (i * bubbleGap);
      const y = this.sys.game.config.height / 2;

      const bubble = this.physics.add.sprite(x, y, "Ball");
      bubble.numbers = uniqueNumbers[i];
      bubble.color = bubbleColors[i];
      bubble.setTint(bubble.color);

      const text = this.add.text(bubble.x, bubble.y, bubble.numbers, {
        font: "30px Arial",
        fill: "#ffffff",
        align: "center",
      });

      bubble.text = text;
      bubble.setInteractive();
      this.input.setDraggable(bubble);
      this.bubbles.add(bubble);
    }
//Khởi tạo thời gian
    this.startTime = this.time.now;
    this.currentTime = 0;

    this.timeText = this.add.text(10, 10, "00:00", {
      font: "30px Arial",
      fill: "#000000",
    });
//Tạo sự kiện thời gian
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTime,
      callbackScope: this,
      loop: true,
    });
// Xử lý sự kiện khi bong bóng kéo thả
    this.input.on("dragstart", (pointer, gameObject) => {});
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      gameObject.text.setPosition(gameObject.x, gameObject.y);
    });
    this.input.on("dragend", (pointer, gameObject) => {});
// Hiển thị văn bản chúc mừng và ẩn đi ban đầu
    this.congratulationsText = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      'Congratulations!',
      { font: '36px Arial', fill: '#00ff00' }
    );
    this.congratulationsText.setOrigin(0.5);
    this.congratulationsText.setVisible(false);
 // Xử lý sự kiện khi bong bóng được nhấn 
    this.bubbles.getChildren().forEach(bubble => {
    bubble.setInteractive();
  
    bubble.on('pointerdown', () => {
      // Play the 'PickClick' sound when a bubble is clicked
      this.sound.play('PickClick', { volume: 0.5 });
  
    });
  });
}
// Thuật toán sắp xếp Bubble Sort
  bubbleSort(unsortedArray) {
    let isSorted = false;

    while (!isSorted) {
      isSorted = true;

      for (let i = 0; i < unsortedArray.length - 1; i++) {
        if (unsortedArray[i].numbers > unsortedArray[i + 1].numbers) {
          const temp = unsortedArray[i];
          unsortedArray[i] = unsortedArray[i + 1];
          unsortedArray[i + 1] = temp;
          isSorted = false;
        }
      }
    }
  }
// Kiểm tra sắp xếp Bubble Sort
checkBubbleSort() {
  if (!this.isGameOver) {
    console.log("Checking Bubble Sort...");

    this.input.enabled = false;

    const bubblesArray = this.bubbles.getChildren(false); // Remove unnecessary reversal

    // Check for correct sorting and step-by-step execution
    const isSorted = this.isBubbleSortCorrect(bubblesArray) && this.isBubbleSortExecutedCorrectly(bubblesArray);

    this.input.enabled = true;
// Xử lý kết quả sắp xếp  
      if (isSorted) {
        console.log("Sorting is correct. Congratulations!");
        this.handleGameSuccess();
      } else {
        console.log("Sorting is incorrect. Game Over!");
        this.handleGameOver();
      }
    }
  }
// Kiểm tra từng bước của Bubble Sort 
isBubbleSortExecutedCorrectly(bubblesArray) {
  const originalArray = bubblesArray.map(b => b.numbers);

  // Simulate Bubble Sort and track swaps
  let hasSwapped;
  do {
    hasSwapped = false;
    for (let i = 0; i < originalArray.length - 1; i++) {
      if (originalArray[i] > originalArray[i + 1]) {
        [originalArray[i], originalArray[i + 1]] = [originalArray[i + 1], originalArray[i]];
        hasSwapped = true;
      }
    }
  } while (hasSwapped);

  // Compare the simulated sorted array with the actual bubblesArray
  return arraysMatch(originalArray, bubblesArray.map(b => b.numbers));
}
 
// So sánh hai mảng
isBubbleSortCorrect(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}
// Kiểm tra xem sắp xếp Bubble Sort có chính xác không
arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
// Xử lý khi trò chơi kết thúc
  handleGameOver() {
    try {
      if (!this.isGameOver) {
        this.isGameOver = true;
        console.log("Game over!");
  // Hủy sự kiện đếm thời gian
        if (this.timerEvent) {
          this.timerEvent.destroy();
        }
  // Tính tổng thời gian chơi và chuyển đến cảnh Game Over
        const totalTime = this.startTime ? this.calculateTotalPlayTime() : "00:00";
        this.scene.launch("GameOverScene", { totalTime });
      }
    } catch (error) {
      console.error("Error in handleGameOver:", error);
    }
  }
// Xử lý khi trò chơi thành công
  handleGameSuccess() {
    if (!this.isGameOver) {
      console.log("Sorting is correct. Congratulations!");

      if (this.timerEvent) {
        this.timerEvent.destroy();
      }

      this.scene.launch("CongratulationsScene", { totalTime: this.calculateTotalPlayTime() });
    }
  }
// Đặt lại trạng thái trò chơi
  resetGame() {
    this.isGameOver = false;
    this.isCongratulation = false;
    this.originalNumbers = [];
    this.totalTime = 0;

    this.bubbles.getChildren(false).forEach(bubble => {
      bubble.x = (this.sys.game.config.width / 2) - (bubble.width / 2);
      bubble.y = this.sys.game.config.height / 2;
    });
  }

  handleReset() {
    this.resetGame();
  }
// Đặt lại trạng thái và vị trí của bong bóng
  resetGameState() {
    this.isGameOver = false;
    this.isCongratulation = false;
    this.originalNumbers = [];
    this.totalTime = 0;
// Khởi tạo lại thời gian
    this.restartTimer();

    this.bubbles.getChildren(false).forEach(bubble => {
      bubble.x = (this.sys.game.config.width / 2) - (bubble.width / 2);
      bubble.y = this.sys.game.config.height / 2;
    });
  }
// Khởi động lại đồng hồ đếm thời gian
  restartTimer() {
    this.startTime = this.time.now;
    this.currentTime = 0;

    if (this.timerEvent) {
      this.timerEvent.destroy();
    }

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTime,
      callbackScope: this,
      loop: true,
    });
  }

  updateTime() {
    if (!this.isGameOver) {
      const elapsedMillis = this.time.now - this.startTime;
      const totalSeconds = Math.floor(elapsedMillis / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.timeText.setText(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }
  }

  calculateTotalPlayTime() {
    if (this.startTime) {
      const elapsedMillis = this.time.now - this.startTime;
      const totalSeconds = Math.floor(elapsedMillis / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return "00:00";
    }
  }

  handleExitGame() {
    this.isGameOver = true;

    if (this.timerEvent) {
      this.timerEvent.destroy();
    }

    this.scene.start("Mainscene");
  }

  handleReset() {
    this.resetGameState();
  }
}