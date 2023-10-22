<template>
    <div class="container main">
        <div class="chatrooms">
            <div class="container">
                <div class="title-chats">
                    Chats
                </div>
            </div>
            <div class="container">
                <div class="name-chats">
                    Global
                </div>
            </div>
            <div class="container">
                <div class="name-chats">
                    New Chat
                </div>
            </div>
        </div>
        <div class="chat">
            <div class="title-chat chat-container center name-of-chat">
                Globaler Chatroom
            </div>
            <div class="messages chat-container">
                <div class="widthTo100">
                    <div v-for="message in messages" :key="message.id">
                        <Message :message="message" />
                    </div>
                </div>
            </div>
            <div class="send-message chat-container center">
                <form @submit.prevent="sendMessage" style="width: 100%; heigth: 100%;">
                    <input class="input-message" type="text" v-model="newMessage" />
                    <button class="submit-message" type="submit">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import io from 'socket.io-client';
import Message from './Message.vue';

export default {
    data() {
        return {
            messages: [],
            newMessage: '',
        };
    },
    mounted() {
        this.getMessages();
        const socket = io('http://localhost:3000');
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('message', (message) => {
            this.messages.push(message);
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        });
        socket.on('resetMessage', () => {
            this.messages = [];
        });
    },
    methods: {
        sendMessage() {
            const socket = io('http://localhost:3000');
            socket.emit('message', { text: this.newMessage });
            this.newMessage = '';
        },
        getMessages() {
            let axios = require('axios');
            axios.get('http://localhost:3000/messages')
                .then((response) => {
                    this.messages = response.data;
                }).then(() => {
                    this.scrollToBottom();
                });
        },
        async resetChat() {
            const socket = await io('http://localhost:3000');
            socket.emit('resetMessage');
        },
        scrollToBottom() {
            let element = document.querySelector(".messages");
            element.scrollTop = element.scrollHeight;
        }
    },
    components: { Message }
};
</script>