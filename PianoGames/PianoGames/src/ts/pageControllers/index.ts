import * as signalR from "@microsoft/signalr";
import "../../css/index.css";
import { GameModes } from "../../enums";

const messagesContainer: HTMLDivElement = document.querySelector("#messages-container");
const messageInput: HTMLInputElement = document.querySelector("#message-input");
const sendButton: HTMLButtonElement = document.querySelector("#send-message-button");
const pianoShufflerGameButton: HTMLButtonElement = document.querySelector("#piano-shuffler-game-button");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/lobby")
    .build();

connection.on("ReceivedMessage", (username: string, message: string) => {

    const newMessage = document.createElement("div");

    newMessage.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;

    messagesContainer.appendChild(newMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

connection.on("PlayGame", (gameMode: number, gameID: string) => {

    let newLocation = ``;

    switch (gameMode) {
        case GameModes.PIANO_SHUFFLER:
            newLocation += `/pianoGames.html`;
            break;
    }

    newLocation += `?game_id=${gameID}`;

    window.location.href = newLocation;
});

connection.start().catch((err) => document.write(err));

messageInput.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

sendButton.addEventListener("click", sendMessage);

pianoShufflerGameButton.addEventListener("click", () => {
    connection.send("RequestPlayGame", GameModes.PIANO_SHUFFLER);
});

function sendMessage() {
    connection.send("SendMessage", username, messageInput.value)
        .then(() => (messageInput.value = ""));
};