import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { VoiceRecordingController } from './voice-recording.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [VoiceRecordingController],
})
export class VoiceRecordingModule {}
