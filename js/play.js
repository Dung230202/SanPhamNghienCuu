export default class Playscene extends Phaser.Scene {
  constructor() {
    super("Playscene");
    //Trạng thái trò chơi
    this.isGameOver = false;
    this.isCongratulation = false;
    this.originalNumbers = [];
    this.totalTime = 0;
    this.startTime = 0;
    this.currentTime = 0;
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
    const numBubbles = 4;
    const bubbleGap = 155;
    const bubbleColors = [0x00FFFF, 0xCCFF00, 0xFFCCFF,0xFF0033];
// Mảng các số mặc định
const defaultNumbers = [23,1,14,69];

// Hàm xáo trộn mảng
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
 [array[i], array[j]] = [array[j], array[i]];
}
 return array;
}

// Hàm tạo mảng số nguyên
function generateShuffledNumbers(size, defaultNumbers) {
 const shuffledNumbers = shuffleArray([...defaultNumbers]);
return shuffledNumbers.slice(0, size);
}

// Sử dụng hàm tạo mảng số nguyên để tạo mảng các số
const uniqueNumbers = generateShuffledNumbers(numBubbles, defaultNumbers);

// Lưu mảng đã tạo vào originalNumbers
this.originalNumbers = [...uniqueNumbers];

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
  const n = unsortedArray.length;

  for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
          if (unsortedArray[j].numbers > unsortedArray[j + 1].numbers) {
              const temp = unsortedArray[j];
              unsortedArray[j] = unsortedArray[j + 1];
              unsortedArray[j + 1] = temp;
          }
      }
  }
}
// Updated isBubbleSortCorrect function
isBubbleSortCorrect(bubblesArray) {
  const originalNumbers = [...this.originalNumbers];

  // Sắp xếp mảng phụ lưu
  originalNumbers.sort((a, b) => a - b);

  // Kiểm tra thứ tự của 3 bong bóng sau khi hoán đổi
  for (let i = 0; i < 3; i++) {
    if (bubblesArray[i].numbers !== originalNumbers[i]) {
      return false;
    }
  }

  return true;
}
handleSwapBubble(bubble1, bubble2) {
  // Hoán đổi vị trí của hai bong bóng
  const temp = bubble1.numbers;
  bubble1.numbers = bubble2.numbers;
  bubble2.numbers = temp;

  // Kiểm tra thứ tự sau khi hoán đổi
  if (!this.isBubbleSortCorrect(this.bubblesArray)) {
    return;
  }

  // Cập nhật số lần hoán đổi
  this.numberOfSwaps++;

  // Kiểm tra số lần hoán đổi để kích hoạt chuyển cảnh
  if (this.numberOfSwaps === this.totalSwapsNeeded) {
    this.handleGameSuccess();
  }
}
// Thuật toán Bubble Sort tùy chỉnh cho trò chơi của bạn
customBubbleSort(bubblesArray) {
  const n = bubblesArray.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (bubblesArray[j].numbers > bubblesArray[j + 1].numbers) {
        // Swap elements
        const temp = bubblesArray[j];
        bubblesArray[j] = bubblesArray[j + 1];
        bubblesArray[j + 1] = temp;

        swapped = true;
      }
    }

    if (swapped) {
      // If a swap occurred, update the text positions
      this.updateBubbleTextPositions(bubblesArray);
    }
  }
}

// Update text positions based on bubble positions
 updateBubbleTextPositions(bubblesArray) {
  bubblesArray.forEach((bubble) => {
    bubble.text.setPosition(bubble.x, bubble.y);
  });
}
// Kiểm tra sắp xếp Bubble Sort có chính xác không (updated version)
iisBubbleSortCorrectUpdated(bubblesArray) {
  const sortedArr = bubblesArray.map(bubble => bubble.numbers).sort((a, b) => a - b);
  const isSorted = bubblesArray.every((bubble, index) => {
    return index === 0 || (index > 0 && sortedArr[index - 1] <= bubble.numbers);
  });
  return isSorted;
}
// Kiểm tra sắp xếp
handleCheckBubbleSort() {
  if (!this.isGameOver) {
    console.log("Checking arrangement...");

    this.input.enabled = false;

    const bubblesArray = this.bubbles.getChildren(false);

// Check for correct sorting and order
if (this.isBubbleSortCorrectUpdated(bubblesArray) && this.isCorrectOrder(bubblesArray)) {
  console.log("Arrangement is correct. Congratulations!");
  this.handleGameSuccess();
} else {
  console.log("Arrangement is incorrect. Game Over!");
  this.handleGameOver();
}
  }
}
// Add a new function to check if the arrangement is in correct order
isCorrectOrder(bubblesArray) {
  for (let i = 0; i < bubblesArray.length - 1; i++) {
    if (bubblesArray[i].numbers > bubblesArray[i + 1].numbers) {
      return false; // Not in correct order
    }
  }
  return true; // In correct order
}


