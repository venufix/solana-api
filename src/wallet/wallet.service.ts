import { Injectable } from '@nestjs/common';
import { Connection, clusterApiUrl, PublicKey, AccountBalancePair } from '@solana/web3.js';
import { IWallet } from './interfaces/wallet.interface';

@Injectable()
export class WalletService {

    private readonly CLUSTER_API = 'mainnet-beta';
    private _connection: Connection
    constructor() {
        this._connection = new Connection(clusterApiUrl(this.CLUSTER_API));

    }

    public async getAllAccounts(): Promise<IWallet[]> {
        const accounts = await this._connection.getLargestAccounts();
        const wallets: IWallet[] = accounts.value.map((account: AccountBalancePair) => this._createWallet(account.address, account.lamports));
        return wallets;
    }
    public async getAccountInfo(pubKey: PublicKey): Promise<IWallet> {
        const account = await this._connection.getAccountInfo(pubKey);
        return this._createWallet(pubKey, account.lamports);
    }

    private _createWallet(publicKey: PublicKey, lamports: number): IWallet {
        return { accountKey: publicKey.toString(), sol: (lamports * 0.000000001) };
    }
}
