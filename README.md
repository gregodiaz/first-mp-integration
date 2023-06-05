# First MP Test Integration

## Prerequisites
Before you can use this project, please make sure you have the following prerequisites:

1. **MercadoPago Account**: You will need an active account on MercadoPago
    - Go to [MercadoPago Developers](https://www.mercadopago.com.ar/developers/es), Sign in, and access "Your Integrations".
    - Create a new application with the name of the project or the name you want.
    - In "Test accounts" create two test accounts: one for the seller and one for the buyer.
    - From another browser profile, log in again to [MercadoPago Developers](https://www.mercadopago.com.ar/developers/es), but this time using the seller test account.
    - Go to "Test credentials". Copy the Access Token and save it for later use.

2. **ngrok**: In order to expose your local development server to the internet, you will need to download the ngrok binary. It is essential to use ngrok because the responses from MercadoPago are secured with SSL certificates for the HTTPS protocol.
    - Create an account on [ngrok](ngrok.com) and signing up.
    - Download the ngrok binary suitable for your operating system.
    - Save the ngrok binary in a safe location for future use."

## Installation
1. Clone the repository.
```bash
git clone https://github.com/gregodiaz/first-mp-integration.git && cd first-mp-integration
```

2. Install de dependencies.
```bash
npm i
```

3. Copy the environment file.
```bash
cp .env.example .env
```

4. Paste the MercadoPago Access Token of the seller account into the `MP_ACCESS_TOKEN` variable in the `.env` file.

5. Place the ngrok binary in the root of the project.

6. Start ngrok in a terminal window, specifying the port from the `.env` file.
```bash
./ngrok http <PORT>
```
For Windows:
```bash
.\ngrok.exe http <PORT>
```
7. Copy the `Forwarding` link displayed in the console. Paste this link into the `NGROK_URL` property in the `.env` file.

8. Build the JavaScript files
```bash
npm run build
```

9. Initialize the project.
```bash
npm start
```
