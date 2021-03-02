const message = (text) => {
    $("#chat-result").append(text);
}
$(function (){

    let socket = new WebSocket("ws://localhost:8090/thisq/server.php");

    socket.onopen = function (){
        message("<div>Соединение установлено</div>");
    };

    socket.onerror =  (error) => {
        message("<div>Ошибка при соединении " + error.message + "</div>");
    };

    socket.onclose = () => {
        message("<div>Соединение закрыто</div>");
    };

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        message("<div>" + data.type + " - " + data.message + "</div>");
    };

    $('#chat').on('submit', function(){
        
        let message = {
            chat_message: $('#chat-message').val(),
            chat_user: $('#chat-user').val()
        };

        $("#chat-user").attr("type", "hidden");
        socket.send(JSON.stringify(message));

        return false;
    });
});