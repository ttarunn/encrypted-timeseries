# encrypted-timeseries
# Description
This the small application which takes data from the client side and encrypt that data and send to client in encrypted fromat and then again Take that encrypted data and send client after descrypt that data.

Hosted APP Link : https://encrypted-timeseries.netlify.app/

# Tech Stack
Here I am using following tech stacks for backednd:
1. ExpressJS
2. Socket.io
3. Crypto
In frontend I am using React, socket.io-client.

# UI Structure
In UI there are two section 
1. Encoded String : In this section backend sent the encoded data
2. Decoded String : In this section backend takes the encoded data and sending again the decoded data.
In last there is a start button, on click this button decoded process will start.


Note: MongoDB part is remaining. I have to store that in mongo DB
