<script lang="ts">
    import { goto } from '$app/navigation';

    export let data;

    // Default time in minutes
    let selectedTime = 40;

    // Default selected SAQ set (first one)
    let selectedSAQSet = data.saqSets[0].label;

    // Handle form submission
    function startTest() {
        // Find the index of the selected SAQ set
        const saqSetIndex = data.saqSets.findIndex(set => set.label === selectedSAQSet);

        // Navigate to the SAQ test with the selected parameters
        goto(`/saq_test?set=${saqSetIndex}&time=${selectedTime}`);
    }
</script>

<main>
    <div class="container">
        <h1>AP World History Practice</h1>

        <div class="selection-card">
            <form on:submit|preventDefault={startTest}>
                <div class="form-group">
                    <label for="saq-set">Select SAQ Set:</label>
                    <select id="saq-set" bind:value={selectedSAQSet}>
                        {#each data.saqSets as saqSet}
                            <option value={saqSet.label}>{saqSet.label}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-group">
                    <label for="time-input">Time (minutes):</label>
                    <input
                        id="time-input"
                        type="number"
                        bind:value={selectedTime}
                        min="1"
                        max="120"
                        step="1"
                    />
                </div>

                <button type="submit" class="start-button">Start Practice</button>
            </form>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f5f7fa;
    }

    .container {
        width: 100%;
        max-width: 500px;
        padding: 0 20px;
    }

    h1 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 2rem;
    }

    .selection-card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 2rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #4a5568;
    }

    select, input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #cbd5e0;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box; /* Ensures padding is included in width */
    }

    input[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .start-button {
        display: block;
        width: 100%;
        padding: 0.75rem;
        background-color: #2c3e50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .start-button:hover {
        background-color: #34495e;
    }
</style>