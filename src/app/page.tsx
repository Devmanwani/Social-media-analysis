'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LangflowClient } from '@/lib/langflow-client'
import type { PostType } from '@/types'

export default function Home() {
  const [postType, setPostType] = useState<PostType>('static')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setOutput('')

    const client = new LangflowClient()

    try {
      const response = await client.generateContent(postType)

      // Directly use the cleaned-up response (content) to set the output
      if (response && response.content) {
        setOutput(response.content)
      } else {
        setOutput('No content generated')
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
      setOutput('Error generating content')
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Social Media Performance Analysis</h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Post Type</label>
                <Select value={postType} onValueChange={(value) => setPostType(value as PostType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="static">Static</SelectItem>
                    <SelectItem value="reels">Reels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Post'}
              </Button>

              {output && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Generated Content</label>
                  <Card className="p-4 bg-muted">
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  )
}
