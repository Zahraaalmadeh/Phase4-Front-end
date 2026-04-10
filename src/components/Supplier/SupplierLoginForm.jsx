import { useEffect, useMemo, useState } from "react";

const MAX_ATTEMPTS = 3;
const LOCK_MINUTES = 5;

export default function SupplierLoginForm({
                                              supplierAccount,
                                              lockStorageKey,
                                              onLogin,
                                          }) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState("");
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const lockUntil = useMemo(() => {
        const stored = localStorage.getItem(lockStorageKey);
        return stored ? Number(stored) : null;
    }, [lockStorageKey, now]);

    const isLocked = lockUntil && now < lockUntil;
    const remainingSeconds = isLocked
        ? Math.max(0, Math.ceil((lockUntil - now) / 1000))
        : 0;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isLocked) {
            setMessage(
                `Account temporarily locked. Try again in ${remainingSeconds} seconds.`
            );
            return;
        }

        const userExists =
            identifier === supplierAccount.email ||
            identifier === supplierAccount.username;

        if (!userExists) {
            setMessage("Invalid credentials.");
            return;
        }

        if (password !== supplierAccount.password) {
            const nextAttempts = attempts + 1;
            setAttempts(nextAttempts);

            if (nextAttempts >= MAX_ATTEMPTS) {
                const newLockUntil = Date.now() + LOCK_MINUTES * 60 * 1000;
                localStorage.setItem(lockStorageKey, String(newLockUntil));
                setAttempts(0);
                setMessage("Too many failed attempts. Account temporarily locked.");
                return;
            }

            setMessage("Invalid credentials.");
            return;
        }

        if (!supplierAccount.active) {
            setMessage("Account is inactive.");
            return;
        }

        localStorage.removeItem(lockStorageKey);
        setAttempts(0);
        setMessage("");
        onLogin({ identifier });
    };

    return (
        <div className="card auth-card">
            <h1>Supplier Login</h1>
            <p className="muted">
                Enter your registered supplier email or username to access assigned
                hospital requests.
            </p>

            <form className="form-grid" onSubmit={handleSubmit}>
                <div>
                    <label>Email / Username</label>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value.trim())}
                        placeholder="supplier@makhzan.com or supplier01"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Login
                </button>

                {message && (
                    <p className={isLocked ? "status-danger" : "status-warning"}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}