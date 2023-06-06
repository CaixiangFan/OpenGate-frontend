# OpenGate
OpenGate is an open-source project providing private [Chainlink Functions](https://docs.chain.link/chainlink-functions) requests through L2 blockchains.
In the current version, it supports the [Hyperledger Besu private network](https://github.com/CaixiangFan/quorum-test-network), which leverages [Tessera](https://docs.tessera.consensys.net/) to achieve private transactions. Future version will support zk-based L2, which adds bridges and removes trust to any third-party services.

# Chainlink Functions' Privacy Issues

In the current Chainlink Functions, everything is public including request calldata, response, and requester account. The following example publicly requests to calculate a compunding interest based on given parameters. 

![RequestFunctionSource](https://github.com/CaixiangFan/OpenGate-frontend/blob/main/assets/calldata.png?raw=true)

After execution, DON gives the latest fulfilled response, which is also public. And the requester's account is public.
![Response](https://github.com/CaixiangFan/OpenGate-frontend/blob/main/assets/response.png?raw=true)

For some enterprise use cases, the requesters don't want to make everything public especially in making sensative data request such as token price and audit price. In such a case, a private Chainlink Functions request is important to protect user's privacy.
# Architecture
![OpenGate Architechture](https://github.com/CaixiangFan/OpenGate-frontend/blob/main/assets/opengate-arch.png?raw=true)

There are three main components: L2, L1 and Off-chain.

- L2 provides private execution fees transfer.
- L1 gets cost estimation and sends execute requests once transfer is confirmed.
- Off-chain Frontend Proxy listens to transfer and display response to client.

# Deploy

1. Clone this repo.
```
git clone https://github.com/CaixiangFan/OpenGate-frontend.git
```
2. Install all dependant libraies.
```
yarn install
```
3. Set up all required environment variables according to the `.env-example` file. 
4. Launch a private [Besu](https://github.com/CaixiangFan/quorum-test-network#quorum-dev-quickstart) network and deploy a `BesuDAI` ERC20 token as the L2 payment methord.
5. Clone the [backend repo](https://github.com/CaixiangFan/OpenGate-backend) and launch backend service endpoints.
```
git clone https://github.com/CaixiangFan/OpenGate-backend.git

cd OpenGate-backend

yarn install
```

Set up all necessary environment variables and start applications.

```
yarn start:dev
```

6. Swich back to the frontend and start app.
```
yarn next dev
```

![Chainlink historical functions](https://github.com/CaixiangFan/OpenGate-frontend/blob/main/assets/OPenGate.JPG?raw=true)