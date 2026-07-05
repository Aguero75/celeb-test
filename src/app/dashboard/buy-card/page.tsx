"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";

export default function BuyCardPage() {
  const [giftCardNumber, setGiftCardNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) {
      setFile(accepted[0]);
      setPreview(URL.createObjectURL(accepted[0]));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!giftCardNumber.trim() || !file) {
      toast.error("Please fill in all fields and upload the gift card image.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("giftCardNumber", giftCardNumber);
      formData.append("giftCardImage", file);
      const res = await fetch("/api/fan-card/submit", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Submission failed");
      }
      setSubmitted(true);
      toast.success("Fan card request submitted! Admin will review shortly.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted)
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <AnimatedIcon
          animationData={lordiconAssets.check}
          size={56}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
        <p className="text-white/50">
          Admin will review your gift card and approve your membership within 24
          hours.
        </p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Buy Your <span className="gold-text">Fan Card</span>
        </h1>
        <p className="text-white/50">
          Pay using any gift card. Enter the card number and upload a clear
          photo for verification.
        </p>
      </div>
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gold/5 border border-gold/20">
          <AnimatedIcon animationData={lordiconAssets.card} size={20} />
          <div>
            <p className="font-semibold text-sm">30-Day Fan Membership</p>
            <p className="text-white/40 text-xs">
              Renew any time. One gift card = one 30-day card period.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Gift Card Number
            </label>
            <input
              type="text"
              value={giftCardNumber}
              onChange={(e) => setGiftCardNumber(e.target.value)}
              placeholder="Enter the gift card number"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 placeholder-white/30 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Upload Gift Card Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-gold bg-gold/5" : "border-white/10 hover:border-gold/40"}`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div>
                  <img
                    src={preview}
                    alt="Gift card preview"
                    className="max-h-48 mx-auto rounded-lg object-contain mb-2"
                  />
                  <p className="text-xs text-white/40">
                    {file?.name} — click or drag to change
                  </p>
                </div>
              ) : (
                <div>
                  <AnimatedIcon
                    animationData={lordiconAssets.upload}
                    size={28}
                    className="mx-auto mb-3"
                  />
                  <p className="text-sm font-medium">
                    Drag and drop your gift card image here
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    or click to browse — JPG, PNG, WEBP accepted
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full gold-btn py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <AnimatedIcon animationData={lordiconAssets.spark} size={18} />{" "}
                Submitting...
              </>
            ) : (
              "Submit for Approval"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
