import { Test, TestingModule } from '@nestjs/testing';
import { VoiceRecordingController } from './voice-recording.controller';

describe('VoiceRecordingController', () => {
  let controller: VoiceRecordingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceRecordingController],
    }).compile();

    controller = module.get<VoiceRecordingController>(VoiceRecordingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
