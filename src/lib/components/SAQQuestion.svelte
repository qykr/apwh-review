<script lang="ts">
    import QuestionSection from './QuestionSection.svelte';
    
    export let saq: {
        context?: {
            type: 'text' | 'image';
            content?: string;
            source?: string;
            title?: string;
            description?: string;
            imageUrl?: string;
            citation?: string;
            caption?: string;
        };
        parts: string[];
    };
    export let saqIndex: number;
    export let answers: Record<string, Record<string, string>>;
    export let feedback: Record<string, Record<string, string>>;
    export let isTimeUp: boolean;
    export let isSubmitted: boolean;
    
    const nthLetter = (n: number) => String.fromCharCode(97 + n);
</script>

<div class="saq-question">
    <h2>Short Answer Question {saqIndex + 1}</h2>

    {#if saq.context}
        <div class="context-section">
            {#if saq.context.type === 'text'}
                <div class="text-context">
                    <p class="context-content">{saq.context.content}</p>
                    <p class="context-source">Source: {saq.context.source}</p>
                </div>
            {:else if saq.context.type === 'image'}
                <div class="image-context">
                    <h3>{saq.context.title}</h3>
                    {#if saq.context.description}
                        <p class="context-description">{saq.context.description}</p>
                    {/if}
                    <div class="image-container">
                        <img src={saq.context.imageUrl} alt={saq.context.title} />
                    </div>
                    <p class="context-citation">Citation: {saq.context.citation}</p>
                    {#if saq.context.caption}
                        <p class="context-caption">{saq.context.caption}</p>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}

    <div class="parts-section">
        {#each saq.parts as part, partIndex}
            <QuestionSection
                question={part}
                letter={nthLetter(partIndex)}
                bind:answer={answers[saqIndex.toString()][nthLetter(partIndex)]}
                feedback={feedback[saqIndex.toString()]?.[nthLetter(partIndex)]}
                on:updateFeedback={(e) => {
                    if (!feedback[saqIndex.toString()]) {
                        feedback[saqIndex.toString()] = {};
                    }
                    feedback[saqIndex.toString()][nthLetter(partIndex)] = e.detail;
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

    .context-section {
        background-color: #f8f9fa;
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-left: 4px solid #2c3e50;
        border-radius: 0 4px 4px 0;
    }

    .text-context .context-content {
        white-space: pre-line;
        margin-bottom: 0.5rem;
    }

    .text-context .context-source {
        font-style: italic;
        font-size: 0.9rem;
    }

    .image-context h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .image-container {
        margin: 1rem 0;
        text-align: center;
    }

    .image-container img {
        max-width: 100%;
        max-height: 400px;
        border: 1px solid #ddd;
    }

    .context-description, .context-caption {
        font-size: 0.9rem;
        margin: 0.5rem 0;
    }

    .context-citation {
        font-size: 0.8rem;
        color: #666;
        margin: 0.5rem 0;
    }

    .parts-section {
        margin-top: 1rem;
    }
</style>
