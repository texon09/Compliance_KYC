import { useState } from 'react';
import { UserPlus, Shield } from 'lucide-react';
import { ROLES } from '../App.jsx';

const AdminPage = ({ users, onAddUser }) => {
  const [newUser, setNewUser] = useState({ loginId: '', name: '', role: 'Employee' });
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(newUser, pin);
    setNewUser({ loginId: '', name: '', role: 'Employee' });
    setPin('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass p-8 rounded-3xl mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><Shield /> HR Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Login ID (unique)"
            value={newUser.loginId}
            onChange={(e) => setNewUser({ ...newUser, loginId: e.target.value })}
            className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-2xl"
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-2xl"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-2xl"
          >
            {Object.values(ROLES).map(role => <option key={role} value={role}>{role}</option>)}
          </select>
          <input
            type="password"
            placeholder="HR PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-2xl"
            required
          />
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <UserPlus size={24} />
            Add User
          </button>
        </form>
      </div>
      <div className="glass p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Current Users ({users.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(u => (
            <div key={u.id} className="p-4 bg-slate-800/50 rounded-2xl">
              <p className="font-bold">{u.name}</p>
              <p className="text-sm text-slate-400">{u.loginId} • {u.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
