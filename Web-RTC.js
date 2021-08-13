//* ==========================Client==============================

const localConnection = new RTCPeerConnection()

localConnection.onicecandidate = e => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ")
  console.log(JSON.stringify(localConnection.localDescription))
}
localConnection.
const sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = e => console.log("messsage received!!!" + e.data)
sendChannel.onopen = e => console.log("open!!!!");
sendChannel.onclose = e => console.log("closed!!!!!!");

localConnection.createOffer().then(o => localConnection.setLocalDescription(o))

localConnection.setRemoteDescription(answer).then(a => console.log("done"))
//* answer = sdp of server

//* ==========================Server==============================
const remoteConnection = new RTCPeerConnection()

remoteConnection.onicecandidate = e => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ")
  console.log(JSON.stringify(remoteConnection.localDescription))
}

remoteConnection.ondatachannel = e => {
  const receiveChannel = e.channel;
  receiveChannel.onmessage = e => console.log("messsage received!!!" + e.data)
  receiveChannel.onopen = e => console.log("open!!!!");
  receiveChannel.onclose = e => console.log("closed!!!!!!");
  remoteConnection.channel = receiveChannel;
}

// * offer = sdp of client
remoteConnection.setRemoteDescription(offer).then(a => console.log("done"))

remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a => console.log(JSON.stringify(remoteConnection.localDescription)))