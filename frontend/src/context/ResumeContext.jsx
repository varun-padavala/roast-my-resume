import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
    const [seniority, setSeniority] = useState("");
    const canAdvanceStep1 =
    selectedRole && seniority;
    const [jobDesc, setJobDesc]       = useState("");
    const [loading, setLoading]       = useState(false);
    const [loadDone, setLoadDone]     = useState(false);
    const [loadStep, setLoadStep]     = useState(0);
    const JOB_ROLES = [
  { id: "swe",       label: "Software Engineer",  icon: "💻" },
  { id: "pm",        label: "Product Manager",     icon: "📋" },
  { id: "design",    label: "UX Designer",         icon: "🎨" },
  { id: "data",      label: "Data Scientist",      icon: "📊" },
  { id: "devops",    label: "DevOps / Infra",      icon: "⚙️" },
  { id: "marketing", label: "Marketing",           icon: "📣" },
  { id: "finance",   label: "Finance / Banking",   icon: "💰" },
  { id: "other",     label: "Other",               icon: "✦"  },
];
const [summary, setSummary] = useState("");

const [strengths, setStrengths] = useState([]);
const [weaknesses, setWeaknesses] = useState([]);
const [actions, setActions] = useState([]);

const [roasts, setRoasts] = useState([]);
const [roastVerdict, setRoastVerdict] = useState("");

const [suggestedProjects, setSuggestedProjects] = useState([]);

const [analysisLoaded, setAnalysisLoaded] = useState(false);

const [roastPack, setRoastPack] =
  useState(null);
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

  roastPack,
  setRoastPack,

  suggestedProjects,
  setSuggestedProjects,

  analysisLoaded,
  setAnalysisLoaded
}}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
