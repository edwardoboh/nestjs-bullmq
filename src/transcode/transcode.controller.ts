import { Controller, Post } from "@nestjs/common";
import { TranscodeService } from "./transcode.service";

@Controller('transcode')
export class TranscodeController{
    constructor(private readonly transcodeService: TranscodeService){}

    @Post()
    async transcode(){
        return this.transcodeService.transcode()
    }
}