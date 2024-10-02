// app/ConnectWallet/page.js
"use client"; // This line indicates that the component is a Client Component

import { useEffect, useState } from 'react';

const ConnectWallet = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("Connecting to Wallet...");

    const shortenAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 5)}...${address.slice(-4)}`; // Show first 5 and last 4 characters
    };

    useEffect(() => {
        const connectWallet = async () => {
            if (typeof window.diam !== 'undefined') {
                try {
                    const connectedWallet = await window.diam.connect();
                    const address = connectedWallet.publicKey.toString();
                    setWalletAddress(shortenAddress(address));
                    setIsConnected(true);
                    console.log("Wallet connected:", address); // Log the address for debugging
                } catch (err) {
                    console.error('Failed to connect to the wallet:', err);
                } finally {
                    // Redirect to localhost:3000 after 3 seconds
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3000'; // Forcefully redirect to localhost:3000
                    }, 3000); // Wait for 3 seconds before redirecting
                }
            } else {
                console.error('Diam wallet extension is not installed.');
                // Forcefully redirect even if the wallet extension is not available
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000'; // Forcefully redirect to localhost:3000
                }, 3000);
            }
        };

        // Check for already connected wallet on component mount
        if (typeof window.diam !== 'undefined' && window.diam.publicKey) {
            const address = window.diam.publicKey.toString();
            setWalletAddress(shortenAddress(address));
            setIsConnected(true);
            console.log("Wallet already connected:", address); // Log the address for debugging
            
            // Forcefully redirect to localhost:3000 after 3 seconds
            setTimeout(() => {
                window.location.href = 'http://localhost:3000'; // Forcefully redirect to localhost:3000
            }, 3000);
        } else {
            // Start connection process
            connectWallet();
        }
        
        // Change the connection status after 2 seconds
        const statusTimer = setTimeout(() => {
            if (!isConnected) {
                setConnectionStatus("Connecting to Wallet...");
            }
        }, 2000);

        // Cleanup timers on component unmount
        return () => clearTimeout(statusTimer);
    }, [isConnected]); // Dependency on isConnected to manage the status correctly

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>{connectionStatus}</h1>
            {isConnected && <p style={{ marginTop: '20px' }}>Wallet Address: {walletAddress}</p>}
            {!isConnected && <p>You will be redirected shortly.</p>}
        </div>
    );
};

export default ConnectWallet;
