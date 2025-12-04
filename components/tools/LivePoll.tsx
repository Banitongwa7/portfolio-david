"use client"

import React, { useState, useEffect } from 'react'
import { FiCheck, FiBarChart2, FiRefreshCw, FiUsers, FiPlus, FiTrash2, FiShare2, FiCopy } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import PartySocket from 'partysocket'
import hash from 'object-hash'

interface PollOption {
  id: string
  text: string
  votes: number
}

interface Poll {
  question: string
  options: PollOption[]
  totalVotes: number
}

type ViewMode = 'home' | 'create' | 'vote' | 'join'

export default function LivePoll() {
  const [viewMode, setViewMode] = useState<ViewMode>('home')
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [poll, setPoll] = useState<Poll | null>(null)
  const [socket, setSocket] = useState<PartySocket | null>(null)
  const [pollId, setPollId] = useState<string>('')
  const [shareUrl, setShareUrl] = useState<string>('')

  // Poll creation form state
  const [newQuestion, setNewQuestion] = useState('')
  const [newOptions, setNewOptions] = useState<string[]>(['', ''])

  // PartyKit host - change this to your deployed PartyKit URL
  const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST || '127.0.0.1:1999'

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  const createPoll = () => {
    if (!newQuestion.trim() || newOptions.filter(opt => opt.trim()).length < 2) {
      alert('Please enter a question and at least 2 options')
      return
    }

    const validOptions = newOptions.filter(opt => opt.trim())
    const pollData = {
      question: newQuestion.trim(),
      options: validOptions.map(opt => opt.trim()),
    }

    const roomId = hash(pollData)
    setPollId(roomId)

    const newSocket = new PartySocket({
      host: PARTYKIT_HOST,
      room: roomId,
    })

    newSocket.addEventListener('open', () => {
      // Send poll creation message
      newSocket.send(JSON.stringify({
        type: 'createPoll',
        question: pollData.question,
        options: pollData.options,
      }))
    })

    newSocket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'sync') {
        const pollOptions: PollOption[] = pollData.options.map((opt, idx) => ({
          id: `option-${idx}`,
          text: opt,
          votes: msg.votes[opt] || 0,
        }))
        
        const totalVotes = Object.values(msg.votes as Record<string, number>).reduce(
          (sum, count) => sum + count,
          0
        )

        setPoll({
          question: pollData.question,
          options: pollOptions,
          totalVotes,
        })
      }
    })

    setSocket(newSocket)
    setViewMode('vote')
    
    // Generate share URL
    const url = `${window.location.origin}/tools/live-poll?poll=${roomId}`
    setShareUrl(url)
  }

  const joinPoll = (roomIdToJoin: string) => {
    const newSocket = new PartySocket({
      host: PARTYKIT_HOST,
      room: roomIdToJoin,
    })

    newSocket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'sync') {
        if (msg.pollData) {
          const pollOptions: PollOption[] = msg.pollData.options.map((opt: string, idx: number) => ({
            id: `option-${idx}`,
            text: opt,
            votes: msg.votes[opt] || 0,
          }))
          
          const totalVotes = Object.values(msg.votes as Record<string, number>).reduce(
            (sum, count) => sum + count,
            0
          )

          setPoll({
            question: msg.pollData.question,
            options: pollOptions,
            totalVotes,
          })
          
          setViewMode('vote')
          setPollId(roomIdToJoin)
          
          // Check if already voted
          const votedState = localStorage.getItem(`poll-${roomIdToJoin}`)
          if (votedState === 'true') {
            setHasVoted(true)
          }
        }
      }
    })

    setSocket(newSocket)
  }

  const handleVote = () => {
    if (!selectedOption || !poll || !socket) return

    const optionText = poll.options.find(opt => opt.id === selectedOption)?.text
    if (!optionText) return

    socket.send(JSON.stringify({
      type: 'vote',
      option: optionText,
    }))

    setHasVoted(true)
    localStorage.setItem(`poll-${pollId}`, 'true')
  }

  const handleReset = () => {
    setHasVoted(false)
    setSelectedOption(null)
    localStorage.removeItem(`poll-${pollId}`)
  }

  const handleAddOption = () => {
    if (newOptions.length < 10) {
      setNewOptions([...newOptions, ''])
    }
  }

  const handleRemoveOption = (index: number) => {
    if (newOptions.length > 2) {
      setNewOptions(newOptions.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...newOptions]
    updated[index] = value
    setNewOptions(updated)
  }

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Share URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const maxVotes = poll ? Math.max(...poll.options.map(opt => opt.votes)) : 0

  // Home/Landing View
  if (viewMode === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
              <FiBarChart2 className="w-5 h-5" />
              <span className="font-semibold">Live Poll</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Create & Share Live Polls
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real-time voting with instant results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('create')}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Create Poll
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start a new poll and share it with others
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('join')}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
            >
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Join Poll
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a poll ID to participate
              </p>
            </motion.button>
          </div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Real-time Sync
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Powered by PartyKit
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-2">🔗</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Easy Sharing
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Share via link
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-2">🔐</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Anonymous
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Privacy first
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Create Poll View
  if (viewMode === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setViewMode('home')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-4"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Create Your Poll
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details below
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Poll Question
                </label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What's your favorite programming language?"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </label>
                <div className="space-y-3">
                  {newOptions.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      />
                      {newOptions.length > 2 && (
                        <button
                          onClick={() => handleRemoveOption(index)}
                          className="px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {newOptions.length < 10 && (
                  <button
                    onClick={handleAddOption}
                    className="mt-3 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiPlus /> Add Option
                  </button>
                )}
              </div>

              <button
                onClick={createPoll}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300"
              >
                Create Poll
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Join Poll View
  if (viewMode === 'join') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setViewMode('home')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-4"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Join a Poll
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter the poll ID to participate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Poll ID
                </label>
                <input
                  type="text"
                  value={pollId}
                  onChange={(e) => setPollId(e.target.value)}
                  placeholder="Enter poll ID"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono"
                />
              </div>

              <button
                onClick={() => joinPoll(pollId)}
                disabled={!pollId.trim()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  pollId.trim()
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                Join Poll
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Voting/Results View
  if (!poll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading poll...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => {
              setViewMode('home')
              setPoll(null)
              setHasVoted(false)
              socket?.close()
              setSocket(null)
            }}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            ← Back to Home
          </button>
        </motion.div>

        {/* Share Banner */}
        {shareUrl && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FiShare2 className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Share this poll
                  </span>
                </div>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-mono"
                />
              </div>
              <button
                onClick={copyShareUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FiCopy /> Copy
              </button>
            </div>
          </motion.div>
        )}

        {/* Poll Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Poll Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white mb-3">
              {poll.question}
            </h2>
            <div className="flex items-center gap-2 text-white/90">
              <FiUsers className="w-4 h-4" />
              <span className="text-sm font-medium">
                {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
              </span>
              <span className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs">Live</span>
              </span>
            </div>
          </div>

          {/* Poll Body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {!hasVoted ? (
                // Voting Interface
                <motion.div
                  key="voting"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-3"
                >
                  {poll.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 group
                        ${
                          selectedOption === option.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-[1.02]'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${
                            selectedOption === option.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
                          }`}
                      >
                        {selectedOption === option.id && (
                          <FiCheck className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {option.text}
                      </span>
                    </motion.button>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVote}
                    disabled={!selectedOption}
                    className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-300
                      ${
                        selectedOption
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Submit Vote
                  </motion.button>
                </motion.div>
              ) : (
                // Results Interface
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {poll.options.map((option, index) => {
                    const percentage =
                      poll.totalVotes > 0
                        ? Math.round((option.votes / poll.totalVotes) * 100)
                        : 0
                    const isWinning = option.votes === maxVotes && maxVotes > 0

                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl ${
                          isWinning
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-400 dark:border-green-600'
                            : 'bg-gray-50 dark:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-semibold ${
                                isWinning
                                  ? 'text-green-700 dark:text-green-400'
                                  : 'text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              {option.text}
                            </span>
                            {isWinning && (
                              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                Leading
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {option.votes} votes
                            </span>
                            <span
                              className={`text-lg font-bold ${
                                isWinning
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              {percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full rounded-full ${
                              isWinning
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            }`}
                          />
                        </div>
                      </motion.div>
                    )
                  })}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="w-full mt-6 py-4 rounded-xl font-semibold text-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiRefreshCw className="w-5 h-5" />
                    Vote Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
