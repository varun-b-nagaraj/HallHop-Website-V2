"use client";

import { useMemo, useState } from "react";
import { IconApi, IconChevron, IconCopy, IconLock, IconSearch, IconShield } from "../icons";
import { Eyebrow, Reveal } from "../ui";

const API_BASE = "https://hacapi-hh.vercel.app";

type Field = { name: string; type: string; required?: boolean; note: string };
type Endpoint = {
  method: "GET" | "POST";
  path: string;
  title: string;
  description: string;
  auth: "none" | "credentials";
  fields?: Field[];
  response: string;
  success: string;
  errors?: string;
};

type EndpointGroup = { id: string; label: string; intro: string; endpoints: Endpoint[] };

const credentialFields: Field[] = [
  { name: "username", type: "string", required: true, note: "Home Access Center username." },
  { name: "password", type: "string", required: true, note: "Home Access Center password." },
  { name: "base_url", type: "string · URL", note: "HAC origin. Defaults to Round Rock ISD Access Center." },
];

const groups: EndpointGroup[] = [
  {
    id: "health",
    label: "Service",
    intro: "Check availability and validate credentials without retrieving student records.",
    endpoints: [
      { method: "GET", path: "/", title: "Health check", description: "Returns a simple service welcome response. No HAC request is made.", auth: "none", success: "200 OK", response: `{
  "success": true,
  "message": "Welcome to the HAC API."
}` },
      { method: "POST", path: "/api/login", title: "Validate HAC credentials", description: "Creates a temporary HAC session, attempts login, and returns success. Limited to 5 requests per minute per client IP.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 missing input · 401 invalid credentials · 429 rate limited · 500 upstream failure", response: `{
  "success": true
}` },
      { method: "POST", path: "/api/logout", title: "Acknowledge local logout", description: "Returns a logout acknowledgement. The server stores no persistent HAC session, so clients remain responsible for deleting credentials locally.", auth: "none", success: "200 OK", response: `{
  "success": true,
  "message": "Logged out locally"
}` },
    ],
  },
  {
    id: "student",
    label: "Student profile",
    intro: "Read the active student’s identity and registration information.",
    endpoints: [
      { method: "POST", path: "/api/getName", title: "Get active student name", description: "Reads the current student name from HAC Week View.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 · 429 · 500", response: `{
  "name": "Sample Student"
}` },
      { method: "POST", path: "/api/getInfo", title: "Get registration profile", description: "Returns identity and registration fields parsed from the HAC Registration page.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 · 429 · 500", response: `{
  "name": "Sample Student",
  "grade": "11",
  "school": "Example High School",
  "dob": "01/01/2009",
  "counselor": "Counselor Name",
  "language": "English",
  "cohort_year": "2027"
}` },
    ],
  },
  {
    id: "academics",
    label: "Academics & schedule",
    intro: "Retrieve grades, assignments, schedules, transcripts, rank, and A/B day context.",
    endpoints: [
      { method: "POST", path: "/api/getAverages", title: "Get course averages", description: "Returns a course-name-to-average map from the HAC Assignments page.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 · 429 · 500", response: `{
  "AP English Language": "94.20%",
  "Precalculus": "91.80%"
}` },
      { method: "POST", path: "/api/getAssignments", title: "Get assignments", description: "Returns assignment and category rows for every course, or courses matching the optional class filter.", auth: "credentials", fields: [...credentialFields, { name: "class", type: "string", note: "Optional partial course name or course-code filter." }], success: "200 OK", errors: "400 · 401 · 404 no matching assignments · 429 · 500", response: `{
  "AP English Language": {
    "code": "ENG301",
    "average": "94.20%",
    "assignments": [["Essay 2", "09/18", "95", "100"]],
    "categories": [["Major", "60%", "94.5%"]]
  }
}` },
      { method: "POST", path: "/api/getReport", title: "Get progress report", description: "Returns the active student’s interim progress report. If student_id is supplied, the API switches students before parsing the report.", auth: "credentials", fields: [...credentialFields, { name: "student_id", type: "string", note: "Optional HAC student ID for multi-student accounts." }], success: "200 OK", errors: "400 switch failure · 401 · 404 · 429 · 500", response: `{
  "headers": ["Class Code", "Class", "Period", "Teacher", "Room", "Average"],
  "data": [["MTH401", "Precalculus", "3", "Teacher Name", "204", "91.80%"]]
}` },
      { method: "POST", path: "/api/getIpr", title: "Get interim progress report", description: "Returns the same parsed Interim Progress report structure used by getReport for the active student.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 · 429 · 500", response: `{
  "headers": ["Class Code", "Class", "Period", "Teacher", "Room", "Average"],
  "data": [["SCI301", "Physics", "2", "Teacher Name", "118", "93.00%"]]
}` },
      { method: "POST", path: "/api/getTranscript", title: "Get transcript", description: "Returns semester groupings, course rows, credits, cumulative GPA fields, and rank parsed from HAC Transcript.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 transcript unavailable · 429 · 500", response: `{
  "2025 - Semester 1": {
    "year": "2025",
    "semester": "1",
    "grade": "10",
    "school": "Example High School",
    "data": [["ENG201", "English II", "A", "1.0"]],
    "credits": "4.0"
  },
  "Rank": "42 / 815"
}` },
      { method: "POST", path: "/api/getRank", title: "Get class rank", description: "Returns the rank field parsed from the HAC Transcript page.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 rank unavailable · 429 · 500", response: `{
  "rank": "42 / 815"
}` },
      { method: "POST", path: "/api/getDayType", title: "Get A/B day type", description: "Parses HAC Week View for the target week and resolves the requested date in America/Chicago time.", auth: "credentials", fields: [...credentialFields, { name: "target_date", type: "string · date", note: "Optional. YYYY-MM-DD or MM/DD/YYYY; defaults to today in Central Time." }], success: "200 OK", errors: "400 invalid date · 401 · 404 Week View parse failure · 429 · 500", response: `{
  "target_date": "2026-07-20",
  "week_start": "2026-07-20",
  "day_type": "A",
  "is_weekend": false,
  "found": true,
  "week": [
    { "weekday": "Monday", "date": "2026-07-20", "mmdd": "07/20", "day_type": "A" }
  ]
}` },
    ],
  },
  {
    id: "households",
    label: "Multi-student accounts",
    intro: "List students attached to a HAC account, inspect the active student, and switch context.",
    endpoints: [
      { method: "POST", path: "/lookup/students", title: "List students", description: "Returns student IDs and names from the HAC Student Picker.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 no students · 429 · 500", response: `{
  "students": [
    { "id": "100001", "name": "Sample Student" },
    { "id": "100002", "name": "Second Student" }
  ]
}` },
      { method: "POST", path: "/lookup/current", title: "Get active student", description: "Reads the currently selected student from the HAC home-page banner.", auth: "credentials", fields: credentialFields, success: "200 OK", errors: "400 · 401 · 404 · 429 · 500", response: `{
  "success": true,
  "active_student": { "name": "Sample Student" }
}` },
      { method: "POST", path: "/lookup/switch", title: "Switch active student", description: "Submits the HAC Student Picker form with the requested student ID for the temporary session created by this request.", auth: "credentials", fields: [...credentialFields, { name: "student_id", type: "string", required: true, note: "Student ID returned by /lookup/students." }], success: "200 OK", errors: "400 missing/invalid student · 401 · 429 · 500", response: `{
  "success": true,
  "message": "Switched to student 100002"
}` },
    ],
  },
  {
    id: "logs",
    label: "Hall pass logs",
    intro: "Create and close checkout records in the configured Supabase checkouts table.",
    endpoints: [
      { method: "POST", path: "/logs/checkout", title: "Create checkout", description: "Validates HAC credentials, then inserts an open checkout record through the Supabase service role.", auth: "credentials", fields: [...credentialFields, { name: "student_id", type: "string", required: true, note: "HAC student identifier." }, { name: "student_name", type: "string", required: true, note: "Student display name." }, { name: "class_name", type: "string", required: true, note: "Current class." }, { name: "period", type: "integer · 1–8", required: true, note: "Current period." }, { name: "room", type: "string", required: true, note: "Origin room." }, { name: "teacher", type: "string", required: true, note: "Origin teacher." }, { name: "checkout_time", type: "ISO 8601 timestamp", required: true, note: "Checkout time with timezone." }], success: "201 Created", errors: "400 missing fields · 401 · 429 · 500 · 503 Supabase unavailable", response: `{
  "id": "5b8c2f52-1a2b-4d5e-9f10-123456789abc",
  "student_id": "100001",
  "class_name": "Precalculus",
  "period": 3,
  "room": "204",
  "checkout_time": "2026-07-20T10:18:00-05:00",
  "checkin_time": null,
  "duration_sec": null
}` },
      { method: "POST", path: "/logs/checkin", title: "Close checkout", description: "Validates HAC credentials, then updates a checkout by UUID with its return time and computed duration.", auth: "credentials", fields: [...credentialFields, { name: "checkout_id", type: "string · UUID", required: true, note: "ID returned by /logs/checkout." }, { name: "checkin_time", type: "ISO 8601 timestamp", required: true, note: "Return time with timezone." }, { name: "duration_sec", type: "integer · ≥0", required: true, note: "Elapsed time in seconds." }], success: "200 OK", errors: "400 missing fields · 401 · 404 checkout not found · 429 · 500 · 503 Supabase unavailable", response: `[
  {
    "id": "5b8c2f52-1a2b-4d5e-9f10-123456789abc",
    "checkin_time": "2026-07-20T10:24:30-05:00",
    "duration_sec": 390
  }
]` },
    ],
  },
];

