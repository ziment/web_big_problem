document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
    const error = document.getElementById("error");

    function renderMessages(messages) {
        messages.forEach((message) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");

            const title = document.createElement("h3");
            title.classList.add("message__title");
            title.textContent = message.title;

            const body = document.createElement("p");
            body.classList.add("message__text");
            body.textContent = message.body;

            messageDiv.appendChild(title);
            messageDiv.appendChild(body);
            content.appendChild(messageDiv);
        });
    };

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            if (!response.ok) {
                throw new Error("⚠ Что-то пошло не так");
            }
            return response.json();
        })
        .then((data) => {
            const messageCount = Math.floor(Math.random() * data.length) + 1;
            const shuffledMessages = data.sort(() => 0.5 - Math.random());
            const messages = shuffledMessages.slice(0, messageCount);

            renderMessages(messages);
            preloader.style.display = "none";
        })
        .catch((err) => {
            preloader.style.display = "none";
            error.textContent = `${err.message}`;
        });
});