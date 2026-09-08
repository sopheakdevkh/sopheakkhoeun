import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { UploadFolder } from "@/lib/save-upload";

export type AdminField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "image";
  uploadFolder?: UploadFolder;
};

type AdminFormFieldProps = {
  field: AdminField;
  value?: string;
  inputClass: string;
  labelClass: string;
  labelSpanClass: string;
};

export function AdminFormField({
  field,
  value = "",
  inputClass,
  labelClass,
  labelSpanClass,
}: AdminFormFieldProps) {
  const spanClass =
    field.type === "textarea" || field.type === "image" ? "sm:col-span-2" : "";

  if (field.type === "image" && field.uploadFolder) {
    return (
      <ImageUploadField
        name={field.name}
        label={field.label}
        folder={field.uploadFolder}
        defaultValue={value}
        inputClass={inputClass}
        labelClass={labelClass}
        labelSpanClass={labelSpanClass}
        className={spanClass}
      />
    );
  }

  return (
    <label className={`${labelClass} ${spanClass}`}>
      <span className={labelSpanClass}>{field.label}</span>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          rows={4}
          defaultValue={value}
          className={inputClass}
        />
      ) : (
        <input
          name={field.name}
          type={field.type ?? "text"}
          defaultValue={value}
          className={inputClass}
        />
      )}
    </label>
  );
}
