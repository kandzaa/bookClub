import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost/login.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await res.json();
        if (data.error) {
            console.error('Login error:', data.error);
        } else {
            console.log('Login successful');
            if (data.is_admin) {
                history.push('/admin');
            } else {
                history.push('/guest');
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  


  
const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost/register.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: newUsername, password: newPassword})
    });

    const ret = await res.text( );
  };
  
  return (
    <div className='login'>
    <div className='login_container'>
      <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className='login_usernames'/><br/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='login_passwords'/>
      <button type="submit" className='login_buttons'>Login</button>
      </form>

      <form onSubmit={handleSignup}>
        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="New Username" className='login_usernames'/><br/>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className= 'login_passwords'/> 
      <button type="submit" className='login_buttons'>Sign Up</button>
      </form>
      
      
    </div>
    </div>
  );
}

export default Login;
