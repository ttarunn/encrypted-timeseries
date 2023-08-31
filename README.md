# encrypted-timeseries
# Description
This the small application which takes data from the client side and encrypt that data and send to client in encrypted fromat and then again Take that encrypted data and send client after descrypt that data.
Server Link : https://encrypted-timeseries.onrender.com/
Hosted APP Link : https://encrypted-timeseries.netlify.app/

# Steps to follow
1. First Open this App link
2. After open this link just wait for 5 6 min server will take time to start untill server you will se an error on the landing page.
3. Once server will start then landing page will be visible Properly.

OR

First open server Link when you get {status: true} message on screen only then open netlify App link.


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
