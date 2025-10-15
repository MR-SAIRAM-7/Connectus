import React, { useState } from "react";
import { Video, MessageSquare, Users, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [username, setUsername] = useState("");
  const [meetings, setMeetings] = useState([
    { id: "abc123", title: "Team Sync", participants: 4 },
    { id: "xyz789", title: "Client Discussion", participants: 3 },
  ]);

  const handleCreateMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(2, 9);
    setMeetings([
      ...meetings,
      { id: newMeetingId, title: "New Meeting", participants: 1 },
    ]);
    navigate(`/meeting/${newMeetingId}`);
  };

  const handleJoinMeeting = () => {
    if (!meetingCode.trim()) return alert("Enter a valid meeting code");
    navigate(`/meeting/${meetingCode}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <header className="bg-black/90 backdrop-blur-lg border-b border-gray-800 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Video className="w-7 h-7 text-red-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            ConnectUs Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-grow px-6 py-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Meeting Section */}
          <section className="md:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold">Meetings</h2>

            {/* Create or Join Meeting */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-6 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCreateMeeting}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/40"
                >
                  <Plus className="w-5 h-5 mr-2" /> Create Meeting
                </button>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Enter meeting code"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 placeholder-gray-500 w-full sm:w-64"
                  />
                  <button
                    onClick={handleJoinMeeting}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Meetings */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-300">
                Recent Meetings
              </h3>
              {meetings.length === 0 ? (
                <p className="text-gray-500">No meetings yet. Start one!</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {meetings.map((meet) => (
                    <div
                      key={meet.id}
                      className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-red-500/40 transition-all hover:shadow-lg hover:shadow-red-500/20"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {meet.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Code: <span className="text-gray-300">{meet.id}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/meeting/${meet.id}`)}
                          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                        >
                          Join
                        </button>
                      </div>
                      <div className="flex items-center mt-3 space-x-2 text-gray-500 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{meet.participants} participants</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Chat Sidebar */}
          <aside className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-red-500" />
              <span>Team Chat</span>
            </h3>

            <div className="flex-grow overflow-y-auto space-y-3 mb-4">
              <div className="bg-gray-800/60 p-3 rounded-xl">
                <p className="text-gray-300 text-sm">
                  <span className="text-red-400 font-semibold">Alex:</span> Let's
                  start our meeting at 4 PM.
                </p>
              </div>
              <div className="bg-gray-800/60 p-3 rounded-xl">
                <p className="text-gray-300 text-sm">
                  <span className="text-red-400 font-semibold">Jordan:</span> Sure,
                  I’ll share the doc soon.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 placeholder-gray-500 flex-grow"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition-all hover:scale-105">
                Send
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ConnectUs. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