// Check Bubble Sort execution steps (corrected)
isBubbleSortExecutedCorrectly(bubblesArray) {
  const originalArray = bubblesArray.map(b => b.numbers);

  // Input validation
  if (!Array.isArray(bubblesArray)) {
    return false;
  }
  if (bubblesArray.length <= 1) {
    return true;
  }

  // Simulate Bubble Sort and track swaps
  let isCorrect = true;
  for (let i = 0; i < originalArray.length - 1; i++) {
    for (let j = 0; j < originalArray.length - i - 1; j++) {
      if (originalArray[j] > originalArray[j + 1]) {
        // Check if the swap is correct
        if (bubblesArray[j].numbers > bubblesArray[j + 1].numbers) {
          // Update the array with the correct swap
          const temp = originalArray[j];
          originalArray[j] = originalArray[j + 1];
          originalArray[j + 1] = temp;
        } else {
          isCorrect = false;
          break;
        }
      }
    }
  }

  // Check if the array is fully sorted
  const sortedArray = originalArray.slice().sort((a, b) => a - b);
  if (!this.arraysMatch(originalArray, sortedArray)) {
    isCorrect = false;
  }

  return {
    isCorrect,
    error: isCorrect ? null : "Bubble Sort execution is incorrect.",
  };
}


// Handle Bubble Sort swaps
onBubbleSwap() {
  this.swaps[this.i] = true;
  this.i++;  // Update i
}
// Compare two numerical arrays (simplified)
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
// Kiểm tra xem sắp xếp Bubble Sort có chính xác không
isBubbleSortCorrect(arr) {
  const sortedArr = arr.map(b => b.numbers).sort((a, b) => a - b);
  const isSorted = arr.every((bubble, index) => {
    return index === 0 || (index > 0 && sortedArr[index - 1] <= bubble.numbers);
  });
  return isSorted;
}

  // Kiểm tra xem sắp xếp Bubble Sort có chính xác không (simplified)
  isBubbleSortCorrectSimplified(bubblesArray) {
    return bubblesArray.every((bubble, index) => index === 0 || bubble.numbers >= bubblesArray[index - 1].numbers);
  }
// Xử lý khi trò chơi kết thúc
handleGameOver() {
  try {
    if (!this.isGameOver) {
      this.isGameOver = true;
      console.log("Game over!");

      this.destroyTimerEvent();

      const totalTime = this.startTime ? this.calculateTotalPlayTime() : "00:00";
      this.scene.launch("GameOverScene", { totalTime });

      const bubblesArray = this.bubbles.getChildren(false);
      if (!this.isBubbleSortCorrect(bubblesArray)) {
        console.log("Sorting is incorrect.");
      }

      this.scene.launch("GameOverScene", { totalTime });
    }
  } catch (error) {
    console.error("Error in handleGameOver:", error);
  }
}
// Xử lý khi trò chơi thành công
handleGameSuccess() {
  if (!this.isGameOver && !this.isCongratulation) {
    const bubblesArray = this.bubbles.getChildren(false);

    // Check if the last sort attempt is correct
    const isLastSortCorrect = this.isBubbleSortExecutedCorrectly(bubblesArray);

    if (isLastSortCorrect) {
      const isSorted = this.isBubbleSortCorrect(bubblesArray);

      if (isSorted) {
        console.log("Sorting is correct. Congratulations!");

        if (this.timerEvent) {
          this.timerEvent.destroy();
        }

        this.isCongratulation = true; // Set the flag to avoid launching multiple scenes

        // Only launch CongratulationsScene if the order is correct
        this.scene.launch("CongratulationsScene", { totalTime: this.calculateTotalPlayTime() });
    } else {
        console.log("Sorting is incorrect. Game Over!");
        this.handleGameOver();  // You can handle an incorrect order as you like
      }
    } else {
      console.log("Sorting is incorrect. Game Over!");
      this.handleGameOver();  // You can handle an incorrect order as you like
    }
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
  destroyTimerEvent() {
    if (this.timerEvent) {
      this.timerEvent.destroy();
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