"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { toast } from "sonner";
import { CameraIcon, Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Button } from "./ui/button";

const {
  imageKit: { publicKey, urlEndpoint },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.baseUrl}/api/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
    throw new Error("Authentication request failed: Unknown error");
  }
};

const FileUpload = ({
  onFileChange,
  folderName,
  value,
}: {
  onFileChange: (filePath: string) => void;
  folderName: string;
  value: string;
}) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(value ? { filePath: value } : null);
  const [uploading, setUploading] = useState(false);
  const onError = (error: { message: string }) => {
    console.log(error);
    toast.error("Image upload failed.", {
      style: { color: "red" },
    });
    setUploading(false);
  };
  const onSuccess = (res: IKUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath);
    toast("Image uploaded successfully.", {
      style: { color: "green" },
    });
    setUploading(false);
  };
  const onUploadStart = () => {
    setUploading(true);
  };
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        validateFile={(file) => file.size < 2000000}
        fileName="test-upload.png"
        folder={folderName}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          if (IKUploadRef.current) {
            IKUploadRef.current?.click();
          }
        }}
      >
        <CameraIcon />
        <p className="text-light-100 text-base">Upload a File</p>
        {file && <p className="truncate">{file.filePath}</p>}
      </Button>

      {uploading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-1 h-5 w-5 animate-spin" />
          <span className="text-sm">Uploading image...</span>
        </div>
      ) : (
        file && (
          <div className="relative h-[50vh] w-full md:h-[70vh]">
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              transformation={[{ quality: 90 }, { format: "webp" }, { aspectRatio: "16:9" }]}
              fill
              className="h-56 object-cover md:h-96 lg:h-[500px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
              priority
              loading="eager"
              onError={() =>
                toast.error("Image failed to load", {
                  style: { color: "red" },
                })
              }
            />
          </div>
        )
      )}
      {}
    </ImageKitProvider>
  );
};

export default FileUpload;
