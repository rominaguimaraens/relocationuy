import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ResourcesLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const correct = import.meta.env.VITE_RESOURCES_PASS || 'relocationuy2025';
    if (password === correct) {
      localStorage.setItem('resourcesAccess', 'true');
      navigate('/resources');
    } else {
      setError('Incorrect password. Please try again or contact us for access.');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-beige px-4">
      <div className="card w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-display">Client Access Only</h1>
        <p className="mb-6 text-ink">
          This page is reserved for our clients. You’ll receive access once you’ve booked our services 🌿
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter access password"
            className="input input-bordered w-full"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) {
                setError('');
              }
            }}
          />
          <button type="submit" className="btn btn-primary w-full">
            Unlock Resources
          </button>
        </form>

        {error && <p className="mt-3 text-error">{error}</p>}

        <p className="mt-8 text-sm text-gray-500">
          Not a client yet?{' '}
          <Link to="/contact" className="font-semibold text-sky underline">
            Book your free consultation
          </Link>
        </p>
      </div>
    </main>
  );
}
