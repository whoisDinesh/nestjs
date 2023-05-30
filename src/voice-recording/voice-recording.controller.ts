import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import { S3 } from 'aws-sdk';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('recordings')
@ApiTags('Voice Recording')
export class VoiceRecordingController {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: 'AKIAYI6QPS7T7MWFI53M',
      secretAccessKey: '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',
      region: 'us-east-2',
    });
  }




  @Post()
  @UseInterceptors(FileInterceptor('voice', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  }))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'The recorded voice file to upload',
  //   type: 'multipart/form-data',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       voice: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The uploaded file information',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       filename: {
  //         type: 'string',
  //       },
  //       path: {
  //         type: 'string',
  //       },
  //     },
  //   },
  // })
@ApiOperation({ summary: 'Record and upload voice file' })
@ApiConsumes('multipart/form-data')
@ApiResponse({ status: 201, description: 'File uploaded successfully' })
@ApiResponse({ status: 500, description: 'Failed to upload file' })
  async create(@UploadedFile() voiceFile: Express.Multer.File) {
    const uploadParams = {
      Bucket: 'grouphomeadminprivatefiles',
      Key: `recordings/${voiceFile.filename}`,
      Body: voiceFile.buffer,
    };

    try {
      console.log(uploadParams)
      await this.s3.upload(uploadParams).promise();
      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw new Error('Failed to upload file');
    }
  }
}
