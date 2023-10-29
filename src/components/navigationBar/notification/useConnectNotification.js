import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useEffect} from "react";

export function useConnectNotification(userNickname) {
    const socket = new SockJS(process.env.REACT_APP_WS_LINK)
    const headers = {Authorization: localStorage.getItem('authToken')}

    const stompClient = Stomp.over(socket)
    stompClient.reconnect = connectToWebSocket;

    function connectToWebSocket() {
        stompClient.connect(headers, (frame) => {
            console.log('Connected:', frame)
            stompClient.subscribe(`/user/${userNickname}/receive-notification`, (message) => {
                console.log('Received:', message) //JSON.parse(message.body)
            });
        });
    }

    useEffect(() => {
        if (userNickname)
            connectToWebSocket()
    }, [userNickname])

}

