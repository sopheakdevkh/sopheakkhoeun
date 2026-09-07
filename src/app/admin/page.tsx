"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Tab =
  | "profile"
  | "services"
  | "skills"
  | "projects"
  | "testimonials"
  | "journey"
  | "messages";

type ContentState = {
  profile: Record<string, unknown> | null;
  services: Array<Record<string, unknown>>;
  skills: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  testimonials: Array<Record<string, unknown>>;
  journey: Array<Record<string, unknown>>;
  messages: Array<Record<string, unknown>>;
};

const emptyContent: ContentState = {
  profile: null,
  services: [],
  skills: [],
  projects: [],
  testimonials: [],
  journey: [],
  messages: [],
};

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  {
    id: "profile",
    label: "Profile",
    icon: (
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
    ),
  },
  {
    id: "services",
    label: "Services",
    icon: (
      <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z" />
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Zm0 2.2 6 3v4.7c0 3.7-2.4 7-6 7.6-3.6-.6-6-3.9-6-7.6V7.2l6-3Z" />
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    ),
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: (
      <path d="M7 8h5v5H9.5A2.5 2.5 0 0 0 7 15.5V18H5v-2.5A4.5 4.5 0 0 1 9.5 11H10V8H7Zm9 0h5v5h-2.5A2.5 2.5 0 0 0 16 15.5V18h-2v-2.5A4.5 4.5 0 0 1 18.5 11H19V8h-3Z" />
    ),
  },
  {
    id: "journey",
    label: "Journey",
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z" />
    ),
  },
  {
    id: "messages",
    label: "Messages",
    icon: (
      <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" />
    ),
  },
];

const inputClass =
  "rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#c4a46a] focus:ring-2 focus:ring-[#c4a46a]/25";
const labelClass = "grid gap-1.5 text-sm";
const labelSpanClass = "font-medium text-zinc-500";
const cardClass =
  "rounded-3xl border border-zinc-100 bg-white p-5 shadow-[0_10px_30px_rgba(28,25,23,0.06)]";
const primaryBtnClass =
  "rounded-full bg-[#c4a46a] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(196,164,106,0.35)] transition hover:bg-[#b89458]";
const ghostBtnClass =
  "rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50";
