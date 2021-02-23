const message = (text) => {
    $("#chat-result").append(text);
}
$(function (){

    let socket = new WebSocket("ws://localhost:8090/thisq/server.php");

    socket.onopen = function (){
        message("Соединение установлено");
    };

    socket.onerror =  (error) => {
        message("Ошибка при соединении " + error.message);
    };

    socket.onclose = () => {
        message(" Соединение закрыто");
    };

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        message("<div>" + data.type + " - " + data.message + "</div>");
    };
});