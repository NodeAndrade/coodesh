export class SentimentServiceError extends Error {
  constructor() {
    super("Falha na análise de sentimento.");
  }
}