const dangerBtnClass =
  "rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [content, setContent] = useState<ContentState>(emptyContent);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    endpoint: string;
    label: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    const auth = await fetch("/api/admin/login").then((res) => res.json());
    if (!auth.authenticated) {
      router.replace("/admin/login");
      return;
    }

    const data = await fetch("/api/admin/content").then((res) => res.json());
    if (data.error) {
      router.replace("/admin/login");
      return;
    }

    setContent({
      profile: data.profile,
      services: data.services ?? [],
      skills: data.skills ?? [],
      projects: data.projects ?? [],
      testimonials: data.testimonials ?? [],
      journey: data.journey ?? [],
      messages: data.messages ?? [],
    });
    setLoading(false);
  }, [router]);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "Profile saved." : "Failed to save profile.");
    await load();
  }

  async function createItem(
    endpoint: string,
    payload: Record<string, unknown>,
  ) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "Created." : "Create failed.");
    await load();
  }

  async function updateItem(
    endpoint: string,
    payload: Record<string, unknown>,
  ) {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "Updated." : "Update failed.");
    await load();
  }

  function requestDelete(endpoint: string, label = "this item") {
    setPendingDelete({ endpoint, label });
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(pendingDelete.endpoint, {
        method: "DELETE",
      });
      setStatus(response.ok ? "Deleted." : "Delete failed.");
      setPendingDelete(null);
      await load();
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">
        Loading admin…
      </div>
    );
  }

  const profile = content.profile ?? {};
  const profileName = String(profile.name ?? "Admin");
  const unreadMessages = content.messages.filter((m) => !m.read).length;
  const activeTab = tabs.find((item) => item.id === tab);

  const stats = [
    { label: "Services", value: content.services.length },
    { label: "Skills", value: content.skills.length },
    { label: "Projects", value: content.projects.length },
    { label: "Messages", value: content.messages.length },
  ];

  const recentMessages = content.messages.slice(0, 5);

  function selectTab(next: Tab) {
    setTab(next);
    setSidebarOpen(false);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] text-zinc-900 lg:p-4 xl:p-5">
      <div className="flex w-full flex-col bg-[#efeae2] lg:min-h-[calc(100vh-2.5rem)] lg:flex-row lg:rounded-[2rem] lg:shadow-[0_20px_60px_rgba(28,25,23,0.12)]">
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-full max-w-none flex-col bg-[#1c1a19] text-white transition-transform duration-300 sm:max-w-sm lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-[17rem] lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:rounded-l-[2rem] ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-6 pt-7 pb-5">
            <div className="flex items-center gap-3">
              <Image
                src="/avatar.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border border-white/20 object-cover"
              />
              <div>
                <p className="text-sm font-bold tracking-wide">Portfolio</p>
                <p className="text-xs text-white/50">CMS Admin</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white/80 lg:hidden"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
            {tabs.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-[#c4a46a] text-white shadow-[0_8px_20px_rgba(196,164,106,0.35)]"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-current"
                    aria-hidden
                  >
                    {item.icon}
                  </svg>
                  <span className="flex-1">{item.label}</span>
                  {item.id === "messages" && unreadMessages > 0 ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active ? "bg-white/20" : "bg-[#c4a46a] text-white"
                      }`}
                    >
                      {unreadMessages}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 p-4">
            <div className="rounded-2xl bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/avatar.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{profileName}</p>
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/"
                className="flex-1 rounded-full bg-white/10 px-3 py-2 text-center text-xs font-semibold text-white/80 transition hover:bg-white/15"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex-1 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/15"
              >
                Log out
              </button>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-white lg:rounded-r-[2rem] xl:rounded-none">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-zinc-100 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 lg:rounded-tr-[2rem] xl:rounded-none">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 lg:hidden"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                {activeTab?.label ?? "Dashboard"}
              </h1>
            </div>
            {status ? (
              <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {status}
              </p>
            ) : null}
          </div>

          <div className="px-4 py-5 sm:px-6 lg:px-8">
            <section className="relative overflow-hidden rounded-[1.75rem] bg-[#c4a46a] px-6 py-7 text-white shadow-[0_16px_40px_rgba(196,164,106,0.35)] sm:px-8">
              <div className="relative z-10 max-w-xl">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Welcome back, {profileName}!
                </h2>
                <p className="mt-2 text-sm text-white/85 sm:text-base">
                  Manage header, about, projects, journey, and inbox from one
                  place. Pick a section in the sidebar to edit.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => selectTab("messages")}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-800"
                  >
                    Open inbox
                    {unreadMessages > 0 ? ` (${unreadMessages})` : ""}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectTab("projects")}
                    className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Edit projects
                  </button>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-6 -bottom-8 hidden h-40 w-40 rounded-full border-[10px] border-white/20 bg-white/10 sm:block" />
            </section>

            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-zinc-100 bg-[#faf8f5] px-4 py-4 shadow-[0_8px_24px_rgba(28,25,23,0.04)]"
                >
                  <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              {tab === "profile" ? (
                <form onSubmit={saveProfile} className={`${cardClass} grid gap-4 sm:grid-cols-2`}>
                  <div className="sm:col-span-2">
                    <h2 className="text-lg font-bold text-zinc-900">
                      Header · Footer · Contact
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      Name shows in the header & footer. Email / GitHub /
                      LinkedIn power contact and social links.
                    </p>
                  </div>

                  <p className="sm:col-span-2 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Header & hero
                  </p>
                  {(
                    [
                      ["name", "Name (header / footer)"],
                      ["title", "Title (hero)"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className={labelClass}>
                      <span className={labelSpanClass}>{label}</span>
                      <input
                        name={key}
                        defaultValue={String(profile[key] ?? "")}
                        className={inputClass}
                      />
                    </label>
                  ))}
                  <label className={`${labelClass} sm:col-span-2`}>
                    <span className={labelSpanClass}>Bio (hero)</span>
                    <textarea
                      name="bio"
                      rows={4}
                      defaultValue={String(profile.bio ?? "")}
                      className={inputClass}
                    />
                  </label>

                  <p className="sm:col-span-2 mt-1 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    About page
                  </p>
                  <label className={`${labelClass} sm:col-span-2`}>
                    <span className={labelSpanClass}>
                      Photo URL (PNG / JPG / WEBP / SVG)
                    </span>
                    <input
                      name="photoUrl"
                      placeholder="https://…/photo.png or /me.png"
                      defaultValue={String(profile.photoUrl ?? "")}
                      className={inputClass}
                    />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    <span className={labelSpanClass}>
                      About text (blank line = new paragraph)
                    </span>
                    <textarea
                      name="about"
                      rows={8}
                      defaultValue={String(profile.about ?? "")}
                      className={inputClass}
                    />
                  </label>

                  <p className="sm:col-span-2 mt-1 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Contact & footer links
                  </p>
                  {(
                    [
                      ["email", "Email"],
                      ["location", "Location"],
                      ["github", "GitHub URL"],
                      ["linkedin", "LinkedIn URL"],
                      ["twitter", "Twitter URL"],
                      ["resumeUrl", "Resume URL"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className={labelClass}>
                      <span className={labelSpanClass}>{label}</span>
                      <input
                        name={key}
                        defaultValue={String(profile[key] ?? "")}
                        className={inputClass}
                      />
                    </label>
                  ))}
                  <button type="submit" className={`${primaryBtnClass} sm:col-span-2`}>
                    Save profile
                  </button>
                </form>
              ) : null}

              {tab === "services" ? (
                <SectionManager
                  title="Services"
                  items={content.services}
                  fields={[
                    { name: "title", label: "Title" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "visual", label: "Visual (code|db|ops)" },
                    { name: "span", label: "Span (full|half)" },
                    { name: "order", label: "Order", type: "number" },
                  ]}
                  onCreate={(payload) => createItem("/api/services", payload)}
                  onUpdate={(id, payload) =>
                    updateItem(`/api/services/${id}`, payload)
                  }
                  onDelete={(id, label) =>
                    requestDelete(`/api/services/${id}`, label)
                  }
                />
              ) : null}

              {tab === "skills" ? (
                <SectionManager
                  title="Skills"
                  items={content.skills}
                  fields={[
                    { name: "name", label: "Name" },
                    { name: "category", label: "Category" },
                    { name: "level", label: "Level", type: "number" },
                    { name: "order", label: "Order", type: "number" },
                  ]}
                  onCreate={(payload) => createItem("/api/skills", payload)}
                  onUpdate={(id, payload) =>
                    updateItem(`/api/skills/${id}`, payload)
                  }
                  onDelete={(id, label) =>
                    requestDelete(`/api/skills/${id}`, label)
                  }
                />
              ) : null}

              {tab === "projects" ? (
                <SectionManager
                  title="Projects"
                  items={content.projects}
                  fields={[
                    { name: "title", label: "Title" },
                    { name: "slug", label: "Slug" },
                    { name: "summary", label: "Summary", type: "textarea" },
                    {
                      name: "description",
                      label: "Description",
                      type: "textarea",
                    },
                    { name: "imageUrl", label: "Image URL" },
                    { name: "demoUrl", label: "Demo URL" },
                    { name: "githubUrl", label: "GitHub URL" },
                    { name: "tags", label: "Tags (comma separated)" },
                    { name: "order", label: "Order", type: "number" },
                  ]}
                  transformCreate={(form) => ({
                    ...form,
                    tags: String(form.tags ?? "")
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                    featured: Boolean(form.featured),
                  })}
                  transformUpdate={(form) => ({
                    ...form,
                    tags: String(form.tags ?? "")
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })}
                  extraCreateFields={
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                      <input type="checkbox" name="featured" className="rounded" />
                      Featured
                    </label>
                  }
                  renderItemMeta={(item) =>
                    Array.isArray(item.tags) ? String(item.tags.join(", ")) : ""
                  }
                  onCreate={(payload) => createItem("/api/projects", payload)}
                  onUpdate={(id, payload) =>
                    updateItem(`/api/projects/${id}`, payload)
                  }
                  onDelete={(id, label) =>
                    requestDelete(`/api/projects/${id}`, label)
                  }
                />
              ) : null}

              {tab === "testimonials" ? (
                <SectionManager
                  title="Testimonials"
                  items={content.testimonials}
                  fields={[
                    { name: "name", label: "Name" },
                    { name: "country", label: "Country" },
                    { name: "flag", label: "Flag emoji" },
                    { name: "rating", label: "Rating", type: "number" },
                    { name: "quote", label: "Quote", type: "textarea" },
                    { name: "order", label: "Order", type: "number" },
                  ]}
                  onCreate={(payload) =>
                    createItem("/api/testimonials", payload)
                  }
                  onUpdate={(id, payload) =>
                    updateItem(`/api/testimonials/${id}`, payload)
                  }
                  onDelete={(id, label) =>
                    requestDelete(`/api/testimonials/${id}`, label)
                  }
                />
              ) : null}

              {tab === "journey" ? (
                <SectionManager
                  title="Journey"
                  items={content.journey}
                  fields={[
                    { name: "year", label: "Year" },
                    { name: "title", label: "Title" },
                    {
                      name: "description",
                      label: "Description",
                      type: "textarea",
                    },
                    { name: "location", label: "Location" },
                    { name: "tag", label: "Tag" },
                    { name: "order", label: "Order", type: "number" },
                  ]}
                  onCreate={(payload) => createItem("/api/journey", payload)}
                  onUpdate={(id, payload) =>
                    updateItem(`/api/journey/${id}`, payload)
                  }
                  onDelete={(id, label) =>
                    requestDelete(`/api/journey/${id}`, label)
                  }
                />
              ) : null}

              {tab === "messages" ? (
                <div className="grid gap-3">
                  {content.messages.length === 0 ? (
                    <div className={`${cardClass} text-sm text-zinc-500`}>
                      No messages yet.
                    </div>
                  ) : (
                    content.messages.map((message) => (
                      <article key={String(message.id)} className={cardClass}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-zinc-900">
                              {String(message.name)} · {String(message.email)}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                              {message.subject
                                ? String(message.subject)
                                : "No subject"}{" "}
                              ·{" "}
                              {new Date(
                                String(message.createdAt),
                              ).toLocaleString()}
                              {!message.read ? (
                                <span className="ml-2 rounded-full bg-[#c4a46a]/15 px-2 py-0.5 font-semibold text-[#9a7a45]">
                                  Unread
                                </span>
                              ) : null}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className={ghostBtnClass}
                              onClick={() =>
                                updateItem(`/api/messages/${message.id}`, {
                                  read: !message.read,
                                })
                              }
                            >
                              {message.read ? "Mark unread" : "Mark read"}
                            </button>
                            <button
                              type="button"
                              className={dangerBtnClass}
                              onClick={() =>
                                requestDelete(
                                  `/api/messages/${message.id}`,
                                  String(message.name),
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                          {String(message.body)}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </main>

        <aside className="hidden w-[19rem] shrink-0 flex-col border-l border-[#e7e0d6] bg-[#f7f3ec] xl:sticky xl:top-0 xl:flex xl:h-screen xl:overflow-y-auto xl:rounded-r-[2rem]">
          <div className="px-5 py-5">
            <h2 className="text-lg font-bold text-zinc-900">My activity</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Latest inbox activity and quick counts.
            </p>
          </div>

          <div className="space-y-5 px-5 pb-6">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">
                  Latest messages
                </h3>
                <button
                  type="button"
                  onClick={() => selectTab("messages")}
                  className="text-xs font-semibold text-[#9a7a45] hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="space-y-2">
                {recentMessages.length === 0 ? (
                  <p className="rounded-lg border border-zinc-200 bg-white px-3 py-4 text-xs text-zinc-500">
                    Inbox is empty.
                  </p>
                ) : (
                  recentMessages.map((message) => (
                    <button
                      key={String(message.id)}
                      type="button"
                      onClick={() => selectTab("messages")}
                      className="flex w-full gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-left transition hover:bg-zinc-50"
                    >
                      <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#c4a46a] text-white">
                        <span className="text-[10px] font-bold uppercase">
                          {new Date(String(message.createdAt)).toLocaleString(
                            undefined,
                            { month: "short" },
                          )}
                        </span>
                        <span className="text-sm font-bold leading-none">
                          {new Date(String(message.createdAt)).getDate()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-900">
                          {String(message.name)}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {String(message.body)}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-bold text-zinc-900">
                Content snapshot
              </h3>
              <div className="space-y-2">
                {[
                  ["Testimonials", content.testimonials.length],
                  ["Journey", content.journey.length],
                  ["Unread mail", unreadMessages],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-3"
                  >
                    <span className="text-sm text-zinc-500">{label}</span>
                    <span className="text-sm font-bold text-zinc-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete item?"
        message={
          pendingDelete
            ? `Delete “${pendingDelete.label}”? This cannot be undone.`
            : "Delete this item? This cannot be undone."
        }
        confirmLabel={deleting ? "Deleting…" : "Delete"}
        busy={deleting}
        onCancel={() => {
          if (!deleting) setPendingDelete(null);
        }}
        onConfirm={() => {
          void confirmDelete();
        }}
      />
    </div>
  );
}

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number";
};

function ConfirmModal({
  open,
  title,
  message,
  confirmLabel,
  busy,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !busy) onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, busy, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={() => {
          if (!busy) onCancel();
        }}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-message"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_80px_rgba(28,25,23,0.28)]"
      >
        <div className="bg-[#c4a46a] px-6 py-5 text-white">
          <p className="text-xs font-semibold tracking-wide text-white/80 uppercase">
            Confirm
          </p>
          <h2
            id="confirm-delete-title"
            className="mt-1 text-xl font-bold tracking-tight"
          >
            {title}
          </h2>
        </div>
        <div className="px-6 py-5">
          <p
            id="confirm-delete-message"
            className="text-sm tracking-wide text-zinc-500"
          >
            {message}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={onConfirm}
              className={`${dangerBtnClass} disabled:opacity-60`}
            >
              {confirmLabel}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={onCancel}
              className={`${ghostBtnClass} disabled:opacity-60`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormModal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_80px_rgba(28,25,23,0.28)]"
      >
        <div className="relative overflow-hidden bg-[#c4a46a] px-6 py-6 text-white sm:px-8 sm:py-7">
          <div className="relative z-10 pr-10">
            <p className="text-xs font-semibold tracking-wide text-white/80 uppercase">
              Portfolio CMS
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{title}</h2>
            {subtitle ? (
              <p className="mt-1.5 text-sm text-white/85">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl text-white transition hover:bg-white/25"
            aria-label="Close"
          >
            ×
          </button>
          <div className="pointer-events-none absolute -right-8 -bottom-10 h-36 w-36 rounded-full border-[10px] border-white/15 bg-white/10" />
        </div>
        <div className="max-h-[min(70vh,36rem)] overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function itemTitle(item: Record<string, unknown>, title: string) {
  return String(
    item.title ?? item.name ?? item.year ?? item.email ?? `${title} item`,
  );
}

function SectionManager({
  title,
  items,
  fields,
  onCreate,
  onUpdate,
  onDelete,
  transformCreate,
  transformUpdate,
  extraCreateFields,
  renderItemMeta,
}: {
  title: string;
  items: Array<Record<string, unknown>>;
  fields: Field[];
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
  onUpdate: (id: string, payload: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string, label: string) => void;
  transformCreate?: (
    form: Record<string, FormDataEntryValue>,
  ) => Record<string, unknown>;
  transformUpdate?: (
    form: Record<string, FormDataEntryValue>,
  ) => Record<string, unknown>;
  extraCreateFields?: ReactNode;
  renderItemMeta?: (item: Record<string, unknown>) => string;
}) {
  const [mode, setMode] = useState<"closed" | "create" | "edit">("closed");
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);

  function closePanel() {
    setMode("closed");
    setEditing(null);
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      const form = Object.fromEntries(new FormData(event.currentTarget));
      await onCreate(transformCreate ? transformCreate(form) : form);
      event.currentTarget.reset();
      closePanel();
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const form = Object.fromEntries(new FormData(event.currentTarget));
      await onUpdate(
        String(editing.id),
        transformUpdate ? transformUpdate(form) : form,
      );
      closePanel();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-zinc-900">{title}</h2>
          <p className="text-sm text-zinc-500">
            {items.length} item{items.length === 1 ? "" : "s"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setMode("create");
          }}
          className={primaryBtnClass}
        >
          + Add {title}
        </button>
      </div>

      <div className="grid gap-3">
        {items.length === 0 ? (
          <div className={`${cardClass} text-sm text-zinc-500`}>
            No {title.toLowerCase()} yet. Use Add to create one.
          </div>
        ) : (
          items.map((item) => (
            <article
              key={String(item.id)}
              className={`${cardClass} flex flex-wrap items-start justify-between gap-3`}
            >
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900">
                  {itemTitle(item, title)}
                </p>
                {renderItemMeta ? (
                  <p className="mt-1 text-xs text-zinc-500">
                    {renderItemMeta(item)}
                  </p>
                ) : item.description || item.summary || item.quote ? (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                    {String(
                      item.description ?? item.summary ?? item.quote ?? "",
                    )}
                  </p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={ghostBtnClass}
                  onClick={() => {
                    setEditing(item);
                    setMode("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={dangerBtnClass}
                  onClick={() =>
                    onDelete(String(item.id), itemTitle(item, title))
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <FormModal
        open={mode === "create"}
        title={`Add ${title}`}
        subtitle={`Create a new ${title.toLowerCase()} entry for your portfolio.`}
        onClose={closePanel}
      >
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleCreate}>
          {fields.map((field) => (
            <label
              key={field.name}
              className={`${labelClass} ${
                field.type === "textarea" ? "sm:col-span-2" : ""
              }`}
            >
              <span className={labelSpanClass}>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea name={field.name} rows={4} className={inputClass} />
              ) : (
                <input
                  name={field.name}
                  type={field.type ?? "text"}
                  className={inputClass}
                />
              )}
            </label>
          ))}
          {extraCreateFields ? (
            <div className="sm:col-span-2">{extraCreateFields}</div>
          ) : null}
          <div className="flex flex-wrap gap-2 border-t border-zinc-200 pt-4 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className={`${primaryBtnClass} disabled:opacity-60`}
            >
              {saving ? "Creating…" : "Create"}
            </button>
            <button type="button" onClick={closePanel} className={ghostBtnClass}>
              Cancel
            </button>
          </div>
        </form>
      </FormModal>

      <FormModal
        open={mode === "edit" && !!editing}
        title={`Edit ${title}`}
        subtitle={`Update this ${title.toLowerCase()} entry.`}
        onClose={closePanel}
      >
        {editing ? (
          <form
            key={String(editing.id)}
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={handleUpdate}
          >
            {fields.map((field) => {
              const value =
                field.name === "tags" && Array.isArray(editing.tags)
                  ? editing.tags.join(", ")
                  : editing[field.name];

              return (
                <label
                  key={field.name}
                  className={`${labelClass} ${
                    field.type === "textarea" ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className={labelSpanClass}>{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={4}
                      defaultValue={String(value ?? "")}
                      className={inputClass}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type ?? "text"}
                      defaultValue={String(value ?? "")}
                      className={inputClass}
                    />
                  )}
                </label>
              );
            })}
            <div className="flex flex-wrap gap-2 border-t border-zinc-200 pt-4 sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className={`${primaryBtnClass} disabled:opacity-60`}
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={closePanel}
                className={ghostBtnClass}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </FormModal>
    </div>
  );
}
