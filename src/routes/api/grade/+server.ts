import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Import the API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const POST: RequestHandler = async ({ request }) => {
    const { answers } = await request.json();

    try {
        // Check if API key is available
        if (!OPENAI_API_KEY) {
            console.error('No OpenAI API key available');
            return json({ error: 'API key not configured' }, { status: 500 });
        }

        // Use OpenAI API to grade answers
        const feedbackResponses = await Promise.all(
            answers.map(async ({ saqIndex, letter, question, answer }: { saqIndex: string; letter: string; question: string; answer: string }) => {
                const prompt =
`You are an AP World History exam grader. Grade the following Short Answer Question (SAQ) response.

Context:
- This is an AP World History SAQ
- SAQ responses should directly answer the question
- Include specific historical examples
- Explain historical significance
- Be within the timeframe of 1450-1750
- Be concise (~3 sentences per part)

Question: ${question}
Student's Answer: ${answer}

Provide an evaluation of the response, including:
1. Whether it directly answers the question
2. Use of specific historical evidence
3. Explanation of significance
4. Suggestions for improvement
5. Final grade (on a scale of 1-100)
6. Give an example of what a good response would look like."

Use double line breaks to separate each point.
Do not say anything beyond these points.
If an answer is left blank, say "The student hasn't provided an answer to grade."
Keep your feedback concise and constructive.`;

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
                                role: 'user',
                                content: prompt
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
                return [`${saqIndex}-${letter}`, result.choices[0].message.content];
            })
        );

        return json(Object.fromEntries(feedbackResponses));
    } catch (error) {
        console.error('Error grading answers:', error);
        return json({ error: 'Failed to grade answers. Please try again.' }, { status: 500 });
    }
};
