import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceRecordingModule } from './voice-recording/voice-recording.module';

@Module({
  imports: [VoiceRecordingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
