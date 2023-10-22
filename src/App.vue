<template>
  <Chat/>
</template>

<script>
import Chat from './components/Chat.vue'
import Message from './components/Message.vue'
import './assets/app.css'

export default {
  name: 'App',
  components: {
    Chat,
    Message
  }
}
</script>
