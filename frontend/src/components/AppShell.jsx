import { Outlet, useLocation } from "react-router-dom";
import ResumeOrbitScene from "./ResumeOrbitScene";
import Nav from "./Nav";

const STEPS = { "/upload": 0, "/target": 1, "/context": 2, "/verdict": 3, "/roast": 4 };

export default function AppShell() {
  const { pathname } = useLocation();
  const activeStep = STEPS[pathname] ?? 0;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#080808] text-[#f0ede8]">
      {/* shared grid backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px]" />

      <Nav />

      {/* body: scene on top (mobile) / right (desktop); page content fills the rest */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)]">
        <aside className="pointer-events-none order-first h-[34dvh] shrink-0 lg:order-last lg:h-full">
          {/* persistent: changing the route changes activeStep, so the orbit rotates to the next card */}
          <ResumeOrbitScene activeStep={activeStep} autoPlay={false} fill />
        </aside>

        <main className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}