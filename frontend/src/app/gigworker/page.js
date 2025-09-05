"use client";
import { useState, useEffect } from "react";

export default function GigWorkerDashboard() {
  const [profile, setProfile] = useState({
  skills: "",
  work_type: "",
  experience_years: "",
});
  const [profileMsg, setProfileMsg] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobMsg, setJobMsg] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]); 
  // Load profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:4000/api/profile/worker",  {
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
  skills: data.profile.skills,
  work_type: data.profile.work_type,
  experience_years: data.profile.experience_years,
});
        }
      })
      .catch((err) => console.error(err));
  }, []);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("http://localhost:4000/api/applications/applied", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.appliedJobs) {
        setAppliedJobs(data.appliedJobs); // array of jobIds
      }
    })
    .catch(err => console.error(err));
}, []);

  // Load jobs
  useEffect(() => {
    fetch("http://localhost:4000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => console.error(err));
  }, []);

  // Handle profile input
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setProfileMsg("Please login first.");
        return;
      }

      const res = await fetch("http://localhost:4000/api/profile/worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok) {
        setProfileMsg(data.message);
      } else {
        setProfileMsg(data.message || "Profile error");
      }
    } catch (err) {
      setProfileMsg("Server error while saving profile.");
    }
  };

  // Apply for a job
  const handleApplyJob = async (jobId) => {
    const token = localStorage.getItem("token");
  if (!token) {
        setJobMsg("Please login first.");
        return;
      }

  if (appliedJobs.includes(jobId)) return; // already applied
    try {
      const res = await fetch(`http://localhost:4000/api/applications/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();
      if (res.ok) {
        setAppliedJobs([...appliedJobs, jobId]);
        setJobMsg(`Applied for job: ${jobId}`);
      } else {
        setJobMsg(data.message || "Failed to apply");
      }
    } catch (err) {
      setJobMsg("Server error while applying.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold">Gig Worker Dashboard</h1>

      {/* Profile Section */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
         <input
  type="text"
  name="skills"
  placeholder="Skills (comma separated)"
  value={profile.skills}
  onChange={handleProfileChange}
  className="w-full p-2 border rounded"
  required
/>

<input
  type="text"
  name="work_type"
  placeholder="Work Type (e.g. Sewing, Cutting)"
  value={profile.work_type}
  onChange={handleProfileChange}
  className="w-full p-2 border rounded"
  required
/>

<input
  type="number"
  name="experience_years"
  placeholder="Experience (years)"
  value={profile.experience_years}
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

      {/* Jobs Section */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <p>{job.description}</p>
                  <p>Duration: {job.duration}</p>
                  <p>Pay/Day: ₹{job.pay_per_day}</p>
                </div>
                <button
                  onClick={() => handleApplyJob(job.id)}
                  disabled={appliedJobs.includes(job.id)}
  className={`px-4 py-2 rounded ${
    appliedJobs.includes(job.id)
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-500 text-white hover:bg-blue-600"
  }`}
                >
                 {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs available right now.</p>
        )}
        {jobMsg && <p className="mt-4">{jobMsg}</p>}
      </section>
    </div>
  );
}
