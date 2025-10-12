import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:5000');

function VideoRoom({ roomId }) {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;

      socket.emit('join-room', roomId, socket.id);

      socket.on('user-connected', userId => {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current.push({ peerId: userId, peer });
        setPeers(users => [...users, peer]);
      });
    });
  }, []);

  function createPeer(userToSignal, callerId, stream) {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', signal => {
      socket.emit('sending-signal', { userToSignal, callerId, signal });
    });
    return peer;
  }

  return (
    <div>
      <video ref={userVideo} autoPlay muted />
      {peers.map((peer, index) => (
        <Video key={index} peer={peer} />
      ))}
    </div>
  );
}

function Video({ peer }) {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video ref={ref} autoPlay />;
}
