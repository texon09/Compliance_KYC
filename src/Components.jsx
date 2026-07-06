import { LogOut } from 'lucide-react';

const Header = ({ currentUser, onUserChange, onLogout, users }) => (
  <header className="glass p-4 flex items-center justify-between border-b border-slate-700/50">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
        {currentUser.name[0]}
      </div>
      <div>
        <h1 className="font-bold text-xl">{currentUser.name}</h1>
        <p className="text-sm text-slate-400">{currentUser.role}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <select
        value={currentUser.id}
        onChange={(e) => onUserChange(e.target.value)}
        className="bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-2 text-sm"
      >
        {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
      </select>
      <button onClick={onLogout} className="p-2 hover:bg-slate-800/50 rounded-xl transition-all">
        <LogOut size={20} />
      </button>
    </div>
  </header>
);

export default Header;
