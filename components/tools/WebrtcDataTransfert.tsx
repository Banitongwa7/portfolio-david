"use client"

import { useState, useEffect, useRef } from 'react';
import type { DataConnection, MediaConnection } from 'peerjs';
import type Peer from 'peerjs';
import { 
  FaCopy, 
  FaVideo, 
  FaFile, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideoSlash, 
  FaPhoneSlash,
  FaPaperPlane,
  FaDownload
} from 'react-icons/fa';

// Types
interface ReceivedFile {
  url: string;
  name: string;
  size?: number;
}

interface FileData {
  file: ArrayBuffer | Blob;
  name: string;
  type: string;
  size: number;
}

type ConnectionStatus = 'initializing' | 'ready' | 'connecting' | 'connected' | 'error' | 'disconnected' | 'calling' | 'in-call';
type TabMode = 'files' | 'call';

export default function WebrtcDataTransfert() {
  // Common State
  const [myId, setMyId] = useState<string>('');
  const [remoteId, setRemoteId] = useState<string>('');
  const [status, setStatus] = useState<ConnectionStatus>('initializing');
  const [statusMessage, setStatusMessage] = useState<string>('Initializing...');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabMode>('files');
  const [copied, setCopied] = useState<boolean>(false);
  
  // PeerJS Refs
  const peerInstance = useRef<Peer | null>(null);
  
  // File Transfer State
  const [dataConnection, setDataConnection] = useState<DataConnection | null>(null);
  const [receivedFile, setReceivedFile] = useState<ReceivedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Call State
  const [mediaConnection, setMediaConnection] = useState<MediaConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPeer = async () => {
      try {
        const { default: Peer } = await import('peerjs');
        const peer = new Peer();

        peer.on('open', (id) => {
          setMyId(id);
          setStatus('ready');
          setStatusMessage('Ready to connect');
        });

        peer.on('error', (err) => {
          console.error('PeerJS Error:', err);
          setError(`Error: ${err.type}`);
          setStatus('error');
        });

        peer.on('disconnected', () => {
          setStatus('disconnected');
          setStatusMessage('Disconnected');
        });

        // Handle incoming data connection (Files)
        peer.on('connection', (conn) => {
          setStatus('connecting');
          setStatusMessage('Incoming file connection...');
          setupDataConnection(conn);
        });

        // Handle incoming media call (Video/Audio)
        peer.on('call', (call) => {
          setStatus('calling');
          setStatusMessage('Incoming call...');
          
          // Ask user to answer? For now auto-answer or show UI
          // We'll auto-answer if we are in call tab, or switch to it
          setActiveTab('call');
          
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
              setLocalStream(stream);
              if (localVideoRef.current) localVideoRef.current.srcObject = stream;
              
              call.answer(stream); // Answer the call with an A/V stream.
              setupMediaConnection(call);
            })
            .catch((err) => {
              console.error('Failed to get local stream', err);
              setError('Could not access camera/microphone');
            });
        });

        peerInstance.current = peer;
      } catch (err) {
        setError('Failed to initialize peer');
        console.error(err);
      }
    };

    initPeer();

    return () => {
      peerInstance.current?.destroy();
      localStream?.getTracks().forEach(track => track.stop());
      if (receivedFile?.url) URL.revokeObjectURL(receivedFile.url);
    };
  }, []);

  // --- Data Connection Logic (Files) ---
  const setupDataConnection = (conn: DataConnection) => {
    conn.on('open', () => {
      setStatus('connected');
      setStatusMessage('Connected for file transfer');
      setDataConnection(conn);
      setError('');
    });

    conn.on('data', (data) => {
      const fileData = data as FileData;
      if (fileData.file && fileData.name) {
        try {
          const blob = new Blob([fileData.file], { type: fileData.type || 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          setReceivedFile({ url, name: fileData.name, size: fileData.size });
          setStatusMessage('File received!');
        } catch (err) {
          console.error(err);
        }
      }
    });

    conn.on('close', () => {
      setDataConnection(null);
      if (!mediaConnection) {
        setStatus('ready');
        setStatusMessage('Connection closed');
      }
    });
  };

  const connectDataPeer = () => {
    if (!remoteId.trim() || !peerInstance.current) return;
    setStatus('connecting');
    const conn = peerInstance.current.connect(remoteId.trim());
    setupDataConnection(conn);
  };

  const sendFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!dataConnection || !file) return;

    try {
      setUploadProgress(10);
      setStatusMessage('Sending file...');
      const arrayBuffer = await file.arrayBuffer();
      
      dataConnection.send({
        file: arrayBuffer,
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      setUploadProgress(100);
      setStatusMessage('File sent!');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setUploadProgress(0), 2000);
    } catch (err) {
      setError('Failed to send file');
    }
  };

  // --- Media Connection Logic (Calls) ---
  const setupMediaConnection = (call: MediaConnection) => {
    setMediaConnection(call);
    setStatus('in-call');
    setStatusMessage('In call');

    call.on('stream', (remoteStream) => {
      setRemoteStream(remoteStream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    call.on('close', () => {
      endCall();
    });

    call.on('error', (err) => {
      console.error(err);
      setError('Call error');
      endCall();
    });
  };

  const startCall = () => {
    if (!remoteId.trim() || !peerInstance.current) return;
    
    setStatus('calling');
    setStatusMessage('Calling...');
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        const call = peerInstance.current!.call(remoteId.trim(), stream);
        setupMediaConnection(call);
      })
      .catch((err) => {
        setError('Could not access camera/microphone');
        setStatus('error');
      });
  };

  const endCall = () => {
    mediaConnection?.close();
    localStream?.getTracks().forEach(track => track.stop());
    setMediaConnection(null);
    setLocalStream(null);
    setRemoteStream(null);
    setStatus('ready');
    setStatusMessage('Call ended');
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsVideoOff(!isVideoOff);
    }
  };

  // --- Utilities ---
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(myId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
            WebRTC Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Secure P2P File Transfer & Video Calls
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 overflow-hidden">
          
          {/* Top Bar: ID & Status */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* My ID */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center gap-3 shadow-sm w-full md:w-auto">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">My ID</span>
                  <code className="font-mono text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px] sm:max-w-xs">{myId || 'Generating...'}</code>
                  <button onClick={copyToClipboard} className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {copied ? '✓' : <FaCopy />}
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  status === 'connected' || status === 'in-call' ? 'bg-green-500' :
                  status === 'error' ? 'bg-red-500' :
                  status === 'connecting' || status === 'calling' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{statusMessage}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('files')}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'files' 
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FaFile /> File Transfer
            </button>
            <button
              onClick={() => setActiveTab('call')}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'call' 
                  ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400' 
                  : 'bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FaVideo /> Video & Audio
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 min-h-[400px]">
            
            {/* Connection Input (Visible if not connected in current mode) */}
            {((activeTab === 'files' && !dataConnection) || (activeTab === 'call' && !mediaConnection)) && (
              <div className="max-w-md mx-auto mb-8 animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Connect to Peer</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Remote Peer ID"
                    value={remoteId}
                    onChange={(e) => setRemoteId(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <button
                    onClick={activeTab === 'files' ? connectDataPeer : startCall}
                    disabled={!remoteId}
                    className={`px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${
                      activeTab === 'files' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {activeTab === 'files' ? 'Connect' : 'Call'}
                  </button>
                </div>
              </div>
            )}

            {/* ERROR DISPLAY */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-center animate-shake">
                {error}
              </div>
            )}

            {/* --- FILES TAB CONTENT --- */}
            {activeTab === 'files' && (
              <div className="space-y-6 animate-fade-in">
                {dataConnection ? (
                  <div className="space-y-6">
                    {/* Send Area */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center transition-colors hover:border-blue-400 dark:hover:border-blue-600">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={sendFile}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl">
                          <FaPaperPlane />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Click to send a file</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Any file type supported</p>
                        </div>
                      </label>
                      
                      {uploadProgress > 0 && (
                        <div className="mt-6 w-full max-w-xs mx-auto">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">Sending... {uploadProgress}%</p>
                        </div>
                      )}
                    </div>

                    {/* Received Area */}
                    {receivedFile && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center justify-between animate-slide-up">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center text-green-600 dark:text-green-300 text-xl">
                            <FaFile />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-200">{receivedFile.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(receivedFile.size)}</p>
                          </div>
                        </div>
                        <a
                          href={receivedFile.url}
                          download={receivedFile.name}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-md transition-transform active:scale-95"
                        >
                          <FaDownload /> Download
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                    <FaFile className="text-6xl mx-auto mb-4 opacity-20" />
                    <p>Connect to a peer to start sharing files</p>
                  </div>
                )}
              </div>
            )}

            {/* --- CALL TAB CONTENT --- */}
            {activeTab === 'call' && (
              <div className="animate-fade-in h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-1 min-h-[300px]">
                  {/* Local Video */}
                  <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video shadow-lg group">
                    <video ref={localVideoRef} autoPlay muted playsInline className={`w-full h-full object-cover transform scale-x-[-1] ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} />
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium">
                      You {isMuted && '(Muted)'}
                    </div>
                    {isVideoOff && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                            <FaVideoSlash className="text-2xl" />
                          </div>
                          <p>Camera Off</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remote Video */}
                  <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video shadow-lg">
                    {mediaConnection ? (
                      <>
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium">
                          Remote Peer
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                            <FaVideo className="text-2xl" />
                          </div>
                          <p>Waiting for connection...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                {mediaConnection && (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={toggleMute}
                      className={`p-4 rounded-full text-xl transition-all ${
                        isMuted 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>
                    
                    <button
                      onClick={endCall}
                      className="p-4 rounded-full bg-red-600 text-white text-xl hover:bg-red-700 shadow-lg transform active:scale-95 transition-all w-16"
                    >
                      <FaPhoneSlash />
                    </button>

                    <button
                      onClick={toggleVideo}
                      className={`p-4 rounded-full text-xl transition-all ${
                        isVideoOff 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>🔒 End-to-end encrypted via WebRTC. No data stored on server.</p>
        </div>

      </div>
    </div>
  );
}