const quickstart = `const response = await fetch("${API_BASE}/api/getReport", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: process.env.HAC_USERNAME,
    password: process.env.HAC_PASSWORD,
    base_url: "https://accesscenter.roundrockisd.org/"
  })
});

if (!response.ok) {
  const problem = await response.json();
  throw new Error(problem.error ?? "HAC request failed");
}

const report = await response.json();`;

const curl = `curl -X POST "${API_BASE}/api/getDayType" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "YOUR_HAC_USERNAME",
    "password": "YOUR_HAC_PASSWORD",
    "target_date": "2026-07-20"
  }'`;

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <button type="button" onClick={copy} className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-current px-3 font-mono text-[10px] uppercase tracking-wider transition-colors hover:bg-chalk hover:text-ink" aria-label={`${label}: ${value}`}><IconCopy className="h-4 w-4" />{copied ? "Copied" : label}<span className="sr-only" aria-live="polite">{copied ? `${label} copied` : ""}</span></button>;
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return <div className="overflow-hidden border border-ink bg-ink text-paper"><div className="flex items-center justify-between border-b border-paper/25 px-4 py-2"><span className="font-mono text-[10px] uppercase tracking-wider text-paper/65">{label}</span><CopyButton value={code} label="Copy code" /></div><pre className="overflow-x-auto p-5 font-mono text-[12px] leading-6 text-paper"><code>{code}</code></pre></div>;
}

