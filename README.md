


Here’s an updated version of the `README.md` file that includes instructions about the `.env` file and how to change its values:

---

# NFT Marketplace Project

This project demonstrates an NFT marketplace running on a local blockchain using Ganache. Below are the step-by-step instructions to set up and run the project.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- Ganache GUI
- Metamask (browser extension)
- Pinata (for handling IPFS storage)

## Installation and Setup

### 1. Clone the Repository

Clone the project repository and navigate to the project folder.

```bash
npm install
cd NFT_Market
```

### 2. Start the Application

Start the application locally using the following command:

```bash
npm start
```

### 3. Run Ganache

Open **Ganache GUI** and start a new workspace. This will launch a local Ethereum blockchain.

### 4. Connect Metamask to Ganache

1. Open **Metamask** in your browser.
2. Create a new network for Ganache by following these steps:
    - **Network Name**: `Ganache Local`
    - **RPC URL**: `http://127.0.0.1:7545`
    - **Chain ID**: `1337`
    - **Currency Symbol**: `ETH`
3. Click "Save" to add the Ganache network.

### 5. Import Ganache Account into Metamask

1. In Ganache, copy the **Private Key** of the first account.
2. In Metamask, go to **Import Account** and paste the copied private key to import the account.

### 6. Pinata API Key Setup

1. Create an account on [Pinata](https://www.pinata.cloud/).
2. Go to **API Keys** and create new keys.
3. Copy the **API Key** and **Secret Key**.

### 7. Set Up the `.env` File

You will need to create a `.env` file in your project root directory to store your **API Keys**, **Private Key**, and other sensitive data securely.

#### Create a `.env` file

1. In the root of the project folder, create a new file named `.env`.
2. Add the following keys with the correct values:

```env
# .env

PRIVATE_KEY=your-ganache-private-key
ALCHEMY_API_URL=your-alchemy-api-url
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key
```

Replace the placeholders with the actual values:
- **PRIVATE_KEY**: Use the private key from your Ganache account.
- **ALCHEMY_API_URL**: If you're deploying to an Ethereum testnet (e.g., Sepolia), you will need an Alchemy API URL. You can get this by signing up on [Alchemy](https://www.alchemy.com/).
- **PINATA_API_KEY** and **PINATA_SECRET_KEY**: These are the keys you obtained from Pinata for uploading your NFT metadata to IPFS.

#### Changing `.env` Values

- You can update the values in the `.env` file whenever needed. For example, if you switch to a different network or change accounts in Ganache, you should update the **PRIVATE_KEY**.
- If you decide to deploy on a testnet (like Sepolia), you will need to replace the **ALCHEMY_API_URL** with your Alchemy project's URL for that specific network.
  
Make sure you **never expose your private key or API keys** in a public repository. The `.env` file is automatically ignored if you have a `.gitignore` file that includes `.env`.

### 8. Compiling and Deploying the Smart Contracts

1. Open **VS Code** and navigate to the project directory.
2. Clean and compile the smart contracts:

```bash
npx hardhat clean
npx hardhat compile
```

3. Deploy the contracts to the local Ganache network:

```bash
npx hardhat run ./script/deploy.js --network localganache
```

This will deploy your NFT marketplace smart contract to the Ganache network.

---

## Additional Information

- Ensure your `.env` file contains accurate values for the **PRIVATE_KEY**, **ALCHEMY_API_URL**, and **Pinata** keys. Without the correct values, contract deployment and IPFS interactions may fail.
  
- Make sure to always keep your `.env` file secure and never push it to public repositories.

---

This setup should allow you to run the NFT marketplace locally, interact with it through Metamask, and upload NFT metadata to IPFS using Pinata.

Let me know if you'd like to add more details!
