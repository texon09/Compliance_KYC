import { Users, Paperclip, Send } from 'lucide-react';

const ChatPage = ({ user, project, group, messages, files, onSendMessage, onUploadFile, users, groups, setActiveGroupId }) => {
  const [draft, setDraft] = useState('');
  const [fileName, setFileName] = useState('');

  return (
    <div className="h-full flex">
      {/* Sidebar: Role-gated channels */}
      <aside className="w-80 glass p-6 border-r border-slate-700/50 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-6">
          <Users size={24} />
          <h2 className="font-bold text-xl">Squad Channels</h2>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGroupId(g.id)}
              className={`w-full p-4 rounded-2xl transition-all flex items-center gap-3 hover:bg-white/10 ${group?.id === g.id ? 'bg-white/20 ring-2 ring-indigo-500/50' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-sm font-semibold">
                {g.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{g.name}</p>
                <p className="text-xs text-slate-500">{g.members.length} members</p>
              </div>
              {g.members.length > 0 && <div className="w-2 h-2 bg-green-400 rounded-full" />}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <div className="glass p-6 border-b border-slate-700/50">
          <h1 className="font-bold text-2xl">{group?.name || 'Select Channel'}</h1>
          <p className="text-slate-400">{project?.name} • {user.role}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>No messages yet. Start collaborating!</p>
            </div>
          ) : (
            messages.map(m => {
              const author = users.find(u => u.id === m.authorId);
              const isOwn = m.authorId === user.id;
              return (
                <div key={m.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`chat-bubble ${isOwn ? 'chat-bubble-own' : 'chat-bubble-other'}`}>
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-75">
                      <span>{author?.name || 'Unknown'}</span>
                      <span>• {m.timestamp}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* Input */}
        <div className="glass p-4 border-t border-slate-700/50">
          <div className="flex items-end gap-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type to chat with team..."
              className="flex-1 bg-slate-800/50 border border-slate-600 rounded-3xl px-6 py-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (onSendMessage(group?.id, draft), setDraft(''))}
            />
            <button className="p-3 hover:bg-slate-800/50 rounded-3xl transition-all">
              <Paperclip size={20} />
            </button>
            <button
              onClick={() => {
                onSendMessage(group?.id, draft);
                setDraft('');
              }}
              className="btn-primary p-4 rounded-3xl flex items-center gap-2"
              disabled={!draft.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Files Panel */}
      <aside className="w-80 glass p-6 border-l border-slate-700/50 flex flex-col">
        <h3 className="font-bold mb-4 flex items-center gap-2">📎 Shared Files</h3>
        <div className="flex-1 overflow-y-auto space-y-2">
          {files.map(f => {
            const uploader = users.find(u => u.id === f.uploadedBy);
            return (
              <div key={f.id} className="p-4 bg-slate-800/30 rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
                <p className="font-medium truncate">{f.name}</p>
                <p className="text-xs text-slate-500">by {uploader?.name}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-slate-800/30 rounded-2xl">
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Share file/link"
            className="w-full bg-transparent p-2 text-sm border-b border-slate-600 focus:outline-none"
          />
          <button onClick={() => { onUploadFile(group?.id, fileName); setFileName(''); }} className="text-xs text-indigo-400 mt-1">Upload</button>
        </div>
      </aside>
    </div>
  );
};

export default ChatPage;
