# First MP Test Integration
It is a test API for integration, easily adaptable to a real production environment.

## Prerequisites
Before you can use this project, please make sure you have the following prerequisites:

1. **MercadoPago Account**: You will need an active account on MercadoPago
    - Go to [MercadoPago Developers](https://www.mercadopago.com.ar/developers/es), Sign in, and access "Your Integrations".
    - Create a new application with the name of the project or the name you want.
    - In "Test accounts" create two test accounts: one for the seller and one for the buyer.
    - From another browser profile, log in again to [MercadoPago Developers](https://www.mercadopago.com.ar/developers/es), but this time using the seller test account.
    - Go to "Test credentials". Copy the Access Token and save it for later use.

2. **ngrok**: In order to expose your local development server to the internet, you will need to download the ngrok binary. It is essential to use ngrok because the responses from MercadoPago are secured with SSL certificates for the HTTPS protocol.
    - Create an account on [ngrok](https://www.ngrok.com) and signing up.
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


## Usage

1. In another browser profile, log in to MercadoPago, but this time using the buyer account.
(You can use a JSON viewer extension like 'JSON Viewer' directly from your browser, or tools like Postman or Insomnia)

2. The main route displays 5 articles with their titles and corresponding links.
```
{
  "products": [
    {
      "title": "iPhone 12",
      "link": "http://localhost:<PORT>/1"
    },
    {
      "title": "Nike Air Max 90",
      "link": "http://localhost:<PORT>/2"
    },
    {
      "title": "Canon EOS Rebel T7i",
      "link": "http://localhost:<PORT>/3"
    },
    {
      "title": "Levi's 501 Jeans",
      "link": "http://localhost:<PORT>/4"
    },
    {
      "title": "Fitbit Versa 3",
      "link": "http://localhost:<PORT>/5"
    }
  ]
}
```

3. Clicking on the link or requesting the information will respond with detailed information about the article, including a route for purchasing.
```
{
  "id": 2,
  "title": "Nike Air Max 90",
  "unit_price": 120,
  "currency_id": "ARS",
  "category": "Footwear",
  "buy": "http://localhost:<PORT>/2/buy"
}
```

4. Clicking or making a request to the purchase route will respond with another link to initiate the payment process.
```
{
  "message": "Creating order",
  "paymentLink": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=<PREF_ID>"
}
```

5. Clicking or opening this link in another window will allow you to effectively purchase the corresponding product, using either the funds in your MercadoPago account or the test cards provided by MercadoPago.

6. From there, you can return to the app by clicking the "Back to the Site" button.

And that's it! You can create more buyer accounts for testing purposes or adapt it to use a real MercadoPago account of your own.
