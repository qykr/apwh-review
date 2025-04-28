import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Import the API key from environment variables
import { OPENAI_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const { question, originalAnswer, previousFeedback, followupQuestion } = await request.json();

    try {
        // Check if API key is available
        if (!OPENAI_API_KEY) {
            console.error('No OpenAI API key available');
            return json({ error: 'API key not configured' }, { status: 500 });
        }

        // Use OpenAI API for followup
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an experienced AP World History teacher having a conversation with a student about their SAQ response.'
                    },
                    {
                        role: 'user',
                        content: `Context:
Original Question: ${question}
Student's Answer: ${originalAnswer}
Previous Feedback: ${previousFeedback}

Student's Follow-up Question: ${followupQuestion}

Provide a helpful response to the student's follow-up question, maintaining the context of the original answer and feedback.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            console.error('OpenAI API error:', await response.text());
            throw new Error('OpenAI API request failed');
        }

        const result = await response.json();
        return json({ response: result.choices[0].message.content });
    } catch (error) {
        console.error('Error processing followup:', error);
        return json({ error: 'Failed to process followup question. Please try again.' }, { status: 500 });
    }
};