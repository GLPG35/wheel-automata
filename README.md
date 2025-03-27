# WheeL: Automata &nbsp;![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<img src="https://wheel-automata.vercel.app/yorha.png" align="right" width="200px" height="auto" />

This is the client for the app, [you'll need the server for it to work.](https://github.com/GLPG35/wheel-automata-server)

## Why did I make this project?

One night, after watching a movie with a friend of mine, we faced a problem:

> There are a lot of movies to watch! And all of them are very good!

So one thought came to mind:

> _I need to create the best spinning wheel out there to pick a random movie for us._

And that's how this project came to life. I wanted to create a real time spinning wheel with custom categories and options, so we could add new elements on the go and spin the wheel, watching it at the same time, without the need of sharing our screen.

## Features

- NieR: Automata based UI.
- Login screen for private usage.
- Custom categories that you can add and delete.
- Custom elements for each category.
- Dynamic spinning wheel creation.
- Cool animations.
- Music and sound effects from NieR: Automata.

## How to run this project

Requirements:

- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/downloads)
	
Once you have everything ready, open the terminal of your choice and write:

	git clone 'https://github.com/GLPG35/wheel-automata.git'
	cd wheel-automata
	bun install

This project needs two environment variables to be set:

`VITE_BACK_URL`

The URL of the server. For example: http://localhost:3000

`VITE_WS_URL`

The URL of the websockets endpoint. For example: http://localhost:3000/ws

> [!IMPORTANT]
> You need the [WheeL: Automata (Server)](https://github.com/GLPG35/wheel-automata-server) running if you want the app to work.

If you want to run it in developer mode write:

	bun dev

If you want to run in production mode write:

	bun build
	bun preview

---

## License

![MIT License](https://img.shields.io/badge/MIT-license?style=for-the-badge&label=LICENSE)