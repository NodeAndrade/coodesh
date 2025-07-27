import { Request, Response } from "express";
import { MostUsedWordsUseCase } from "../../domain/use-cases/most-used-words-use-case";
import { HowManyWordsUseCase } from "../../domain/use-cases/how-many-words-use-case";
import { SentimentService } from "../../domain/services/sentiment-service";
import { SentimentServiceError } from "../../domain/error/sentiment-service-error";
import { FindRecentRequisitionUseCase } from "../../domain/use-cases/find-recent-requisition-use-case";
import { InputRequisitionUseCase } from "../../domain/use-cases/input-requisition-use-case";

export class IndexController {
  findRecentRequisition = new FindRecentRequisitionUseCase();
  inputRequisition = new InputRequisitionUseCase();
  mostUsedWordsUseCase = new MostUsedWordsUseCase();
  howManyWordsUseCase = new HowManyWordsUseCase();
  sentimentService = new SentimentService();
  public async getIndex(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const text = body.text;

    const response = await this.findRecentRequisition.execute({ text });
    if (response.recentRequisition != null) {
      res.send({
        resultHowManyWords: response.recentRequisition?.resultHowManyWords,
        resultMostUsedWords: response.recentRequisition?.resultMostUsedWords,
        sentimento: response.recentRequisition?.sentimento,
        confianca: response.recentRequisition?.confianca,
      });
      return;
    }

    const { resultHowManyWords } = await this.howManyWordsUseCase.execute({
      text,
    });

    const { resultMostUsedWords } = await this.mostUsedWordsUseCase.execute({
      text,
    });
    try {
      const { sentimento, confianca } = await this.sentimentService.execute({
        text,
      });
      const object = {
        resultHowManyWords,
        resultMostUsedWords,
        sentimento,
        confianca,
      };
      await this.inputRequisition.execute({ text, object });

      res.send({
        resultHowManyWords,
        resultMostUsedWords,
        sentimento,
        confianca,
      });
    } catch (error) {
      if (error instanceof SentimentServiceError) {
        res.status(400).send({ error });
      }
      res.status(404).send({ error });
    }
  }
}
