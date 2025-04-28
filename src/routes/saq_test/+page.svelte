<script lang="ts">
    import SAQQuestion from '$lib/components/SAQQuestion.svelte';
    import OptionalQuestionSelector from '$lib/components/OptionalQuestionSelector.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import WarningModal from '$lib/components/WarningModal.svelte';

    export let data;

    const nthLetter = (n: number) => String.fromCharCode(97 + n);

    // Use the selected SAQ set from the URL parameters
    const chosenSet = data.selectedSet;

    // Get the first two questions (with context) from the set
    const firstTwoQuestions = chosenSet.questions.slice(0, 2);

    // Get questions 3 and 4 (without context)
    const question3 = chosenSet.questions[2];
    const question4 = chosenSet.questions[3];

    // Track which optional question is selected (3 or 4)
    let selectedOptionalQuestion = 3; // Default to question 3

    // Combine the questions for display
    $: saqQuestions = [
        ...firstTwoQuestions,
        selectedOptionalQuestion === 3 ? question3 : question4
    ];

    // Initialize answers for each part of each SAQ, including both optional questions
    let answers: Record<string, Record<string, string>> = {};

    // Initialize answers for the first two questions
    chosenSet.questions.forEach((saq, saqIndex) => {
        answers[saqIndex] = {};
        saq.parts.forEach((_, partIndex) => {
            answers[saqIndex][nthLetter(partIndex)] = '';
        });
    });

    let feedback: Record<string, Record<string, string>> = {};
    let isLoading = false;
    let isTimeUp = false;
    let isSubmitted = false;
    let showWarning = false;

    function hasBlankAnswers() {
        return Object.values(answers).some(saqAnswers =>
            Object.values(saqAnswers).some(answer => !answer.trim())
        );
    }

    async function handleSubmit(bypassWarning = false) {
        if (isLoading) return;

        if (!bypassWarning && hasBlankAnswers() && !showWarning) {
            showWarning = true;
            return;
        }

        showWarning = false;
        isLoading = true;

        try {
            interface FormattedAnswer {
                saqIndex: string;
                letter: string;
                question: string;
                answer: string;
            }

            const formattedAnswers: FormattedAnswer[] = [];

            // Format answers for submission
            // Include only the first two questions and the selected optional question
            const validIndices = ['0', '1', selectedOptionalQuestion === 3 ? '2' : '3'];

            Object.entries(answers).forEach(([saqIndex, saqAnswers]) => {
                // Skip the question that's not selected
                if (!validIndices.includes(saqIndex)) {
                    return;
                }

                // Map the index to the correct question
                let questionIndex = Number(saqIndex);
                if (questionIndex > 1) {
                    // For the third displayed question, use the actual index in saqQuestions (which is 2)
                    questionIndex = 2;
                }

                const saq = saqQuestions[questionIndex];

                Object.entries(saqAnswers).forEach(([letter, answer]) => {
                    const partIndex = letter.charCodeAt(0) - 97;
                    formattedAnswers.push({
                        saqIndex,
                        letter,
                        question: saq.parts[partIndex],
                        answer
                    });
                });
            });

            const response = await fetch('/api/grade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answers: formattedAnswers
                })
            });

            if (!response.ok) {
                throw new Error('Failed to grade answers');
            }

            const result = await response.json();

            // Format feedback
            console.log('Received feedback:', result);

            Object.entries(result).forEach(([key, value]) => {
                console.log('Processing feedback key:', key, 'value:', value);
                const [saqIndex, letter] = key.split('-');
                console.log('Parsed saqIndex:', saqIndex, 'letter:', letter);

                if (!feedback[saqIndex]) {
                    feedback[saqIndex] = {};
                }

                feedback[saqIndex][letter] = value as string;
            });

            console.log('Final feedback object:', feedback);

            isSubmitted = true;
        } catch (error) {
            console.error('Error grading answers:', error);
            feedback = {
                '0': {
                    'a': 'Failed to grade answers. Please try again.'
                }
            };
        } finally {
            isLoading = false;
        }
    }

    async function handleTimeUp() {
        isTimeUp = true;
        await handleSubmit();
    }

    function handleProceed() {
        handleSubmit(true);
    }

    function handleClose() {
        showWarning = false;
    }
</script>

<main>
    <Timer
        onTimeUp={handleTimeUp}
        timeInMinutes={data.timeInMinutes}
        frozen={isTimeUp || isSubmitted}
    />

    <h1>AP World History: {chosenSet.label} ({data.timeInMinutes} minutes)</h1>
    {#if isTimeUp}
        <div class="time-up-banner">
            Time's up! Your answers have been submitted automatically.
        </div>
    {/if}
    {#if isSubmitted && !isTimeUp}
        <div class="submitted-banner">
            Your answers have been submitted successfully.
        </div>
    {/if}

    {#if showWarning}
        <WarningModal
            onClose={handleClose}
            onProceed={handleProceed}
        />
    {/if}

    <form on:submit|preventDefault={() => handleSubmit()}>
        <!-- First two questions -->
        {#each saqQuestions.slice(0, 2) as saq, saqIndex}
            <SAQQuestion
                {saq}
                {saqIndex}
                bind:answers
                bind:feedback
                {isTimeUp}
                {isSubmitted}
            />
        {/each}

        <!-- Optional question selector and display -->
        <OptionalQuestionSelector
            question3={question3}
            question4={question4}
            bind:selectedOptionalQuestion
            bind:answers
            bind:feedback
            {isTimeUp}
            {isSubmitted}
        />

        <button
            type="submit"
            disabled={isLoading || isTimeUp || isSubmitted}
        >
            {isLoading ? 'Grading...' : 'Submit Answers'}
        </button>
    </form>
</main>

<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 1.5rem;
    }

    button {
        background-color: #2c3e50;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
        background-color: #34495e;
    }

    button:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
    }

    .time-up-banner {
        background-color: #e74c3c;
        color: white;
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 4px;
        text-align: center;
        font-weight: bold;
    }

    .submitted-banner {
        background-color: #2ecc71;
        color: white;
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 4px;
        text-align: center;
        font-weight: bold;
    }
</style>
