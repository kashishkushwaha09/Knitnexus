"use client";
import { useState,useEffect  } from "react";

export default function ManufacturerDashboard() {
  const [profile, setProfile] = useState({
    factory_name: "",
    machinery: "",
    daily_capacity: "",
    location: "",
  });
  const [profileMsg, setProfileMsg] = useState("");

  const [job, setJob] = useState({ title: "", description: "",duration: "",pay_per_day: "" });
  const [jobMsg, setJobMsg] = useState("");
useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://knitnexus-1.onrender.com/api/profile/manufacturer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile({
            factory_name: data.profile.factory_name,
            machinery: data.profile.machinery,
            daily_capacity: data.profile.daily_capacity,
            location: data.profile.location,
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);
  // Handle profile input change
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Submit profile (create or update)
  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setProfileMsg("⚠️ Please login first.");
        return;
      }

      const res = await fetch("https://knitnexus-1.onrender.com/api/profile/manufacturer", {
        method: "POST", // backend handles create/update
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok) {
        setProfileMsg(`${data.message}`);
      } else {
        setProfileMsg(`${data.message || "Profile error"}`);
      }
    } catch (err) {
      setProfileMsg("Server error while saving profile.");
    }
  };

  // Handle job input change
  const handleJobChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Submit job
  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setJobMsg("Please login first.");
        return;
      }

      const res = await fetch("https://knitnexus-1.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      const data = await res.json();
      if (res.ok) {
        setJobMsg("Job posted successfully!");
       setJob({ title: "", description: "", duration: "", pay_per_day: "" });

      } else {
        setJobMsg(`${data.message || "Job posting failed"}`);
      }
    } catch (err) {
      setJobMsg("Server error while posting job.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold">Manufacturer Dashboard</h1>

      {/* Profile Section */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form onSubmit={handleCreateProfile} className="space-y-4">
          <input
            type="text"
            name="factory_name"
            placeholder="Factory Name"
            value={profile.factory_name}
            onChange={handleProfileChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="machinery"
            placeholder="Machinery"
            value={profile.machinery}
            onChange={handleProfileChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="daily_capacity"
            placeholder="Daily Capacity"
            value={profile.daily_capacity}
            onChange={handleProfileChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profile.location}
            onChange={handleProfileChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save Profile
          </button>
        </form>
        {profileMsg && <p className="mt-4">{profileMsg}</p>}
      </section>

      {/* Post Job Section */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
        <form onSubmit={handlePostJob} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleJobChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleJobChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
         <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 7 days)"
          value={job.duration}
          onChange={handleJobChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="pay_per_day"
          placeholder="Pay per Day"
          value={job.pay_per_day}
          onChange={handleJobChange}
          className="w-full p-2 border rounded"
          required
        />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Post Job
          </button>
        </form>
        {jobMsg && <p className="mt-4">{jobMsg}</p>}
      </section>
    </div>
  );
}
