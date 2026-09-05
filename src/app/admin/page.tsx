"use client";

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

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Header · Footer · Contact" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "journey", label: "Journey" },
  { id: "messages", label: "Messages" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [content, setContent] = useState<ContentState>(emptyContent);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

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

  async function deleteItem(endpoint: string) {
    if (!confirm("Delete this item?")) return;
    const response = await fetch(endpoint, { method: "DELETE" });
    setStatus(response.ok ? "Deleted." : "Delete failed.");
    await load();
  }

  if (loading) {
    return <p className="text-zinc-400">Loading admin…</p>;
  }

  const profile = content.profile ?? {};

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Content dashboard</h1>
          <p className="text-sm text-zinc-400">
            Header, footer & contact live under the first tab. Messages is the
            contact inbox.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm"
        >
          Log out
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              tab === item.id
                ? "bg-white text-black"
                : "border border-zinc-700 text-zinc-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {status ? <p className="mb-4 text-sm text-emerald-400">{status}</p> : null}

      {tab === "profile" ? (
        <form
          onSubmit={saveProfile}
          className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <h2 className="text-lg font-semibold">Header · Footer · Contact</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Name shows in the header & footer. Email / GitHub / LinkedIn power
              the contact section and footer social links.
            </p>
          </div>

          <p className="sm:col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Header & hero
          </p>
          {(
            [
              ["name", "Name (header / footer)"],
              ["title", "Title (hero)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="grid gap-1 text-sm">
              <span className="text-zinc-400">{label}</span>
              <input
                name={key}
                defaultValue={String(profile[key] ?? "")}
                className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
              />
            </label>
          ))}
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="text-zinc-400">Bio (hero)</span>
            <textarea
              name="bio"
              rows={4}
              defaultValue={String(profile.bio ?? "")}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>

          <p className="sm:col-span-2 mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            About page
          </p>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="text-zinc-400">
              Photo URL (PNG / JPG / WEBP / SVG — local like /me.png or any https
              image link)
            </span>
            <input
              name="photoUrl"
              placeholder="https://…/photo.png or /me.png"
              defaultValue={String(profile.photoUrl ?? "")}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="text-zinc-400">
              About text (background — separate paragraphs with a blank line)
            </span>
            <textarea
              name="about"
              rows={8}
              defaultValue={String(profile.about ?? "")}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>

          <p className="sm:col-span-2 mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
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
            <label key={key} className="grid gap-1 text-sm">
              <span className="text-zinc-400">{label}</span>
              <input
                name={key}
                defaultValue={String(profile[key] ?? "")}
                className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
              />
            </label>
          ))}
          <button
            type="submit"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black sm:col-span-2"
          >
            Save header · footer · contact
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
          onUpdate={(id, payload) => updateItem(`/api/services/${id}`, payload)}
          onDelete={(id) => deleteItem(`/api/services/${id}`)}
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
          onUpdate={(id, payload) => updateItem(`/api/skills/${id}`, payload)}
          onDelete={(id) => deleteItem(`/api/skills/${id}`)}
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
            { name: "description", label: "Description", type: "textarea" },
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
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" />
              Featured
            </label>
          }
          renderItemMeta={(item) =>
            Array.isArray(item.tags) ? String(item.tags.join(", ")) : ""
          }
          onCreate={(payload) => createItem("/api/projects", payload)}
          onUpdate={(id, payload) => updateItem(`/api/projects/${id}`, payload)}
          onDelete={(id) => deleteItem(`/api/projects/${id}`)}
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
          onCreate={(payload) => createItem("/api/testimonials", payload)}
          onUpdate={(id, payload) =>
            updateItem(`/api/testimonials/${id}`, payload)
          }
          onDelete={(id) => deleteItem(`/api/testimonials/${id}`)}
        />
      ) : null}

      {tab === "journey" ? (
        <SectionManager
          title="Journey"
          items={content.journey}
          fields={[
            { name: "year", label: "Year" },
            { name: "title", label: "Title" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "location", label: "Location" },
            { name: "tag", label: "Tag" },
            { name: "order", label: "Order", type: "number" },
          ]}
          onCreate={(payload) => createItem("/api/journey", payload)}
          onUpdate={(id, payload) => updateItem(`/api/journey/${id}`, payload)}
          onDelete={(id) => deleteItem(`/api/journey/${id}`)}
        />
      ) : null}

      {tab === "messages" ? (
        <div className="grid gap-3">
          {content.messages.length === 0 ? (
            <p className="text-sm text-zinc-400">No messages yet.</p>
          ) : (
            content.messages.map((message) => (
              <article
                key={String(message.id)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">
                      {String(message.name)} · {String(message.email)}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {message.subject ? String(message.subject) : "No subject"} ·{" "}
                      {new Date(String(message.createdAt)).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-zinc-700 px-2 py-1 text-xs"
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
                      className="rounded-md border border-red-800 px-2 py-1 text-xs text-red-300"
                      onClick={() => deleteItem(`/api/messages/${message.id}`)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{String(message.body)}</p>
              </article>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number";
};

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
  onDelete: (id: string) => Promise<void>;
  transformCreate?: (
    form: Record<string, FormDataEntryValue>,
  ) => Record<string, unknown>;
  transformUpdate?: (
    form: Record<string, FormDataEntryValue>,
  ) => Record<string, unknown>;
  extraCreateFields?: ReactNode;
  renderItemMeta?: (item: Record<string, unknown>) => string;
}) {
  return (
    <div className="grid gap-6">
      <form
        className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = Object.fromEntries(new FormData(event.currentTarget));
          await onCreate(transformCreate ? transformCreate(form) : form);
          event.currentTarget.reset();
        }}
      >
        <h2 className="sm:col-span-2 text-lg font-semibold">Add {title}</h2>
        {fields.map((field) => (
          <label key={field.name} className="grid gap-1 text-sm">
            <span className="text-zinc-400">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows={3}
                className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
              />
            ) : (
              <input
                name={field.name}
                type={field.type ?? "text"}
                className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
              />
            )}
          </label>
        ))}
        {extraCreateFields}
        <button
          type="submit"
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black sm:col-span-2"
        >
          Create
        </button>
      </form>

      <div className="grid gap-3">
        {items.map((item) => (
          <form
            key={String(item.id)}
            className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:grid-cols-2"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = Object.fromEntries(new FormData(event.currentTarget));
              await onUpdate(
                String(item.id),
                transformUpdate ? transformUpdate(form) : form,
              );
            }}
          >
            {fields.map((field) => {
              const value =
                field.name === "tags" && Array.isArray(item.tags)
                  ? item.tags.join(", ")
                  : item[field.name];

              return (
                <label key={field.name} className="grid gap-1 text-sm">
                  <span className="text-zinc-400">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={3}
                      defaultValue={String(value ?? "")}
                      className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type ?? "text"}
                      defaultValue={String(value ?? "")}
                      className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                    />
                  )}
                </label>
              );
            })}
            {renderItemMeta ? (
              <p className="text-xs text-zinc-500 sm:col-span-2">
                {renderItemMeta(item)}
              </p>
            ) : null}
            <div className="flex gap-2 sm:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => onDelete(String(item.id))}
                className="rounded-md border border-red-800 px-3 py-1.5 text-sm text-red-300"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
