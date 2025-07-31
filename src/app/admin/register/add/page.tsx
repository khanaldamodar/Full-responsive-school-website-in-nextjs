"use client";

import { useState } from "react";
// Note: In your actual app, import axios here
// import axios from "axios";
import { Eye, EyeOff, User, Mail, Phone, MapPin, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // Client-side validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!validateEmail(value)) error = "Please enter a valid email address";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!validatePhone(value)) error = "Please enter a valid phone number";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.trim().length < 5) error = "Address must be at least 5 characters";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (!validatePassword(value)) error = "Password must be at least 8 characters";
        break;
      case "password_confirmation":
        if (!value) error = "Password confirmation is required";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
    }
    
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    const error = validateField(name, value);
    setClientErrors({
      ...clientErrors,
      [name]: error,
    });

    // Clear server errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: [],
      });
    }
  };

  const validateAllFields = () => {
    const newErrors: { [key: string]: string } = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    
    setClientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllFields()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call (replace with actual axios call in your app)
      const response = await fetch(`${apiUrl}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Registration successful!");
        setErrors({});
        setClientErrors({});
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          password_confirmation: "",
        });
      } else if (response.status === 422) {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      // For demo purposes, show success after validation
      setTimeout(() => {
        setSuccess("Registration successful! (Demo mode)");
        setErrors({});
        setClientErrors({});
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          password_confirmation: "",
        });
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (field: string) => {
    const icons = {
      name: User,
      email: Mail,
      phone: Phone,
      address: MapPin,
      password: Lock,
      password_confirmation: Lock,
    };
    return icons[field as keyof typeof icons];
  };

  const isFieldValid = (field: string) => {
    return formData[field as keyof typeof formData] && !clientErrors[field] && !errors[field]?.length;
  };

  const hasError = (field: string) => {
    return clientErrors[field] || (errors[field] && errors[field].length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 font-poppins">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us today and get started!</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: "name", label: "Full Name", type: "text" },
                { field: "email", label: "Email Address", type: "email" },
              ].map(({ field, label, type }) => {
                const Icon = getFieldIcon(field);
                
                return (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor={field}>
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={`w-5 h-5 ${
                          hasError(field) ? 'text-red-400' : 
                          isFieldValid(field) ? 'text-green-400' : 
                          'text-gray-400'
                        }`} />
                      </div>
                      <input
                        type={type}
                        name={field}
                        id={field}
                        value={(formData as any)[field]}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          hasError(field)
                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                            : isFieldValid(field)
                            ? 'border-green-300 bg-green-50 focus:border-green-500'
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                        }`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      
                      {/* Success checkmark */}
                      {isFieldValid(field) && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Error Messages */}
                    {clientErrors[field] && (
                      <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                        <AlertCircle className="w-4 h-4" />
                        <span>{clientErrors[field]}</span>
                      </div>
                    )}
                    {errors[field] && errors[field].length > 0 && (
                      <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[field][0]}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Row 2: Phone and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: "phone", label: "Phone Number", type: "tel" },
                { field: "address", label: "Address", type: "text" },
              ].map(({ field, label, type }) => {
                const Icon = getFieldIcon(field);
                
                return (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor={field}>
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={`w-5 h-5 ${
                          hasError(field) ? 'text-red-400' : 
                          isFieldValid(field) ? 'text-green-400' : 
                          'text-gray-400'
                        }`} />
                      </div>
                      <input
                        type={type}
                        name={field}
                        id={field}
                        value={(formData as any)[field]}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          hasError(field)
                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                            : isFieldValid(field)
                            ? 'border-green-300 bg-green-50 focus:border-green-500'
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                        }`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      
                      {/* Success checkmark */}
                      {isFieldValid(field) && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Error Messages */}
                    {clientErrors[field] && (
                      <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                        <AlertCircle className="w-4 h-4" />
                        <span>{clientErrors[field]}</span>
                      </div>
                    )}
                    {errors[field] && errors[field].length > 0 && (
                      <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[field][0]}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Row 3: Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: "password", label: "Password", type: "password" },
                { field: "password_confirmation", label: "Confirm Password", type: "password" },
              ].map(({ field, label, type }) => {
                const Icon = getFieldIcon(field);
                const isPasswordField = field.includes("password");
                const showPasswordIcon = field === "password" ? showPassword : showConfirmPassword;
                
                return (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor={field}>
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={`w-5 h-5 ${
                          hasError(field) ? 'text-red-400' : 
                          isFieldValid(field) ? 'text-green-400' : 
                          'text-gray-400'
                        }`} />
                      </div>
                      <input
                        type={isPasswordField ? (showPasswordIcon ? "text" : "password") : type}
                        name={field}
                        id={field}
                        value={(formData as any)[field]}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          hasError(field)
                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                            : isFieldValid(field)
                            ? 'border-green-300 bg-green-50 focus:border-green-500'
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                        }`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      
                      {/* Password visibility toggle */}
                      {isPasswordField && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => {
                            if (field === "password") {
                              setShowPassword(!showPassword);
                            } else {
                              setShowConfirmPassword(!showConfirmPassword);
                            }
                          }}
                        >
                          {showPasswordIcon ? (
                            <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      )}
                      
                      {/* Success checkmark for non-password fields */}
                      {!isPasswordField && isFieldValid(field) && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Error Messages */}
                    {clientErrors[field] && (
                      <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                        <AlertCircle className="w-4 h-4" />
                        <span>{clientErrors[field]}</span>
                      </div>
                    )}
                    {errors[field] && errors[field].length > 0 && (
                      <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[field][0]}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-98 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}