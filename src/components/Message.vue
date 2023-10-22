<template>
    <div class="container-message">
        <div class="message">
            <div>{{message.text}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Message',
        props: [
            'message'
        ]
    };
</script>