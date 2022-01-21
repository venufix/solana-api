import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublicKey } from '@solana/web3.js';
import { IWallet } from './interfaces/wallet.interface';
import { PublicKeyPipe } from './pipes/public-key.pipe';
import { WalletService } from './wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly _walletService: WalletService,) { }

  @Get()
  async getAllWallets(): Promise<IWallet[]> {
    console.log('Request all wallets')
    return await this._walletService.getAllAccounts();
  }


  @Get(':publicKey')
  @ApiParam({
    name: 'publicKey',
    required: true,
    description: 'Wallet public key',
    example: '7ivguYMpnUBMboByJbKc7z31fJMg2pXYQ4nNPziWLchZ',
    type: String,
  })
  async getWalletMetadata(@Param('publicKey', PublicKeyPipe) publicKey: PublicKey): Promise<IWallet> {
    console.log(`Requested specific wallet with pubkey: ${publicKey}`)
    const wallet = await this._walletService.getAccountInfo(publicKey);
    return wallet;
  }
}
