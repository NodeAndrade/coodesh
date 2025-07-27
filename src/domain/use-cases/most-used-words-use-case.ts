interface MostUsedWordsUseCaseRequest {
  text: string;
}

interface MostUsedWordsUseCaseResponse {
  resultMostUsedWords: string[] | null;
}

export class MostUsedWordsUseCase {
  async execute({
    text,
  }: MostUsedWordsUseCaseRequest): Promise<MostUsedWordsUseCaseResponse> {
    if (typeof text !== "string") return { resultMostUsedWords: null };

    // Remove pontuação e transforma em minúsculas
    const palavras = text
      .toLowerCase()
      .replace(/[.,!?;:()]/g, "")
      .split(/\s+/)
      .filter(Boolean); // Remove entradas vazias

    // Conta as ocorrências

    const contagem: Record<string, number> = {}; // <- aqui está a correção
    for (const palavra of palavras) {
      contagem[palavra] = (contagem[palavra] || 0) + 1;
    }

    // Ordena por frequência
    const top5 = Object.entries(contagem)
      .sort((a, b) => b[1] - a[1]) // b[1] = contagem
      .slice(0, 5) // Pega as 5 primeiras
      .map(([palavra, _]) => palavra); // Retorna só as palavras

    return { resultMostUsedWords: top5 };
  }
}
