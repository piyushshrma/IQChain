// Import Diamante SDK (this will be used in the HTML script tag)

// Diamante API server (Testnet)
const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io");


// Replace with your source account secret key
const sourceSecretKey = "SCSYFJ2NITMOQB23DEL3PVEDNIEUJYOC6GYUA6KOAHQL7TACNJE6ASRH";

// Destination account public keys
const destinationId = "GBJF34HTOVA6HBZCW3L3RY3RERIT3MW5BQ67QFVTIQSABM6D45TEU3OV";

const sourceKeys = DiamSdk.Keypair.fromSecret(sourceSecretKey);

async function performPayment() {
    let transaction;

    try {
        // Check if the destination account exists
        await server.loadAccount(destinationId);
    } catch (error) {
        if (error instanceof DiamSdk.NotFoundError) {
            document.getElementById("result").innerHTML = "The destination account does not exist!";
            return;
        } else {
            console.error("Error loading destination account:", error);
            return;
        }
    }

    // Load source account data
    try {
        const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

        // Build the transaction
        transaction = new DiamSdk.TransactionBuilder(sourceAccount, {
            fee: DiamSdk.BASE_FEE,
            networkPassphrase: DiamSdk.Networks.TESTNET
        })
            .addOperation(
                DiamSdk.Operation.payment({
                    destination: destinationId,
                    asset: DiamSdk.Asset.native(),
                    amount: "2",  // Fixed payment amount of 2 diams
                })
            )
            .addMemo(DiamSdk.Memo.text("Payment of 2 Diams")) // Optional memo
            .setTimeout(180) // 3 minutes timeout
            .build();

        // Sign the transaction
        transaction.sign(sourceKeys);

        // Submit the transaction to the network
        const result = await server.submitTransaction(transaction);
        console.log("Transaction Success:", result);
        document.getElementById("result").innerHTML = "Payment of 2 Diams was successful!";
    } catch (error) {
        console.error("Something went wrong during transaction submission:", error);
        document.getElementById("result").innerHTML = "Transaction failed!";
    }
}
