import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      // take the file by name
      path.resolve(uploadConfig.tmpFolder, file),
      // change file to uploads folder
      path.resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    // path to take our file
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      // stat bring information about file, if not found it show up error
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    // use unlink to delete the file
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
