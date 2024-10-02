"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const serverUrl = "https://diamtestnet.diamcircle.io";
const sourceSecretKey = "SCSYFJ2NITMOQB23DEL3PVEDNIEUJYOC6GYUA6KOAHQL7TACNJE6ASRH";
const destinationId = "GBJF34HTOVA6HBZCW3L3RY3RERIT3MW5BQ67QFVTIQSABM6D45TEU3OV";

const PaymentPage = () => {
    const router = useRouter();
    const [resultMessage, setResultMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const amount = new URLSearchParams(window.location.search).get("amount"); // Get amount from query params

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/diamnet-sdk";
        script.onload = () => {
            // SDK loaded
        };
        document.head.appendChild(script);
    }, []);

    const performPayment = async () => {
        let transaction;

        if (typeof DiamSdk === "undefined") {
            console.error("DiamSdk is not loaded!");
            setResultMessage("SDK not loaded!");
            return;
        }

        try {
            const server = new DiamSdk.Aurora.Server(serverUrl);
            await server.loadAccount(destinationId);
        } catch (error) {
            if (error instanceof DiamSdk.NotFoundError) {
                setResultMessage("The destination account does not exist!");
                return;
            }
            console.error("Error loading destination account:", error);
            return;
        }

        try {
            const sourceKeys = DiamSdk.Keypair.fromSecret(sourceSecretKey);
            const server = new DiamSdk.Aurora.Server(serverUrl);
            const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

            transaction = new DiamSdk.TransactionBuilder(sourceAccount, {
                fee: DiamSdk.BASE_FEE,
                networkPassphrase: DiamSdk.Networks.TESTNET,
            })
                .addOperation(
                    DiamSdk.Operation.payment({
                        destination: destinationId,
                        asset: DiamSdk.Asset.native(),
                        amount: amount, // Use the dynamic amount here
                    })
                )
                .addMemo(DiamSdk.Memo.text(`Payment of ${amount} Diams`))
                .setTimeout(180)
                .build();

            transaction.sign(sourceKeys);

            const result = await server.submitTransaction(transaction);
            console.log("Transaction Success:", result);
            setResultMessage(`Payment of ${amount} Diams was successful!`);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                router.push("/Tn-quiz");
            }, 3000); // 3 seconds timeout for alert
        } catch (error) {
            console.error("Something went wrong during transaction submission:", error);
            setResultMessage("Transaction failed!");
            setShowAlert(false);
        }
    };

    return (
        <div className="app-container">
            {showAlert && (
                <div className="alert-success">
                    Payment of {amount} Diams was successful!
                </div>
            )}
            <button className="claim-button" onClick={performPayment}>
                Claim {amount} Diams
            </button>
            {resultMessage && <div id="result">{resultMessage}</div>}

            <style jsx>{`
                .app-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: black;
                    color: white;
                }
                .claim-button {
                    padding: 15px 30px;
                    background-color: #FFD700;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }
                .claim-button:hover {
                    background-color: #FFC700;
                }
                .alert-success {
                    background-color: #4CAF50;
                    color: white;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default PaymentPage;
