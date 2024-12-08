import React from "react";
import Login from "../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <section className="bg-blue-400 dark:bg-white-900">
        <div class="flex items-center justify-center h-screen">
          <div className="w-1/3 bg-slate-800 h-2/3 rounded-s-md">kiei</div>
          <Login />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
