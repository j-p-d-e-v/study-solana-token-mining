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
} from '@solana/spl-token';


const local_devnet = "http://127.0.0.1:8899";
const connection = new Connection(local_devnet);

const payerKey = getKeypairFromEnvironment("SECRET_KEY");

const user1 = Keypair.generate();
const user2 = Keypair.generate();

const transaction1 = new Transaction();
const rentExemptAmount = await connection.getMinimumBalanceForRentExemption(0);
transaction1.add(SystemProgram.createAccount({
    fromPubkey: payerKey.publicKey,
    newAccountPubkey: user1.publicKey,
    lamports: 0,
    space:0,
    programId: TOKEN_PROGRAM_ID
}));
await sendAndConfirmTransaction(connection,transaction1,[payerKey,user1]);

const transaction2 = new Transaction();
transaction2.add(SystemProgram.createAccount({
    fromPubkey: payerKey.publicKey,
    newAccountPubkey: user2.publicKey,
    lamports: 0,
    space:0,
    programId: TOKEN_PROGRAM_ID
}));
await sendAndConfirmTransaction(connection,transaction2,[payerKey,user2]);

console.log("=======================================================")
console.log("user1Secret",user1.secretKey.toString());
console.log("user1Pub",user1.publicKey.toBase58());
console.log("=======================================================")
console.log("user2Secret",user2.secretKey.toString());
console.log("user2Pub",user2.publicKey.toBase58());