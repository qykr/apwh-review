<script lang="ts">
    export let onClose: () => void;
    export let onProceed: () => void;
</script>

<div class="warning-modal">
    <div class="warning-content">
        <h2>Warning</h2>
        <p>You have unanswered questions. Are you sure you want to submit?</p>
        <div class="warning-buttons">
            <button class="secondary" on:click={onClose}>
                Go Back
            </button>
            <button class="primary" on:click={onProceed}>
                Submit Anyway
            </button>
        </div>
    </div>
</div>

<style>
    .warning-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .warning-content {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        text-align: center;
    }

    .warning-content h2 {
        color: #e74c3c;
        margin-top: 0;
    }

    .warning-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
    }

    .warning-buttons button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-weight: bold;
    }

    .warning-buttons button.primary {
        background-color: #e74c3c;
        color: white;
    }

    .warning-buttons button.primary:hover {
        background-color: #c0392b;
    }

    .warning-buttons button.secondary {
        background-color: #95a5a6;
        color: white;
    }

    .warning-buttons button.secondary:hover {
        background-color: #7f8c8d;
    }
</style>