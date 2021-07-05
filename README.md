# Payquil
## An interface for creating shareable payment links on Ethereum

Payquil uses IPFS to upload payment information in a publicly retrievable way, which can be then accessed to get the metadata for the payment to be done. It supports both single and continuous streaming payments using Superfluid. 


The contents of the metadata include:
1. Payment type: Single or a continuous stream
2. Currency: ETHx, fDAI or fTUSD 
3. Payment amount
4. Deposit address
5. In the case of a continuous stream, a duration for which the amount is given.

The payment info creator uploads the metadata on IPFS.  After upload, the ID that is shown to the user can be shared with other users to get payment confirming to the given metadata.

Another user can then enter the ID in the Pay section to pay.

To start the project, you should have Metamask configured in your device.
```npm start``` 
in the project directory will start the project in your browser.
