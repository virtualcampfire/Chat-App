<template>
    <div>
      <h1>Chat</h1>
      <ul>
        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
      </ul>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
      };
    },
    mounted() {
      const socket = io('http://localhost:3000');
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      socket.on('message', (message) => {
        this.messages.push(message);
      });
    },
    methods: {
      sendMessage() {
        const socket = io('http://localhost:3000');
        socket.emit('message', { text: this.newMessage });
        this.newMessage = '';
      },
    },
  };
  </script>