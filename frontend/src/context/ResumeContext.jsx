```jsx
import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeLoaded, setResumeLoaded] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const [seniority, setSeniority] = useState("");
  const canAdvanceStep1 = selectedRole && seniority;

  const [jobDesc, setJobDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadDone, setLoadDone] = useState(false);
  const [loadStep, setLoadStep] = useState(0);

  const [summary, setSummary] = useState("");
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [actions, setActions] = useState([]);

  const [roasts, setRoasts] = useState([]);
  const [roastVerdict, setRoastVerdict] = useState("");

  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [analysisLoaded, setAnalysisLoaded] = useState(false);
  const [roastPack, setRoastPack] = useState(null);

  // Important:
  // Prevent pages such as Verdict from redirecting before
  // localStorage restoration has finished.
  const [restoring, setRestoring] = useState(true);

  const JOB_ROLES = [
    { id: "swe", label: "Software Engineer", icon: "💻" },
    { id: "pm", label: "Product Manager", icon: "📋" },
    { id: "design", label: "UX Designer", icon: "🎨" },
    { id: "data", label: "Data Scientist", icon: "📊" },
    { id: "devops", label: "DevOps / Infra", icon: "⚙️" },
    { id: "marketing", label: "Marketing", icon: "📣" },
    { id: "finance", label: "Finance / Banking", icon: "💰" },
    { id: "other", label: "Other", icon: "✦" },
  ];

  // -----------------------------------------
  // RESTORE SESSION AFTER PAGE REFRESH
  // -----------------------------------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resumeSession");

      if (saved) {
        const data = JSON.parse(saved);

        setResumeText(data.resumeText || "");
        setFileName(data.fileName || "");
        setResumeLoaded(data.resumeLoaded || false);

        setSelectedRole(data.selectedRole || "");
        setSeniority(data.seniority || "");
        setJobDesc(data.jobDesc || "");
      }
    } catch (error) {
      console.error("Failed to restore resume session:", error);
    } finally {
      setRestoring(false);
    }
  }, []);

  // -----------------------------------------
  // SAVE SESSION WHEN IMPORTANT VALUES CHANGE
  // -----------------------------------------
  useEffect(() => {
    // Don't overwrite existing localStorage with
    // the initial empty React state before restoration.
    if (restoring) return;

    const session = {
      resumeText,
      fileName,
      resumeLoaded,
      selectedRole,
      seniority,
      jobDesc,
    };

    localStorage.setItem("resumeSession", JSON.stringify(session));
  }, [
    restoring,
    resumeText,
    fileName,
    resumeLoaded,
    selectedRole,
    seniority,
    jobDesc,
  ]);

  return (
    <ResumeContext.Provider
      value={{
        resumeText,
        setResumeText,

        fileName,
        setFileName,

        resumeLoaded,
        setResumeLoaded,

        selectedRole,
        setSelectedRole,

        seniority,
        setSeniority,

        canAdvanceStep1,

        jobDesc,
        setJobDesc,

        loading,
        setLoading,

        loadDone,
        setLoadDone,

        loadStep,
        setLoadStep,

        JOB_ROLES,

        summary,
        setSummary,

        strengths,
        setStrengths,

        weaknesses,
        setWeaknesses,

        actions,
        setActions,

        roasts,
        setRoasts,

        roastVerdict,
        setRoastVerdict,

        roastPack,
        setRoastPack,

        suggestedProjects,
        setSuggestedProjects,

        analysisLoaded,
        setAnalysisLoaded,

        // New
        restoring,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
```
