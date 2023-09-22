import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { QUEUE_NAME } from "src/contants";

@Processor(QUEUE_NAME)
export class TranscodeConsumer{
    logger: Logger = new Logger(TranscodeConsumer.name);

    @Process()
    async transcode(message: any): Promise<any>{
        this.logger.log(`Job: ${message.id} now Started!!`);
        this.logger.log(JSON.stringify(message));

        await new Promise<void>((resolve) => {setTimeout(() => {resolve()}, 6000)});
        this.logger.log(`Job: ${message.id} now Done!!`);
    }
}