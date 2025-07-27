import { RedisCacheRepository } from "../../http/cache/redis-cache-repository";
import { RedisService } from "../../http/cache/redis-service";

interface InputRequisitionUseCaseRequest {
  text: string;
  object: object;
}

export class InputRequisitionUseCase {
  redisService = new RedisService();
  redisCacheRepository = new RedisCacheRepository(this.redisService);
  async execute({
    text,
    object,
  }: InputRequisitionUseCaseRequest): Promise<void> {
    await this.redisCacheRepository.set(`req:${text}`, JSON.stringify(object));
  }
}
