# Provar Bug Invaders

An old-style arcade game. 

__[Play the web version!](https://ajaylamba-provar.github.io/bug-invaders/)__

## About

This game was created to explain the basic concepts of evolution and genetic programming to college students. The game starts with 4 invaders that mate themselves. Each invader has different genes that codify their behavior, such as speed, probability of changing direction, size, color... During evolution time, the invaders start mating in order to create new invaders that inherit the attributes of their parents. Best invaders (invaders with higher fitness) have more probability to be selected for mating. The fitness of an invader corresponds with the number of evolutions that it has survived. This mechanism allows the invaders to improve their behavior against the player over time by learning the best set of features that allows them to survive.

If you want to learn how the game is implemented, Siraj Raval made a great analysis of the game, which is available on Youtube:

<a href="https://www.youtube.com/watch?feature=player_embedded&v=rGWBo0JGf50
" target="_blank"><img src="https://img.youtube.com/vi/rGWBo0JGf50/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## How to play

Controls are very easy. Just use left/right arrow to move your robot and space to shoot. The goal is to keep the number of invaders below 100, otherwise the game is over. There are always at least 4 invaders (elitism), which are protected with blue shields. The player earns 1 point for each evolution time.

## Code

There are two versions of the game, a [python version](https://github.com/ajaylamba-provar/bug-invaders/tree/main/python) built on top of the [SGE Game Engine](http://pythonhosted.org/sge-pygame/index.html) and a [HTML5 version](https://github.com/ajaylamba-provar/bug-invaders/tree/main/js) made with [Phaser](http://phaser.io/). You can play the HTML5 version here: https://ajaylamba-provar.github.io/bug-invaders/

## Authors

This game is a fork of https://github.com/citiususc/citius-invaders/tree/master and customized by [Ajay](https://github.com/ajaylamba-provar) and [Shashank](https://github.com/Shashank-Sharma-075) because why not!


## Screenshots

### Main menu
![Main menu](https://github.com/ajaylamba-provar/bug-invaders/blob/main/screenshots/main-menu.png)
### Game screen
![Game screen](https://github.com/ajaylamba-provar/bug-invaders/blob/main/screenshots/game.png)

### License

This project is licensed under the terms of the [MIT license](LICENSE).
