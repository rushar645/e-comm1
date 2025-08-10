"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";
import banner from "@/images/costumer_sigup/signup.png";

interface SignUpFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  agreeToTerms?: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/api/auth/signup", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      });

      if (res.status === 200) {

        const signInResponse = await signIn("Credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (signInResponse?.error) {
          setErrors(signInResponse.error);
        } else {
          router.push("/");
        }
      }

    } catch (err: any) {
      setErrors(err?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof SignUpFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#3A2723] mb-2">Sign up</h1>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#3A2723] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-14 text-base rounded-2xl border-gray-300 focus:border-[#3A2723] focus:ring-[#3A2723]"
                  error={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-14 text-base rounded-2xl border-gray-300 focus:border-[#3A2723] focus:ring-[#3A2723]"
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-14 text-base rounded-2xl border-gray-300 focus:border-[#3A2723] focus:ring-[#3A2723]"
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="h-14 text-base rounded-2xl border-gray-300 focus:border-[#3A2723] focus:ring-[#3A2723] pr-12"
                  error={!!errors.password}
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

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked as boolean)
                }
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-relaxed"
              >
                I agree with{" "}
                <Link
                  href="/privacy"
                  className="text-[#3A2723] font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-[#3A2723] font-semibold hover:underline"
                >
                  Terms of use
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-base font-semibold rounded-2xl bg-[#3A2723] hover:bg-[#2A1F1C] text-white"
            >
              {isLoading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 relative bg-white">
        <Image
          src={banner}
          alt="Fashion Model"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
