<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    export let onTimeUp: () => void;
    export let timeInMinutes = 15;
    export let frozen = false;
    
    let timeRemaining = timeInMinutes * 60;
    let intervalId: number;
    
    function formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    $: if (frozen && intervalId) {
        clearInterval(intervalId);
    }
    
    onMount(() => {
        intervalId = setInterval(() => {
            if (!frozen) {
                timeRemaining -= 1;
                if (timeRemaining <= 0) {
                    clearInterval(intervalId);
                    onTimeUp();
                }
            }
        }, 1000);
    });
    
    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });
</script>

<div class="timer" class:warning={timeRemaining <= 60 && !frozen}>
    Time Remaining: {formatTime(timeRemaining)}
</div>

<style>
    .timer {
        position: fixed;
        top: 1rem;
        right: 1rem;
        background-color: #2c3e50;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .warning {
        background-color: #e74c3c;
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
</style>
