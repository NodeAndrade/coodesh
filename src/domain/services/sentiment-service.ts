import axios from "axios";
import { SentimentServiceError } from "../error/sentiment-service-error";
import { ResourceNotFoundError } from "../error/resource-not-found-error";
import dotenv from "dotenv";
dotenv.config();

interface SentimentServiceRequest {
  text: string;
}

interface SentimentServiceResponse {
  sentimento: string;
  confianca: number;
}

export class SentimentService {
  async execute({
    text,
  }: SentimentServiceRequest): Promise<SentimentServiceResponse> {
    const url = process.env.HF_API_URL;
    if (!url) {
      throw new ResourceNotFoundError();
    }
    try {
      const response = await axios.post(
        url,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // A resposta retorna algo como: [{ label: 'POSITIVE', score: 0.98 }]
      const resultado = response.data[0];
      const sentimento = resultado[0].label;
      const confianca = resultado[0].score;

      return {
        sentimento,
        confianca,
      };
    } catch (erro: any) {
      console.error("Erro ao consultar a API de sentimento:", erro);
      throw new SentimentServiceError();
    }
  }
}
