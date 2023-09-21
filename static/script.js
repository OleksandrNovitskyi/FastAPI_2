var client_id = Date.now();
var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);

ws.onmessage = function (event) {
    var messages = document.getElementById('messages');
    var message = document.createElement('li');
    var content = document.createTextNode(event.data);
    var newClientId = parseInt(event.data.slice(8, 21));

    if (client_id === newClientId) {
        // Відображати зліва, якщо client_id не змінився
        message.innerHTML = `
                        <div class="d-flex flex-row justify-content-start mb-4">
                            <p class="small mb-0">Avatar of <span id="ws-id">${client_id}</span></p>
                            <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237, .2);">
                                <p class="small mb-0">${content.textContent}</p>
                            </div>
                        </div>
                    `;
    } else {
        // Відображати справа, якщо client_id змінився
        message.innerHTML = `
                        <div class="d-flex flex-row justify-content-end mb-4">
                            <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
                                <p class="small mb-0">${content.textContent}</p>
                            </div>
                            <p class="small mb-0">Avatar of <span id="ws-id">${newClientId}</span></p>
                        </div>
                    `;
    }

    messages.appendChild(message);
};

function sendMessage(event) {
    var input = document.getElementById("messageText")
    ws.send(input.value)
    input.value = ''
    event.preventDefault()
}
