import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import z from 'zod';
import { zodFunction } from 'openai/helpers/zod';

// Accept JSON schema for query arguments
const RequestSchema = z.object({
    query: z.string(),
    model: z.string().optional().default('gpt-4'),
    querySchema: z.record(z.any()), // JSON schema for query arguments
});

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: process.env.AZURE_OPENAI_API_BASE,
    defaultQuery: { 'api-version': '2024-02-15-preview' },
    defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY }
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { query, model, querySchema } = RequestSchema.parse(body);

        const completion = await openai.beta.chat.completions.parse({
            model: model,
            messages: [
                { 
                    role: 'system', 
                    content: 'You are a helpful assistant that helps users query for the data they are looking for by calling the query function. Current date is ' + new Date().toISOString() 
                },
                { role: 'user', content: query }
            ],
            tools: [{ 
                type: 'function',
                function: {
                    name: 'query',
                    parameters: querySchema
                }
            }],
        });

        const parsedArgs = completion.choices[0].message.tool_calls?.[0]?.function.parsed_arguments;

        return NextResponse.json({ 
            success: true,
            query: parsedArgs 
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
} 