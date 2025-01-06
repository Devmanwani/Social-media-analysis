export class LangflowClient {
  async generateContent(postType: string) {
    try {
      const response = await fetch('/api/langflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postType }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

}
