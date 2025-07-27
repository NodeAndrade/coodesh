interface HowManyWordsUseCaseRequest {
  text: string;
}

interface HowManyWordsUseCaseResponse {
  resultHowManyWords: number | undefined;
}

export class HowManyWordsUseCase {
  async execute({
    text,
  }: HowManyWordsUseCaseRequest): Promise<HowManyWordsUseCaseResponse> {
    if (typeof text === "string") {
      const palavras = text.trim().split(/\s+/);
      return { resultHowManyWords: palavras.length };
    } else {
      throw new Error("Invalid Text");
    }
  }
}
