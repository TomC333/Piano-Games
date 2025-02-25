# Piano Games 🎹

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/TomC333/Piano-Games)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/TomC333/Piano-Games/blob/main/LICENSE)

## Background 🤯

A long time ago—probably in 2023—I started working at my first job. The team was excellent, and my boss was one of the greatest people I have ever known. He was not only a software engineer but also passionate about music. When he was tired, he would play the piano in the office for a few minutes to relax. That was the first time music caught my interest.

My ex-boss 😂 introduced me to music from different perspectives, and I found it really fascinating. Noticing my curiosity, he encouraged me to explore it further. To gain a little knowledge in music while also improving my coding skills, he suggested that I build a small project—a piano shuffler. The goal was to familiarize myself with musical notes in an octave, enhance my listening skills, and at the same time, learn concepts relevant to my job.

## Achievements 🏆 or 💩?

At the end of the day, the project was functional—p.s. as long as we don’t run it on an "incorrect display" :D (it’s not responsive yet). The project also lacks some UI messages and instead logs them in the console. 

However, the true goal of this project was to learn something new and have fun with it, so I consider it a great achievement! 🎉

## New Mini Games ❓

I forgot to mention—originally, the idea was to expand this project with other mini-games to make piano and music learning easier and more enjoyable. The code is structured in a way that allows new games to be added easily. It even includes a small lobby where users can chat in real time! 😂

![Game Lobby](https://github.com/TomC333/Piano-Games/blob/main/demo/lobby.jpeg)

I really wanted to continue expanding the project, but there’s a problem—I switched to a MacBook, and running the project on my new machine is a bit complicated. I also tried running it on my old personal computer, but it’s so slow that fixing even 2-3 lines of code took me over an hour. Since I’m no longer learning anything new from this project and fixing all the issues would be difficult due to technical reasons, I decided to move on to something else.

## How It Works ❓

The basic idea behind this project is that the keys themselves don’t produce sound. Instead, "sprites" give them their sound. There are 12 unique sprites—C, C#, D, etc. 

- You can switch the positions of sprites or remove them from keys. 
  - Swapping sprites means two keys will exchange their sounds.
  - Removing a sprite makes the key silent.
- You can also press and hold a sprite to hear its sound.
- If a sprite is placed on the correct key, it turns **green**; otherwise, it turns **red**.
- The goal of the game is to remove all sprites, shuffle them, and then correctly realign them by listening to their sounds.
- Until the player presses the "Finish" button, all sprites remain **yellow** to prevent hints.

p.s. It’s funny to say, 😂 but this game actually improved my listening skills a bit! 🎶

## Setup 🌱

Who knows? :D Just install Visual Studio (not vs code 😂) to run it. 

Don’t forget to run:
```sh
npm i
npm run build
```
before launching it from Visual Studio to ensure all necessary files are generated.

## Demo ▶️

![Piano Shuffler](https://github.com/TomC333/Piano-Games/blob/main/demo/demo.gif)
