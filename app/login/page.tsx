// app/login/page.tsx

import LoginForm from "@/components/LoginForm";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function LoginPage() {
  return (
    <>
      <BackgroundLines>
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <LoginForm />;
          </div>
        </main>
      </BackgroundLines>
    </>
  );
}
