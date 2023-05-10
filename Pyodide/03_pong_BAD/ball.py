import pyxel

class Game:
    def __init__(self):
        pyxel.init(160, 120)
        self.paddle1_y = 40
        self.paddle2_y = 40
        self.ball_x = 80
        self.ball_y = 60
        self.ball_vx = 1
        self.ball_vy = 1
        pyxel.run(self.update, self.draw)

    def update(self):
        # Move the paddles
        if pyxel.btn(pyxel.KEY_W) and self.paddle1_y > 0:
            self.paddle1_y -= 2
        if pyxel.btn(pyxel.KEY_S) and self.paddle1_y < pyxel.height - 20:
            self.paddle1_y += 2
        if pyxel.btn(pyxel.KEY_UP) and self.paddle2_y > 0:
            self.paddle2_y -= 2
        if pyxel.btn(pyxel.KEY_DOWN) and self.paddle2_y < pyxel.height - 20:
            self.paddle2_y += 2

        # Move the ball
        self.ball_x += self.ball_vx
        self.ball_y += self.ball_vy

        # Bounce off the walls
        if self.ball_x < 0 or self.ball_x > pyxel.width:
            self.ball_vx = -self.ball_vx
        if self.ball_y < 0 or self.ball_y > pyxel.height:
            self.ball_vy = -self.ball_vy

        # Bounce off the paddles
        if self.ball_x < 20 and self.ball_y > self.paddle1_y and self.ball_y < self.paddle1_y + 20:
            self.ball_vx = -self.ball_vx
        if self.ball_x > pyxel.width - 20 and self.ball_y > self.paddle2_y and self.ball_y < self.paddle2_y + 20:
            self.ball_vx = -self.ball_vx

    def draw(self):
        # Draw the paddles and ball
        pyxel.cls(0)
        pyxel.rect(0, self.paddle1_y, 4, 20, 11)
        pyxel.rect(pyxel.width - 4, self.paddle2_y, 4, 20, 11)
        pyxel.circ(self.ball_x, self.ball_y, 5, 9)

if __name__ == "__main__":
    Game()