import * as signalR from "@microsoft/signalr";
import "../css/index.css";
const divMessages = document.querySelector("#divMessages");
const tbMessage = document.querySelector("#tbMessage");
const btnSend = document.querySelector("#btnSend");
const username = new Date().getTime();
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/menu")
    .build();
connection.on("messageReceived", (username, message) => {
    const m = document.createElement("div");
    m.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});
connection.start().catch((err) => document.write(err));
tbMessage.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    connection.send("newMessage", username, tbMessage.value)
        .then(() => (tbMessage.value = ""));
}
window.location.href = `/pianoGames.html`;