function FieldTable({ fields }: { fields: Field[] }) {
  return <><div className="grid border border-line sm:hidden">{fields.map((field) => <div key={field.name} className="border-b border-line p-4 last:border-b-0"><div className="flex flex-wrap items-center justify-between gap-2"><code className="font-mono text-xs font-semibold text-accent-2">{field.name}</code><span className="font-mono text-[9px] uppercase tracking-wider">{field.required ? "Required" : "Optional"}</span></div><p className="mt-2 text-xs text-faint">{field.type}</p><p className="mt-3 text-sm leading-relaxed text-ink-2">{field.note}</p></div>)}</div><div className="hidden overflow-x-auto border border-line sm:block"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead className="bg-bg-2 font-mono text-[10px] uppercase tracking-wider"><tr><th className="p-3">Field</th><th className="p-3">Type</th><th className="p-3">Requirement</th><th className="p-3">Description</th></tr></thead><tbody>{fields.map((field) => <tr key={field.name} className="border-t border-line align-top"><td className="p-3 font-mono text-xs text-accent-2">{field.name}</td><td className="p-3 text-ink-2">{field.type}</td><td className="p-3">{field.required ? <span className="font-semibold">Required</span> : "Optional"}</td><td className="p-3 text-ink-2">{field.note}</td></tr>)}</tbody></table></div></>;
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  return <details className="group border-b border-ink" open={endpoint.path === "/api/login"}><summary className="flex min-h-24 cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden"><span className={`w-14 shrink-0 text-center font-mono text-[10px] font-bold ${endpoint.method === "GET" ? "text-go" : "text-accent-2"}`}>{endpoint.method}</span><code className="min-w-0 flex-1 break-all font-mono text-sm font-semibold sm:text-base">{endpoint.path}</code><span className="hidden flex-1 text-sm text-ink-2 md:block">{endpoint.title}</span><IconChevron className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180" /></summary><div className="pb-10 pl-0 sm:pl-[72px]"><p className="max-w-3xl leading-relaxed text-ink-2">{endpoint.description}</p><div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider"><span className="border border-ink px-2.5 py-1.5">{endpoint.auth === "credentials" ? "HAC credentials" : "No auth"}</span><span className="border border-ink px-2.5 py-1.5 text-go">{endpoint.success}</span></div>{endpoint.fields && <div className="mt-7"><h4 className="mb-3 font-mono text-[10px] uppercase tracking-wider">JSON request body</h4><FieldTable fields={endpoint.fields} /></div>}<div className="mt-7 grid gap-5 lg:grid-cols-[1fr_0.8fr]"><div className="overflow-hidden border border-ink bg-ink text-paper"><div className="flex items-center justify-between border-b border-paper/20 px-4 py-2"><span className="font-mono text-[10px] uppercase tracking-wider text-paper/45">Example response</span><CopyButton value={endpoint.response} label="Copy JSON" /></div><pre className="max-h-[390px] overflow-auto p-5 font-mono text-[11px] leading-6 text-paper/75"><code>{endpoint.response}</code></pre></div><div>{endpoint.errors && <><h4 className="font-mono text-[10px] uppercase tracking-wider">Possible errors</h4><p className="mt-3 text-sm leading-relaxed text-ink-2">{endpoint.errors}</p></>}<p className="mt-6 text-xs leading-relaxed text-faint">Examples use fictional values. Response content depends on the HAC district template and available student records.</p></div></div></div></details>;
}

