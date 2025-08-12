"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";
// import { useAdmin } from "@/contexts/admin-context";
import loginImage from '@/images/admin_login/login.png'
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-contexts";
// import { AxiosError } from "axios";


interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  emailOrPhone?: string;
  password?: string;
  userType?:string;
}

const defaultFormErrors:FormErrors = {
  emailOrPhone:"",
  password:"",
  userType:""
}

export default function LoginPage() {
  const { setUser, user } = useUser()

  const router = useRouter();
  // const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>(defaultFormErrors);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (user){
      setIsUserLoggedIn(false); 
      return;
    }
    else 
      setIsUserLoggedIn(false); 
    setMessage("")
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = defaultFormErrors;

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = "Email or phone number is required";
      setErrors(newErrors);
      return false
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      setErrors(newErrors);
      return false
    }
    return true

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title:"Error",
        description:`Something went wrong ${errors.userType}`,
        variant:"error"
      })
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/api/auth/login", {email:formData.emailOrPhone, password: formData.password, userType:"admin"});
      if (res.status === 200) {
        
        router.push("/admin"); 
        setUser(res.data.user)

      }
    } catch (_err) {
      setErrors({emailOrPhone:"Login failed"});
      console.log(_err)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  if(isUserLoggedIn){
    router.push('/admin')
  }
  else
  return (
    <div className="h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#3A2723] mb-2">Admin Log in</h1>
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
              <Input
                  type="text"
                  placeholder="Email Address/Phone Number"
                  value={formData.emailOrPhone}
                  onChange={(e) =>
                    handleInputChange("emailOrPhone", e.target.value)
                  }
                  className={cn(
                    "h-14 text-base rounded-2xl border border-gray-300 focus:border-[#3A2723] focus:ring-[#3A2723]",
                    errors.emailOrPhone && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailOrPhone}
                  </p>
                )}
              </div>

              <div className="relative">
              <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={cn(
                    "h-14 text-base rounded-2xl border-gray-300 pr-12",
                    "focus:border-[#3A2723] focus:ring-[#3A2723]",
                    errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    handleInputChange("rememberMe", checked as boolean)
                  }
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              {/* <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-600 hover:text-[#3A2723] hover:underline"
              >
                Forget Password
              </Link> */}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-base font-semibold rounded-2xl bg-[#3A2723] hover:bg-[#2A1F1C] text-white"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </Button>
          </form>
        </div>
      </div> 

      {/* Right Side - Image */}
      <div className="none md:flex-1 relative bg-white">
        <Image
          src={loginImage}
          alt="Fashion Model"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div> 
  );
}
