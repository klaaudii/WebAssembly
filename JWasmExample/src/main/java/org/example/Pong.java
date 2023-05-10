package org.example;

import java.awt.*;
import java.awt.event.*;
import java.util.Random;

public class Pong extends Frame implements Runnable, KeyListener {

    private static final int WIDTH = 640;
    private static final int HEIGHT = 480;

    private Thread gameThread;
    private boolean running;

    private Image dbImage;
    private Graphics dbg;

    private Paddle leftPaddle, rightPaddle;
    private Ball ball;

    public Pong() {
        setSize(WIDTH, HEIGHT);
        setTitle("Pong");
        setResizable(false);

        addKeyListener(this);

        leftPaddle = new Paddle(20, HEIGHT / 2 - 40);
        rightPaddle = new Paddle(WIDTH - 40, HEIGHT / 2 - 40);
        ball = new Ball(WIDTH / 2 - 10, HEIGHT / 2 - 10, 20, 20);

        setVisible(true);
    }

    public void start() {
        running = true;
        gameThread = new Thread(this);
        gameThread.start();
    }

    public void stop() {
        running = false;
        try {
            gameThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void run() {
        long lastTime = System.nanoTime();
        double nsPerTick = 1000000000D / 60D;

        int frames = 0;
        int ticks = 0;

        long lastTimer = System.currentTimeMillis();
        double delta = 0;

        while (running) {
            long now = System.nanoTime();
            delta += (now - lastTime) / nsPerTick;
            lastTime = now;

            while (delta >= 1) {
                tick();
                ticks++;
                delta -= 1;
            }

            render();
            frames++;

            if (System.currentTimeMillis() - lastTimer > 1000) {
                lastTimer += 1000;
                System.out.println(frames + " frames, " + ticks + " ticks");
                frames = 0;
                ticks = 0;
            }
        }
    }

    public void tick() {
        leftPaddle.tick();
        rightPaddle.tick();
        ball.tick(leftPaddle, rightPaddle);
    }

    public void render() {
        if (dbImage == null) {
            dbImage = createImage(getWidth(), getHeight());
            if (dbImage == null) {
                return;
            } else {
                dbg = dbImage.getGraphics();
            }
        }

        dbg.setColor(Color.black);
        dbg.fillRect(0, 0, WIDTH, HEIGHT);

        leftPaddle.render(dbg);
        rightPaddle.render(dbg);
        ball.render(dbg);

        Graphics g = getGraphics();
        g.drawImage(dbImage, 0, 0, null);
        g.dispose();
    }

    public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_W) {
            leftPaddle.moveUp();
        }
        if (e.getKeyCode() == KeyEvent.VK_S) {
            leftPaddle.moveDown();
        }
        if (e.getKeyCode() == KeyEvent.VK_UP) {
            rightPaddle.moveUp();
        }
        if (e.getKeyCode() == KeyEvent.VK_DOWN) {
            rightPaddle.moveDown();
        }
    }

    public void keyReleased(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_W) {
            leftPaddle.stop();
        }
        if (e.getKeyCode() == KeyEvent.VK_S) {
            leftPaddle.stop();
        }
        if (e.getKeyCode() == KeyEvent.VK_UP) {
            rightPaddle.stop();
        }
        if (e.getKeyCode() == KeyEvent.VK_DOWN) {
            rightPaddle.stop();
        }
    }

    public void keyTyped(KeyEvent e) {
    }

    public static void main(String[] args) {
        Pong game = new Pong();
        game.start();
    }

    private class Paddle {
        private int x, y, dy;
        private int width = 20;
        private int height = 80;

        public Paddle(int x, int y) {
            this.x = x;
            this.y = y;
            dy = 0;
        }


        public void tick() {
            if (y + dy > 0 && y + dy < HEIGHT - height) {
                y += dy;
            }
        }

        public void render(Graphics g) {
            g.setColor(Color.white);
            g.fillRect(x, y, width, height);
        }

        public void moveUp() {
            dy = -5;
        }

        public void moveDown() {
            dy = 5;
        }

        public void stop() {
            dy = 0;
        }
    }

    private class Ball {
        private int x, y, dx, dy;
        private int width, height;

        public Ball(int x, int y, int width, int height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            dx = 4;
            dy = 4;
        }

        public void tick(Paddle leftPaddle, Paddle rightPaddle) {
            if (y + dy < 0 || y + dy > HEIGHT - height) {
                dy = -dy;
            }
            if (x + dx > WIDTH - width) {
                x = WIDTH / 2 - width / 2;
                y = HEIGHT / 2 - height / 2;
                dx = -dx;
            }
            if (x + dx < 0) {
                x = WIDTH / 2 - width / 2;
                y = HEIGHT / 2 - height / 2;
                dx = -dx;
            }

            if (x < leftPaddle.x + leftPaddle.width &&
                    x + width > leftPaddle.x &&
                    y < leftPaddle.y + leftPaddle.height &&
                    y + height > leftPaddle.y) {
                dx = -dx;
                x = leftPaddle.x + leftPaddle.width;
            }

            if (x < rightPaddle.x + rightPaddle.width &&
                    x + width > rightPaddle.x &&
                    y < rightPaddle.y + rightPaddle.height &&
                    y + height > rightPaddle.y) {
                dx = -dx;
                x = rightPaddle.x - width;
            }

            x += dx;
            y += dy;
        }

        public void render(Graphics g) {
            g.setColor(Color.white);
            g.fillRect(x, y, width, height);
        }
    }


}
