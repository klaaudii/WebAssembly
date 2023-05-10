// emsdk activate if new cmd
// emcc snake.cpp -s WASM=1 -s USE_SDL=2 -o snake.html

// make
// run created .exe
#include <iostream>
#include <vector>
#include <random>
#include <SDL.h>
#include <emscripten.h>

// Define game constants
const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;
const int GRID_SIZE = 20;
const int SNAKE_SPEED = 10;

// Define game structs
struct Point
{
    int x, y;
};

struct Snake
{
    std::vector<Point> segments;
    Point direction;
    int score;
    int currentFrame = 0;
};

struct Food
{
    Point position;
};

// Declare global variables
SDL_Window *window = nullptr;
SDL_Renderer *renderer = nullptr;
Snake snake;
Food food;
bool should_quit = false;

// Declare game functions
void init();
void quit();
void handleInput(SDL_Event event);
void update();
void render();
void gameLoop();

// Initialize game
void init()
{
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) != 0)
    {
        std::cerr << "Error initializing SDL: " << SDL_GetError() << std::endl;
        std::exit(EXIT_FAILURE);
    }

    // Create window and renderer
    window = SDL_CreateWindow("Snake Game", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if (window == nullptr)
    {
        std::cerr << "Error creating window: " << SDL_GetError() << std::endl;
        std::exit(EXIT_FAILURE);
    }
    renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
    if (renderer == nullptr)
    {
        std::cerr << "Error creating renderer: " << SDL_GetError() << std::endl;
        std::exit(EXIT_FAILURE);
    }

    // Initialize snake
    snake.segments = {{SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2}, {SCREEN_WIDTH / 2 - GRID_SIZE, SCREEN_HEIGHT / 2}, {SCREEN_WIDTH / 2 - 2 * GRID_SIZE, SCREEN_HEIGHT / 2}};
    snake.direction = {GRID_SIZE, 0};
    snake.score = 0;

    // Initialize food
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib_x(0, SCREEN_WIDTH / GRID_SIZE - 1);
    std::uniform_int_distribution<> distrib_y(0, SCREEN_HEIGHT / GRID_SIZE - 1);
    food.position = {distrib_x(gen) * GRID_SIZE, distrib_y(gen) * GRID_SIZE};
}

// Quit game
void quit()
{
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();
}

// Handle user input
void handleInput(SDL_Event event)
{
    switch (event.type)
    {
    case SDL_QUIT:
        emscripten_cancel_main_loop();
        break;
    case SDL_KEYDOWN:
        switch (event.key.keysym.sym)
        {
        case SDLK_UP:
            if (snake.direction.y != GRID_SIZE)
            {
                snake.direction = {0, -GRID_SIZE};
            }
            break;
        case SDLK_DOWN:
            if (snake.direction.y != -GRID_SIZE)
            {
                snake.direction = {0, GRID_SIZE};
            }
            break;
        case SDLK_LEFT:
            if (snake.direction.x != GRID_SIZE)
            {
                snake.direction = {-GRID_SIZE, 0};
            }
            break;
        case SDLK_RIGHT:
            if (snake.direction.x != -GRID_SIZE)
            {
                snake.direction = {GRID_SIZE, 0};
            }
            break;
        }
        break;
    }
}

// Update game state
void update()
{
    if (++snake.currentFrame != SNAKE_SPEED)
        return;
    snake.currentFrame = 0;
    // Move snake
    Point new_head = {snake.segments[0].x + snake.direction.x, snake.segments[0].y + snake.direction.y};
    snake.segments.insert(snake.segments.begin(), new_head);
    snake.segments.pop_back();

    // Check for collision with food
    if (new_head.x == food.position.x && new_head.y == food.position.y)
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> distrib_x(0, SCREEN_WIDTH / GRID_SIZE - 1);
        std::uniform_int_distribution<> distrib_y(0, SCREEN_HEIGHT / GRID_SIZE - 1);
        food.position = {distrib_x(gen) * GRID_SIZE, distrib_y(gen) * GRID_SIZE};
        snake.segments.push_back(snake.segments.back());
        snake.score++;
    }

    // Check for collision with walls or self
    if (new_head.x < 0 || new_head.x >= SCREEN_WIDTH || new_head.y < 0 || new_head.y >= SCREEN_HEIGHT)
    {
        std::cout << "Game over! Score: " << snake.score << std::endl;
        emscripten_cancel_main_loop();
    }
    for (int i = 1; i < snake.segments.size(); i++)
    {
        if (new_head.x == snake.segments[i].x && new_head.y == snake.segments[i].y)
        {
            std::cout << "Game over! Score: " << snake.score << std::endl;
            emscripten_cancel_main_loop();
        }
    }
}

// Render game
void render()
{
    // Clear screen
    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL_RenderClear(renderer);

    // Render food
    SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255);
    SDL_Rect food_rect = {food.position.x, food.position.y, GRID_SIZE, GRID_SIZE};
    SDL_RenderFillRect(renderer, &food_rect);

    // Render snake
    SDL_SetRenderDrawColor(renderer, 0, 255, 0, 255);
    for (int i = 0; i < snake.segments.size(); i++)
    {
        SDL_Rect segment_rect = {snake.segments[i].x, snake.segments[i].y, GRID_SIZE, GRID_SIZE};
        SDL_RenderFillRect(renderer, &segment_rect);
    }

    // Update screen
    SDL_RenderPresent(renderer);
}

// Game loop
void gameLoop()
{
    SDL_Event event;
    while (SDL_PollEvent(&event))
    {
        handleInput(event);
    }
    update();
    render();
}

// Main function
int main(int argc, char *argv[])
{
    init();
    emscripten_set_main_loop(gameLoop, 0, 1);
    quit();
    return 0;
}