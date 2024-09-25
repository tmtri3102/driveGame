class CarGame {
	constructor() {
		this.carPosition = { x: 250, y: 250 }; // Vị trí khởi tạo của xe
		this.carSpeed = 1; // Tốc độ mặc định
		this.carDirection = "up"; // Hướng mặc định là đi lên
		this.obstacles = [{ x: 50, y: 50 }]; // Chướng ngại vật ban đầu
		this.rewards = [{ x: 150, y: 150 }]; // Phần thưởng ban đầu
		this.score = 0; // Điểm ban đầu
		this.isGameOver = false; // Trạng thái game
		this.canvas = document.getElementById("gameCanvas"); // Lấy thẻ canvas
		this.context = this.canvas.getContext("2d");
	}

	// Bắt đầu game
	startGame() {
		this.isGameOver = false;
		document.addEventListener("keydown", this.handleKeyPress.bind(this));
		this.gameLoop();
	}

	// Xử lý sự kiện bàn phím
	handleKeyPress(event) {
		switch (event.key) {
			case "ArrowUp":
				this.changeDirection("up");
				break;
			case "ArrowDown":
				this.changeDirection("down");
				break;
			case "ArrowLeft":
				this.changeDirection("left");
				break;
			case "ArrowRight":
				this.changeDirection("right");
				break;
			case "Control":
				this.increaseSpeed();
				break;
			default:
				break;
		}
	}

	// Thay đổi hướng đi của xe
	changeDirection(newDirection) {
		this.carDirection = newDirection;
	}

	// Tăng tốc độ của xe khi nhấn phím Ctrl
	increaseSpeed() {
		this.carSpeed = 3; // Tăng tốc độ khi nhấn Ctrl
	}

	// Di chuyển xe theo hướng và tốc độ
	moveCar() {
		switch (this.carDirection) {
			case "up":
				this.carPosition.y -= this.carSpeed;
				break;
			case "down":
				this.carPosition.y += this.carSpeed;
				break;
			case "left":
				this.carPosition.x -= this.carSpeed;
				break;
			case "right":
				this.carPosition.x += this.carSpeed;
				break;
		}
		this.carSpeed = 1; // Reset lại tốc độ sau khi di chuyển
	}

	// Kiểm tra va chạm với chướng ngại vật
	checkCollision() {
		this.obstacles.forEach((obstacle) => {
			if (
				this.carPosition.x === obstacle.x &&
				this.carPosition.y === obstacle.y
			) {
				this.endGame();
			}
		});
	}

	// Kiểm tra nếu xe đi qua phần thưởng
	checkReward() {
		this.rewards.forEach((reward, index) => {
			if (this.carPosition.x === reward.x && this.carPosition.y === reward.y) {
				this.score += 10; // Tăng điểm
				this.rewards.splice(index, 1); // Xóa phần thưởng đã lấy
			}
		});
	}

	// Kết thúc game
	endGame() {
		this.isGameOver = true;
		console.log("Game Over");
		document.removeEventListener("keydown", this.handleKeyPress.bind(this));
	}

	// Vẽ game: xe, chướng ngại vật, phần thưởng
	drawGame() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Xóa canvas
		// Vẽ xe
		this.context.fillStyle = "blue";
		this.context.fillRect(this.carPosition.x, this.carPosition.y, 20, 20);
		// Vẽ chướng ngại vật
		this.context.fillStyle = "red";
		this.obstacles.forEach((obstacle) => {
			this.context.fillRect(obstacle.x, obstacle.y, 20, 20);
		});
		// Vẽ phần thưởng
		this.context.fillStyle = "gold";
		this.rewards.forEach((reward) => {
			this.context.fillRect(reward.x, reward.y, 20, 20);
		});
		// Hiển thị điểm số
		this.context.fillStyle = "black";
		this.context.fillText("Score: " + this.score, 10, 10);
	}

	// Vòng lặp game
	gameLoop() {
		if (!this.isGameOver) {
			this.moveCar();
			this.checkCollision();
			this.checkReward();
			this.drawGame();
			requestAnimationFrame(this.gameLoop.bind(this));
		}
	}
}

// Khởi tạo game và bắt đầu
const game = new CarGame();
game.startGame();
