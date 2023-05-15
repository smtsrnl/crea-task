
'use client';
import React, { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import styles from './page.module.css'
function randomString(len: number) {
  let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}
export default function Login() {
  const defaultUsername = "user";
  const defaultPassword = "user123";
  const [username, setUsername] = useState<string>(defaultUsername);
  const [password, setPassword] = useState<string>(defaultPassword);
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false)

  const router = useRouter();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (username == defaultUsername && password == defaultPassword) {
      router.push("/dashboard");
      setError(false);

      let api_token = randomString(64);

      remember ? localStorage.setItem("api_token", api_token) : sessionStorage.setItem("api_token", api_token);
    } else {
      setError(true);
    }
  }

  return (
    <main className={`${styles["form-signin"]} w-100 m-auto text-center flex justify-align-center`}>
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input type="text" className="form-control" name="username" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label >Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Password</label>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            Username or Password incorrect
          </div>
        )}
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="Remember Me" value={remember} onChange={(e) => setRemember(!remember)} /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
    </main>
  )
}
