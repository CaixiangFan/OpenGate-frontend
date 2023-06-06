# OpenGate
OpenGate is an open-source project providing private [Chainlink Functions](https://docs.chain.link/chainlink-functions) requests through L2 blockchains.
In the current version, it supports the [Hyperledger Besu private network](https://github.com/CaixiangFan/quorum-test-network), which leverages [Tessera](https://docs.tessera.consensys.net/) to achieve private transactions. Future version will support zk-based L2, which adds bridges and removes trust to any third-party services.

# Chainlink Functions' Privacy Issues


# Architecture
![OpenGate Architechture](https://github.com/CaixiangFan/OpenGate-frontend/blob/main/assets/opengate-arch.png?raw=true)

There are three main components: L2, L1 and Off-chain.

- L2 provides private execution fees transfer.
- L1 gets cost estimation and sends execute requests once transfer is confirmed.
- Off-chain Frontend Proxy listens to transfer and display response to client.