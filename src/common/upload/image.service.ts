import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ImageService {
  private readonly storageRoot = join(process.cwd(), 'images');

  async removeImage(entity: string, imageName: string): Promise<void> {
    if (!imageName || imageName.startsWith('http')) {
      return;
    }

    const filePath = join(this.storageRoot, entity, imageName);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }
}
