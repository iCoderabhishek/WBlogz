// app/register/page.tsx

import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/RegisterForm";
import RegisterForm from "@/components/RegisterForm";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

export default function RegisterPage() {
  return (
    <>
      {" "}
      <>
        <BackgroundLines>
          <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
              <SignUpForm />
            </div>
          </main>
        </BackgroundLines>
      </>
      ;
    </>
  );
}
