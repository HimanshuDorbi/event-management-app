import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password, role });
      console.log('Registration successful:', response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data);
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="author">Author</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
