// import Link from "next/link";
// import React, { useState } from "react";

// interface LogInModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLoginSuccess: (user: any) => void;
// }

// const LogInModal: React.FC<LogInModalProps> = ({
//   isOpen,
//   onClose,
//   onLoginSuccess,
// }) => {
//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ login, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Login failed");
//       }

//       const userData = await response.json();
//       onLoginSuccess(userData);
//       setLogin("");
//       setPassword("");
//       onClose();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-1/3">
//         <h2 className="text-xl mb-4 text-gray-700">Log In</h2>
//         {error && <div className="mb-4 text-red-600">{error}</div>}
//         <div className="mb-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Login
//           </label>
//           <input
//             type="text"
//             value={login}
//             onChange={(e) => setLogin(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
//           />
//         </div>
//         <div>
//           <p>Not registered? Click here</p>
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleLogin}
//             className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Log In"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogInModal;
