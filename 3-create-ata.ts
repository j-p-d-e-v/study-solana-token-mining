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
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccount,
    getOrCreateAssociatedTokenAccount
} from '@solana/spl-token';


const local_devnet = "http://127.0.0.1:8899";
const connection = new Connection(local_devnet,{
    commitment: "confirmed"
});
const payer = getKeypairFromEnvironment("SECRET_KEY")
const user1Key = getKeypairFromEnvironment("USER1_SECRET_KEY");
const user2Key = getKeypairFromEnvironment("USER2_SECRET_KEY");
const mintPubKey = new PublicKey(process.env.TOKEN_MINT_PUBLIC_KEY);
console.log(user1Key);
console.log(user2Key);
console.log(mintPubKey);

const user1ATA = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintPubKey,
    user1Key.publicKey
)

const user2ATA = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintPubKey,
    user2Key.publicKey
)

console.log("user1ATA",user1ATA)
console.log("user2ATA",user2ATA)