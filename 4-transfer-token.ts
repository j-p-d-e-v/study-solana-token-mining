import 'dotenv/config';
import { 
    Connection, 
    PublicKey, 
    Keypair, 
    clusterApiUrl, 
    LAMPORTS_PER_SOL, 
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    
} from '@solana/web3.js';
import {
    getKeypairFromEnvironment
} from '@solana-developers/helpers';
import  {
    transfer
} from '@solana/spl-token';


const local_devnet = "http://127.0.0.1:8899";
const connection = new Connection(local_devnet,{
    commitment: "confirmed"
});
const payer = getKeypairFromEnvironment("SECRET_KEY")
const tokenAccountKey = getKeypairFromEnvironment("TOKEN_ACCOUNT_SECRET_KEY")
const user1Key = getKeypairFromEnvironment("USER1_SECRET_KEY");
const user2Key = getKeypairFromEnvironment("USER2_SECRET_KEY");
const user1ATAPublicKey = new PublicKey(process.env.USER1_ATA_PUBLIC_KEY);
const user2ATAPublicKey = new PublicKey(process.env.USER2_ATA_PUBLIC_KEY);
const mintPubKey = new PublicKey(process.env.TOKEN_MINT_PUBLIC_KEY);
console.log(user1Key);
console.log(user2Key);
console.log(mintPubKey);

/**
 *  Token Account -> User 1
 * 
 */

const tA_to_user1 = await transfer(
    connection,
    payer,
    tokenAccountKey.publicKey,
    user1ATAPublicKey,
    tokenAccountKey,
    300 * 1000000
);
console.log("Token Account to User 1: 300 Tokens");
console.log("tA_to_user1",tA_to_user1)
console.log("====================================================")


/**
 *  Token Account -> User 1
 * 
 */

const user1_to_user2 = await transfer(
    connection,
    payer,
    user1ATAPublicKey,
    user2ATAPublicKey,
    user1Key,
    150 * 1000000
);
console.log("User 1 to User 2: 150 Tokens");
console.log("user1_to_user2",user1_to_user2)
console.log("====================================================")

