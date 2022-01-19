import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';

@Injectable()
export class PublicKeyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): PublicKey {
    return new PublicKey(value);
  }
}
