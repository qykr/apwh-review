<script lang="ts">
    import QuestionSection from './QuestionSection.svelte';
    
    export let question3: { parts: string[] };
    export let question4: { parts: string[] };
    export let selectedOptionalQuestion: number;
    export let answers: Record<string, Record<string, string>>;
    export let feedback: Record<string, Record<string, string>>;
    export let isTimeUp: boolean;
    export let isSubmitted: boolean;
    
    const nthLetter = (n: number) => String.fromCharCode(97 + n);
</script>

<!-- Optional question selection -->
<div class="optional-question-selector">
    <h2>Choose one of the following questions:</h2>
    <div class="radio-group">
        <label class="radio-label">
            <input
                type="radio"
                name="optionalQuestion"
                value={3}
                bind:group={selectedOptionalQuestion}
                disabled={isSubmitted || isTimeUp}
            />
            Question 3
        </label>
        <label class="radio-label">
            <input
                type="radio"
                name="optionalQuestion"
                value={4}
                bind:group={selectedOptionalQuestion}
                disabled={isSubmitted || isTimeUp}
            />
            Question 4
        </label>
    </div>
</div>

<!-- Display the selected optional question -->
<div class="saq-question">
    <h2>Short Answer Question {selectedOptionalQuestion}</h2>

    <div class="parts-section">
        {#each (selectedOptionalQuestion === 3 ? question3 : question4).parts as part, partIndex}
            <QuestionSection
                question={part}
                letter={nthLetter(partIndex)}
                bind:answer={answers[selectedOptionalQuestion === 3 ? '2' : '3'][nthLetter(partIndex)]}
                feedback={feedback[selectedOptionalQuestion === 3 ? '2' : '3']?.[nthLetter(partIndex)]}
                on:updateFeedback={(e) => {
                    const index = selectedOptionalQuestion === 3 ? '2' : '3';
                    if (!feedback[index]) {
                        feedback[index] = {};
                    }
                    feedback[index][nthLetter(partIndex)] = e.detail;
                }}
                disabled={isTimeUp || isSubmitted}
            />
        {/each}
    </div>
</div>

<style>
    .saq-question {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }

    h2 {
        color: #2c3e50;
        margin-top: 2rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid #eee;
        padding-bottom: 0.5rem;
    }

    .optional-question-selector {
        margin: 2rem 0;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 4px;
        border-left: 4px solid #3498db;
    }
    
    .radio-group {
        display: flex;
        gap: 2rem;
        margin-top: 1rem;
    }
    
    .radio-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.1rem;
        cursor: pointer;
    }
    
    .radio-label input[type="radio"] {
        margin: 0;
        width: 1.2rem;
        height: 1.2rem;
    }
    
    .radio-label input[type="radio"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .parts-section {
        margin-top: 1rem;
    }
</style>
