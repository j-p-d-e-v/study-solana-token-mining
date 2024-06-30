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
    getKeypairFromEnvironment,
    airdropIfRequired
} from '@solana-developers/helpers';
import { 
    createMint,
    createAccount,
    createAssociatedTokenAccount,
    mintTo,
} from '@solana/spl-token';

const payerKeyPair = getKeypairFromEnvironment("SECRET_KEY");
console.log("payerKeyPairSecret",payerKeyPair.secretKey.toString());
console.log("payerKeyPairPub",payerKeyPair.publicKey.toBase58());
const local_devnet = "http://127.0.0.1:8899";
const devnet = clusterApiUrl("devnet")
const connection = new Connection(local_devnet);
const decimals = 6;
const mintAuthority = Keypair.generate();
const freezeAuthority = Keypair.generate();
const ownerTokenAccount = Keypair.generate();

await airdropIfRequired(connection,payerKeyPair.publicKey,10*LAMPORTS_PER_SOL,0.5*LAMPORTS_PER_SOL);

console.log("Creating Token Mint");
const tokenMint = await createMint(
    connection,
    payerKeyPair,
    mintAuthority.publicKey,
    freezeAuthority.publicKey,
    decimals
);

console.log("Creating Token Account");
const tokenAccount = await createAccount(
    connection,
    payerKeyPair,
    tokenMint,
    ownerTokenAccount.publicKey,
    ownerTokenAccount
)

console.log("Creating Associated Token Account")
const associatedTokenAccount = await createAssociatedTokenAccount(
    connection,
    payerKeyPair,
    tokenMint,
    tokenAccount,
);
console.log("MinTo")
const mintToTransaction = await mintTo(
    connection,
    payerKeyPair,
    tokenMint,
    tokenAccount,
    mintAuthority,
    1000000000
)


console.log("=======================================================")
console.log("mintAuthoritySecret",mintAuthority.secretKey.toString());
console.log("mintAuthorityPub",mintAuthority.publicKey.toBase58());
console.log("=======================================================")
console.log("freezeAuthoritySecret",freezeAuthority.secretKey.toString());
console.log("freezeAuthorityPub",freezeAuthority.publicKey.toBase58());
console.log("=======================================================")
console.log("tokenMint",tokenMint.toBase58()); //Example: USDC mint address
console.log("=======================================================")
console.log("tokenAccount",tokenAccount.toBase58());
console.log("=======================================================")
console.log("ownerTokenAccountSecret",ownerTokenAccount.secretKey.toString());
console.log("ownerTokenAccountPub",ownerTokenAccount.publicKey.toBase58());
console.log("=======================================================")
console.log("associatedTokenAccount",associatedTokenAccount.toBase58());
console.log("=======================================================")
console.log("mintToTransaction",mintToTransaction.toString);
console.log("=======================================================")