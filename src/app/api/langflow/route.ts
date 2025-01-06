import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.langflow.astra.datastax.com';
const FLOW_ID = 'e8de5f37-23b9-4abb-a830-939c137a1f98';
const LANGFLOW_ID = 'd3f354ea-7e2a-4210-8cc8-2804dce0fa6d';

export async function POST(request: Request) {
  try {
    const { postType } = await request.json();

    const response = await fetch(
      `${BASE_URL}/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}?stream=false`, // Adjust stream=false
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LANGFLOW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: postType,
          input_type: 'chat',
          output_type: 'chat',
          tweaks: {},
        }),
      }
    );

    const data = await response.json();

    // Extract the relevant text from the response
    const extractedText =
      data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
      data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ||
      'No content generated';

    console.log(extractedText)
    // Return the cleaned-up response
    return NextResponse.json({ content: extractedText });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
