# deepDAO voting demo

## Instructions
1. Make sure you have metamask installed in your browser, and you have selected the Rinkeby Test network and you have some ether (google faucet if you have none)
2. Deploy the vote.sol smart contract, for example with: https://play.ethereum.org/editor-solidity/. Update web\assets\js\main.js with the contract address.
   (vote.sol is currently deployed on Rinkeby at 0x153cb5191a04899222381138358b1d9ffab43c62)
3. Spin up a web server to serve static files from the web directory (`cd web && python -m SimpleHTTPServer`)
4. Open the voting app on your browser ([localhost:8000](http://localhost:8000))
5. Press Updateinfo. Initally you will get a "Connect Request" from Metamask. Press Connect.
6. Observe the Contract field contains the right contract
    You can also check Etherscan (https://rinkeby.etherscan.io/address/0x153cb5191a04899222381138358b1d9ffab43c62#code)
7. Press "Set Icon" and confirm the Metamask notice by pressing "Add Token".
8. Open Metamask and press the "menu" option. Now you see the deepDAO logo with the number of dDAO's you have (probably still 0).
9. Press "Give voting tokens" to give yourself some voting tokens. Confirm the Metamask notice. Wait until the transaction is confirmed (message by metamask).
10. Press "Updateinfo", now you have a "Voting token balance"
11. Open Metamask and press the "menu" option. Now you see the deepDAO logo with the number of dDAO's you have (a lot more)
12. Press "Create Election" and confirm the Metamask notice. Wait until the transaction is confirmed (message by metamask).
13. Press "Updateinfo". Now "Election status" shows (at least) 1 election.
14. Enter a number for an Election in the field "Election number" (for example 0) and press "Vote". Wait until the transaction is confirmed (message by metamask).
15. Check the "Election status" and see a higher value for the selected election.
