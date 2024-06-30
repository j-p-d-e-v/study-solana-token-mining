import 'dotenv/config';
import { 
    Connection, 
    PublicKey, 
    Keypair, 
    clusterApiUrl, 
    LAMPORTS_PER_SOL, 
    Transaction,
    sendAndConfirmTransaction,
    
} from '@solana/web3.js';
import {
    airdropIfRequired,
    getKeypairFromEnvironment
} from '@solana-developers/helpers';
import {
    createCreateMetadataAccountV3Instruction
} from '@metaplex-foundation/mpl-token-metadata';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

const local_devnet = "http://127.0.0.1:8899";
const connection = new Connection(local_devnet,{
    commitment: "confirmed"
});
const user = getKeypairFromEnvironment("SECRET_KEY")
const mintAuthKey = getKeypairFromEnvironment("MINT_AUTH_SECRET_KEY")
const mintPubKey = new PublicKey(process.env.TOKEN_MINT_PUBLIC_KEY);
console.log("user",user);
console.log("mint",mintPubKey);
console.log("mintAuthKey",mintAuthKey);

console.log("TOKEN_2022_PROGRAM_ID",TOKEN_2022_PROGRAM_ID)
const TOKEN_METADATA_PROGRAM_ID  = TOKEN_2022_PROGRAM_ID; //new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const metadataData = {
    name: "JPDEV SOLANA",
    symbol: "TRAINING",
    uri: "https://www.tiktok.com/@jpm.dev",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};
print(Buffer.from("metadata"))

const metadataPDAAndBump = PublicKey.findProgramAddressSync([
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    mintPubKey.toBuffer()
],TOKEN_METADATA_PROGRAM_ID);

const metadataPDA = metadataPDAAndBump[0];
console.log("metadataPDA",metadataPDA)

const transaction = new Transaction();

const createMetadataAccountInstruction  = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: mintPubKey,
        mintAuthority: mintAuthKey.publicKey,
        payer: user.publicKey,
        updateAuthority: mintAuthKey.publicKey
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true
        },
    }
);

transaction.add(createMetadataAccountInstruction);

const transactionSig = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user, mintAuthKey]);
    
console.log("transactionSig",transactionSig)