import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, FileText, UploadCloud, Loader2 } from "lucide-react";
import { useUploadFile } from "@/features/admin/assistants/api/use-upload-file";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];

function getFileIcon() {
  return <FileText className="size-5 text-blue-400" />;
}

// Placeholder bucket name

export function FileUploader({ bucket }: { bucket: string }) {
  const [files, setFiles] = useState<any[]>([]); // Store uploaded file info from API
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Upload files to API
  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    setUploading(true);
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!ACCEPTED_TYPES.includes(file.type)) continue;
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(`https://api.solvus.io/upload/${bucket}`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setFiles((prev) => [...prev, data]);
      } catch (err) {
        // Optionally show error toast
        console.error("Upload error", err);
      }
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  // Delete file from API and remove from list
  const handleDelete = async (etag: string) => {
    setUploading(true);
    try {
      await fetch(`https://api.solvus.io/delete/${bucket}/${etag}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setFiles((prev) => prev.filter((f) => f.etag !== etag));
    } catch (err) {
      // Optionally show error toast
      console.error("Delete error", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Envio de documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center mb-4 transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-200"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{ cursor: "pointer" }}
        >
          {uploading ? (
            <Loader2 className="size-10 text-blue-400 mb-2 animate-spin" />
          ) : (
            <UploadCloud className="size-10 text-blue-400 mb-2" />
          )}
          <span className="text-sm text-gray-700 text-center">
            <b>Clique para fazer o upload</b> ou segure e solte
            <br />
            <span className="text-xs text-gray-400">PDF, DOCX, DOC ou TXT</span>
          </span>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </div>
        <div className="flex flex-col gap-2">
          {files.map((file, idx) => (
            <div
              key={file.etag || file.name || idx}
              className="flex items-center bg-blue-50 rounded px-2 py-1 justify-between"
            >
              <div className="flex items-center gap-2">
                {getFileIcon()}
                <span className="text-sm text-gray-800 truncate max-w-[200px]">
                  {file.file_name || file.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-100"
                onClick={() => handleDelete(file.etag)}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
