"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { UploadFolder } from "@/lib/save-upload";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  folder: UploadFolder;
  defaultValue?: string;
  inputClass: string;
  labelClass: string;
  labelSpanClass: string;
  className?: string;
};

export function ImageUploadField({
  name,
  label,
  folder,
  defaultValue = "",
  inputClass,
  labelClass,
  labelSpanClass,
  className = "",
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUrl(defaultValue);
  }, [defaultValue]);

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUrl(String(data.url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className={`grid gap-2 ${className}`}>
      <label className={labelClass}>
        <span className={labelSpanClass}>{label}</span>
        <input
          name={name}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="/uploads/… or https://…"
          className={inputClass}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
          {uploading ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="sr-only"
            disabled={uploading}
            onChange={onFileChange}
          />
        </label>
        {url ? (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-800"
          >
            Clear
          </button>
        ) : null}
      </div>

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="h-28 w-auto max-w-full rounded-xl border border-zinc-200 object-contain"
        />
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
