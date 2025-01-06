export type PostType = 'carousel' | 'static' | 'reels';

export interface LangflowResponse {
  outputs: Array<{
    outputs: Array<{
      outputs: {
        message: {
          text: string;
        };
      };
      artifacts: {
        stream_url?: string;
      };
    }>;
  }>;
}
