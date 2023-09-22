import { Module } from '@nestjs/common';
import { TranscodeController } from './transcode.controller';
import { TranscodeService } from './transcode.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/contants';
import { TranscodeConsumer } from './transcode.consumer';

@Module({
    imports: [
        ConfigModule.forRoot(),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    redis: {
                        host: config.get('REDIS_HOST'),
                        port: config.get('REDIS_PORT')
                    }
                }
            },
            inject: [ConfigService]
        }),
        BullModule.registerQueue({
            name: QUEUE_NAME
        })
    ],
    controllers: [TranscodeController],
    providers: [
        TranscodeService,
        TranscodeConsumer
    ],
})
export class TranscodeModule {}
