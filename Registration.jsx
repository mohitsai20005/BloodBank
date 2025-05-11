import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Registration.css';

const districtData = {
  AP: ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "East Godavari"],
  TG: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahbubnagar", "Medak", "Medchal", "Mulugu", "Nalgonda", "Nizamabad", "Peddapalli", "Rajanna", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal"],
};

const InputField = ({ label, type, name, value, onChange, maxLength, errorMessage }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      required
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errorMessage ? 'border-red-500' : ''}`}
    />
    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
  </div>
);

const Dropdown = ({ label, name, value, onChange, options, disabled, errorMessage }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errorMessage ? 'border-red-500' : ''}`}
    >
      <option value="">{disabled ? "Select State First" : `Select ${label}`}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
  </div>
);

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "", dob: "", gender: "", bloodGroup: "",
    phone: "", email: "", password: "", state: "",
    district: "", address: "", pinCode: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [districts, setDistricts] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setDistricts(districtData[formData.state] || []);
    setFormData(prev => ({ ...prev, district: "" }));
  }, [formData.state]);

  const validateAge = useCallback((dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAgeError(age < 18 ? "You are not eligible to donate blood." : "");
  }, []);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = 8;

    if (password.length < minLength) {
      setPasswordError(`Password must be at least ${minLength} characters.`);
    } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setPasswordError("Password must include uppercase, lowercase, number, and special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "dob") validateAge(value);
    if (name === "password") validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setFormErrors({});

    if (ageError) {
      setMessage(ageError);
      return;
    }

    const emptyFields = Object.entries(formData).some(([_, v]) => !v);
    if (emptyFields) {
      setFormErrors({ general: "Please fill in all fields." });
      return;
    }

    if (formData.password !== confirmPassword) {
      setFormErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    if (passwordError) {
      setFormErrors({ password: passwordError });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/donors/register", formData);
      setMessage(res.data || "Registration successful!");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("User with this phone or email already exists.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register as a Donor</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formErrors.general && <p className="text-sm text-red-500 text-center">{formErrors.general}</p>}
          <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} errorMessage={formErrors.name} />
          <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} errorMessage={formErrors.dob} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} errorMessage={formErrors.email} />
          <Dropdown label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} errorMessage={formErrors.gender} />
          <Dropdown label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} errorMessage={formErrors.bloodGroup} />
          <InputField label="Phone" type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength="10" errorMessage={formErrors.phone} />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} errorMessage={formErrors.password} />
          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          <InputField label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} errorMessage={formErrors.confirmPassword} />
          <Dropdown label="State" name="state" value={formData.state} onChange={handleChange} options={Object.keys(districtData)} errorMessage={formErrors.state} />
          <Dropdown label="District" name="district" value={formData.district} onChange={handleChange} options={districts} disabled={!districts.length} errorMessage={formErrors.district} />
          <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} errorMessage={formErrors.address} />
          <InputField label="Pin Code" type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} errorMessage={formErrors.pinCode} />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition" disabled={!!ageError || passwordError}>
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;
