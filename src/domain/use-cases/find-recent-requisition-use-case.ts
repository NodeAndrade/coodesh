import { RedisCacheRepository } from "../../http/cache/redis-cache-repository";
import { RedisService } from "../../http/cache/redis-service";

interface FindRecentRequisitionUseCaseRequest {
  text: string;
}

interface FindRecentRequisitionCacheResponse {
  resultHowManyWords: number;
  resultMostUsedWords: string;
  sentimento: string;
  confianca: number;
}

interface FindRecentRequisitionUseCaseResponse {
  recentRequisition: FindRecentRequisitionCacheResponse | null;
}

export class FindRecentRequisitionUseCase {
  redisService = new RedisService();
  redisCacheRepository = new RedisCacheRepository(this.redisService);
  async execute({
    text,
  }: FindRecentRequisitionUseCaseRequest): Promise<FindRecentRequisitionUseCaseResponse> {
    const cacheHit = await this.redisCacheRepository.get(`req:${text}`);

    if (!cacheHit) {
      return { recentRequisition: null };
    }
    const cachedData = JSON.parse(cacheHit);
    return { recentRequisition: cachedData };
  }
}
