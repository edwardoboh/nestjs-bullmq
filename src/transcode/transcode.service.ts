import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { QUEUE_NAME } from "src/contants";

@Injectable()
export class TranscodeService{

    constructor(@InjectQueue(QUEUE_NAME) private readonly transcodeQueue: Queue){}

    async transcode(): Promise<any>{
        await this.transcodeQueue.add({
            name: 'video clip',
            path: './file/path',
        })
        return 'Video Processing'
    }
}