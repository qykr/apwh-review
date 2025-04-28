<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let question: string;
    export let letter: string;
    export let answer: string;
    export let feedback: string | undefined;
    export let disabled = false;

    let followupMessage = '';
    let loadingFollowup = false;

    const dispatch = createEventDispatcher();

    // Log when feedback changes
    $: if (feedback) {
        console.log(`Feedback received for question ${letter}:`, feedback);
    }

    onMount(() => {
        console.log(`QuestionSection mounted for letter ${letter}, question: ${question.substring(0, 30)}...`);
    });

    async function sendFollowup() {
        if (!followupMessage?.trim()) return;

        loadingFollowup = true;

        try {
            const response = await fetch('/api/grade/followup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question,
                    originalAnswer: answer,
                    previousFeedback: feedback,
                    followupQuestion: followupMessage
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get followup response');
            }

            const result = await response.json();
            const newFeedback = feedback + '\n\n<span class="chat-label">You:</span> ' + followupMessage + '\n\n<span class="chat-label">Tutor:</span> ' + result.response;

            // Update the feedback via event
            dispatch('updateFeedback', newFeedback);
            feedback = newFeedback;
            followupMessage = '';
        } catch (error) {
            console.error('Error sending followup:', error);
        } finally {
            loadingFollowup = false;
        }
    }
</script>

<div class="answer-section">
    <label for="part-{letter}">
        <strong>{letter})</strong> {question}
    </label>
    <textarea
        id="part-{letter}"
        bind:value={answer}
        rows="4"
        placeholder="Enter your response for part ({letter})..."
        disabled={disabled}
    ></textarea>
    {#if feedback}
        <div class="feedback">
            <h3>Feedback:</h3>
            <p>{@html feedback}</p>

            <div class="followup-chat">
                <textarea
                    bind:value={followupMessage}
                    placeholder="Ask a follow-up question..."
                    rows="2"
                ></textarea>
                <button
                    type="button"
                    class="primary-button"
                    on:click={sendFollowup}
                    disabled={loadingFollowup}
                >
                    {loadingFollowup ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    {:else}
        <!-- For debugging -->
        <div class="debug-info" style="display: none;">
            <p>No feedback available. Letter: {letter}, Question: {question.substring(0, 20)}...</p>
        </div>
    {/if}
</div>

<style>
    .answer-section {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        font-size: 1.1rem;
    }

    textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #cbd5e0;
        border-radius: 4px;
        font-size: 1rem;
        margin-top: 0.5rem;
        box-sizing: border-box; /* Ensure padding is included in width */
    }

    textarea:focus {
        outline: none;
        border-color: #4a5568;
        box-shadow: 0 0 0 3px rgba(74, 85, 104, 0.2);
    }

    .feedback {
        margin-top: 1rem;
        padding: 1rem 0.75rem; /* Match textarea padding */
        background-color: #f8f9fa;
        border-left: 4px solid #2c3e50;
        border-radius: 0 4px 4px 0;
    }

    .feedback h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }

    .feedback p {
        white-space: pre-wrap;
        margin: 0;
    }

    .feedback p :global(.chat-label) {
        font-weight: 700;
    }

    .followup-chat {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0; /* Remove any potential padding */
    }

    .followup-chat textarea {
        flex: 1;
        min-height: 2.5rem;
        resize: vertical;
        padding: 0.5rem;
    }

    .followup-chat button {
        height: 2.5rem;
        min-width: 80px;
        padding: 0 1rem;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2c3e50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .followup-chat button:hover:not(:disabled) {
        background-color: #34495e;
    }

    .followup-chat button:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
    }

    textarea:disabled {
        background-color: #f1f1f1;
        cursor: not-allowed;
    }
</style>