const navItems = [
  ["overview", "Overview"], ["authentication", "Authentication"], ["quickstart", "Quickstart"], ["reference", "Endpoint reference"], ["errors", "Errors"], ["limits", "Limits & CORS"], ["security", "Security notes"], ["local", "Local development"],
];

export function ApiPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return groups;
    return groups.map((group) => ({ ...group, endpoints: group.endpoints.filter((endpoint) => `${endpoint.method} ${endpoint.path} ${endpoint.title} ${endpoint.description}`.toLowerCase().includes(needle)) })).filter((group) => group.endpoints.length);
  }, [query]);
  const count = groups.reduce((sum, group) => sum + group.endpoints.length, 0);

  return <main id="main" className="fresh-section">
    <section id="overview" className="relative overflow-hidden border-b border-ink pt-32 sm:pt-40"><div className="rule-grid absolute inset-0 opacity-60" /><div className="shell relative pb-16 sm:pb-24"><div className="flex flex-wrap items-center gap-3"><span className="border border-ink bg-chalk px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">API reference · v1</span><span className="font-mono text-[10px] uppercase tracking-wider text-faint">Implementation-aligned · July 2026</span></div><div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"><div><Eyebrow>HallHop developer documentation</Eyebrow><h1 className="display mt-8 max-w-[11ch] text-[clamp(4.2rem,9vw,9rem)]">HAC API,<br /><span className="text-accent">fully mapped.</span></h1></div><div><p className="max-w-lg text-lg leading-relaxed text-ink-2">A stateless Flask API that turns authorized Home Access Center pages into structured JSON for student tools and HallHop workflows.</p><div className="mt-7 flex flex-wrap items-center gap-3 border border-ink bg-ink p-3 text-paper"><code className="min-w-0 flex-1 break-all font-mono text-xs">{API_BASE}</code><CopyButton value={API_BASE} label="Copy base URL" /></div></div></div><div className="mt-14 grid border-y border-ink sm:grid-cols-3"><div className="py-5 sm:pr-5"><p className="display text-4xl">{count}</p><p className="mt-1 text-sm text-ink-2">documented routes</p></div><div className="border-t border-ink py-5 sm:border-l sm:border-t-0 sm:px-5"><p className="display text-4xl">100/hr</p><p className="mt-1 text-sm text-ink-2">default IP rate limit</p></div><div className="border-t border-ink py-5 sm:border-l sm:border-t-0 sm:pl-5"><p className="display text-4xl">Central</p><p className="mt-1 text-sm text-ink-2">default date timezone</p></div></div></div></section>

    <div className="shell grid gap-12 py-14 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)]">
      <aside className="hidden lg:block"><nav className="sticky top-28 border-t border-ink" aria-label="API documentation sections">{navItems.map(([href, label]) => <a key={href} href={`#${href}`} className="flex min-h-11 items-center border-b border-line text-sm text-ink-2 transition-colors hover:text-accent-2">{label}</a>)}</nav></aside>
      <div className="min-w-0 space-y-24">
        <section id="authentication" className="scroll-mt-28"><Reveal><Eyebrow>Authentication model</Eyebrow><h2 className="display mt-7 text-5xl sm:text-6xl">Credentials travel with the request.</h2><p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">The current API does not issue access tokens or maintain server-side login sessions. With the exception of the health and logout routes, every request includes HAC credentials in a JSON body. The server creates a temporary requests session, logs in to HAC, retrieves the requested page, and returns parsed JSON.</p><div className="mt-8 border-l-4 border-accent bg-bg-2 p-5"><div className="flex items-start gap-4"><IconLock className="mt-1 h-6 w-6 shrink-0" /><div><h3 className="font-semibold">Use only from a trusted client and over HTTPS.</h3><p className="mt-2 text-sm leading-relaxed text-ink-2">Never put real credentials in source control, URLs, analytics, screenshots, or client logs. Production requests are redirected to HTTPS, but consumers still own safe credential handling.</p></div></div></div><div className="mt-8"><FieldTable fields={credentialFields} /></div></Reveal></section>

        <section id="quickstart" className="scroll-mt-28"><Reveal><Eyebrow>Quickstart</Eyebrow><h2 className="display mt-7 text-5xl sm:text-6xl">Make the first request.</h2><p className="mt-5 max-w-3xl leading-relaxed text-ink-2">Send JSON with a content type header. Check the HTTP status before reading a successful payload; failures consistently use an <code className="font-mono text-sm">error</code> field.</p><div className="mt-8 grid gap-5"><CodeBlock code={quickstart} label="JavaScript · progress report" /><CodeBlock code={curl} label="cURL · day type" /></div></Reveal></section>

        <section id="reference" className="scroll-mt-28"><Reveal><Eyebrow>Endpoint reference</Eyebrow><div className="mt-7 flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between"><div><h2 className="display text-5xl sm:text-6xl">Every route.</h2><p className="mt-4 text-ink-2">Open a route for request fields, responses, and errors.</p></div><label className="relative block w-full max-w-md"><span className="sr-only">Search endpoints</span><IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search path, task, or response…" className="form-control pl-12" /></label></div></Reveal><div className="mt-12">{filtered.length ? filtered.map((group) => <section key={group.id} id={group.id} className="mb-16 scroll-mt-28"><div className="grid gap-4 border-b border-ink pb-5 sm:grid-cols-[0.4fr_1fr] sm:items-end"><h3 className="display text-3xl">{group.label}</h3><p className="text-sm leading-relaxed text-ink-2">{group.intro}</p></div>{group.endpoints.map((endpoint) => <EndpointCard key={`${endpoint.method}-${endpoint.path}`} endpoint={endpoint} />)}</section>) : <div className="border border-ink bg-bg p-8"><p className="display text-3xl">No endpoint matched.</p><button type="button" onClick={() => setQuery("")} className="link-arrow mt-5 cursor-pointer underline">Clear search</button></div>}</div></section>

        <section id="errors" className="scroll-mt-28"><Reveal><Eyebrow>Error contract</Eyebrow><h2 className="display mt-7 text-5xl sm:text-6xl">Failures stay readable.</h2><div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div className="border border-ink bg-ink p-5 text-paper"><pre className="font-mono text-sm text-paper/75">{`{
  "error": "Invalid credentials or HAC login failed"
}`}</pre></div><div><table className="w-full border-collapse text-sm"><tbody>{[["400", "Missing fields, invalid dates, invalid base URL, or student-switch failure"], ["401", "HAC rejected the supplied credentials"], ["404", "Requested HAC data or checkout record was not found"], ["429", "The client IP exceeded a configured rate limit"], ["500", "Unexpected upstream, parser, or server failure"], ["503", "Supabase is not configured or could not initialize"]].map(([status, meaning]) => <tr key={status} className="border-t border-ink align-top"><td className="w-16 py-4 pr-3 font-mono font-semibold text-accent-2 sm:w-20">{status}</td><td className="py-4 text-ink-2">{meaning}</td></tr>)}</tbody></table></div></div></Reveal></section>

        <section id="limits" className="scroll-mt-28"><Reveal><Eyebrow>Limits & transport</Eyebrow><h2 className="display mt-7 text-5xl sm:text-6xl">Know the guardrails.</h2><div className="mt-10 grid border-y border-ink md:grid-cols-3">{[["100 / hour", "Default Flask-Limiter rule applied per remote IP."], ["5 / minute", "Stricter rule on POST /api/login per remote IP."], ["10 seconds", "Timeout used for HAC GET and POST requests; retry logic covers 429 and common 5xx responses."]].map(([value, note], i) => <div key={value} className={`p-6 ${i ? "border-t border-ink md:border-l md:border-t-0" : ""}`}><p className="display text-4xl text-accent">{value}</p><p className="mt-4 text-sm leading-relaxed text-ink-2">{note}</p></div>)}</div><p className="mt-8 max-w-3xl leading-relaxed text-ink-2">CORS currently allows every origin, common HTTP methods, and requested headers. Browser credentials are disabled. Treat this as a public network surface and do not rely on CORS as authentication.</p></Reveal></section>

        <section id="security" className="scroll-mt-28"><Reveal><Eyebrow>Security notes</Eyebrow><h2 className="display mt-7 text-5xl sm:text-6xl">Read before integrating.</h2><div className="mt-10 border-t border-ink">{[["No API token layer", "Authorization is currently possession of valid HAC credentials. Add an application-level identity and authorization layer before broader third-party use."], ["Stateless HAC sessions", "Each protected call logs in again. The code does not persist a server-side HAC session, and /api/logout only acknowledges local cleanup."], ["Open CORS policy", "Any web origin can call the service. Restrict allowed origins for controlled production clients."], ["Service-role database access", "Checkout logging uses SUPABASE_SERVICE_ROLE_KEY. Keep it server-only and review table policy; the included schema disables row-level security."], ["Upstream HTML dependency", "Responses depend on HAC page markup. A district HAC update can change or break parsing without changing this API contract."], ["Sensitive response data", "Registration, grades, assignments, transcripts, schedules, and movement logs are student records. Minimize collection, logging, retention, and display."]].map(([title, body]) => <div key={title} className="grid gap-3 border-b border-ink py-6 sm:grid-cols-[0.42fr_1fr]"><h3 className="font-semibold">{title}</h3><p className="leading-relaxed text-ink-2">{body}</p></div>)}</div><div className="mt-8 flex items-start gap-4 border border-ink bg-chalk p-5"><IconShield className="mt-1 h-6 w-6 shrink-0" /><p className="text-sm leading-relaxed">This section describes the current repository implementation. It is not a security certification or a substitute for district privacy, legal, infrastructure, and vendor review.</p></div></Reveal></section>

        <section id="local" className="scroll-mt-28"><Reveal><Eyebrow>Local development</Eyebrow><h2 className="display mt-7 text-5xl sm:text-6xl">Run the service.</h2><div className="mt-8 grid gap-5"><CodeBlock label="Terminal" code={`python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export FLASK_ENV=development
python app.py`} /><CodeBlock label=".env · only required for /logs routes" code={`SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY`} /></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="border border-ink p-5"><h3 className="font-semibold">Local URL</h3><code className="mt-3 block break-all font-mono text-sm text-accent-2">http://localhost:5000</code><p className="mt-3 text-sm text-ink-2">Setting FLASK_ENV=development prevents the HTTPS redirect during local work.</p></div><div className="border border-ink p-5"><h3 className="font-semibold">Production adapters</h3><p className="mt-3 text-sm leading-relaxed text-ink-2">The repository includes a Vercel Python build configuration and a Gunicorn Procfile for process-based hosting.</p></div></div></Reveal></section>

        <section className="signal-section -mx-4 border-y border-ink px-4 py-12 sm:-mx-8 sm:px-8"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><IconApi className="h-9 w-9" /><h2 className="display mt-7 text-5xl">Need an integration review?</h2><p className="mt-4 max-w-2xl leading-relaxed">Bring the workflow, district HAC origin, and data boundary. We’ll help identify the smallest useful integration.</p></div><a href="/contact" className="btn btn-dark">Contact sales</a></div></section>
      </div>
    </div>
  </main>;
}
