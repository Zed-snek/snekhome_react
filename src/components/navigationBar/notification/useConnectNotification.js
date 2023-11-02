import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useEffect, useState} from "react";

export function useConnectNotification(userNickname) {
    const socket = new SockJS(process.env.REACT_APP_WS_LINK)
    const headers = {Authorization: localStorage.getItem('authToken')}

    const [lastNotification, setLastNotification] = useState()

    const stompClient = Stomp.over(socket)
    stompClient.reconnect = connectToWebSocket;

    function connectToWebSocket() {
        stompClient.connect(headers, (frame) => {
            stompClient.subscribe(`/user/${userNickname}/receive-notification`, (message) => {
                setLastNotification(JSON.parse(message.body))
            });
        });
    }

    useEffect(() => {
        if (userNickname)
            connectToWebSocket()
    }, [userNickname])

    return lastNotification
}

