"use client";
// src/components/CustomWidget.tsx
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, MessageCircle, StarIcon } from "lucide-react";
import tailwindStyles from "../index.css?inline";
import { toast } from "sonner";

export const CustomWidget = ({ projectid }: { projectid: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(3); // Default rating value
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("https://opinify.in/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feedback, rating, projectid }),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
      setLoading(false);
      toast.success("Feedback submitted successfully!");
    } else {
      toast.error(data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex fixed bottom-6 bg-black hover:bg-black/80 text-white right-6 gap-2 rounded-full z-[1000000000000]">
            Feedback
            <MessageCircle size={16} />
          </Button>
        </DialogTrigger>
        {submitted ? (
          <>
            <DialogContent className="md:max-w-[500px] max-w-[95vw] rounded-md ">
              <style>{tailwindStyles}</style>
              <DialogHeader>
                <DialogTitle className="mb-2">Feedback Submitted!</DialogTitle>
                <DialogDescription>
                  Thank you for sharing your feedback with us. We appreciate
                  your time and will use your input to improve our website.
                </DialogDescription>
              </DialogHeader>
              <p className="text-center my-3 text-sm text-black/70">
                Feature Implemented by{" "}
                <a href="#" className="font-bold text-black">
                  Opinify 🚀
                </a>
              </p>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogContent className="md:max-w-[500px] max-w-[95vw] rounded-md ">
              <style>{tailwindStyles}</style>
              <DialogHeader>
                <DialogTitle className="mb-2">Share Your Feedback</DialogTitle>
                <DialogDescription>
                  We value your input to help us improve our website. Please
                  take a moment to share your thoughts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name:</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback:</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts..."
                    className="min-h-[100px]"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Ratings:</Label>
                  <div className="flex items-center gap-2 hover:cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-primary"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button disabled={loading}>
                    <Loader size={16} className="animate-spin" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitted}
                    onClick={handleSubmit}
                  >
                    Submit Feedback
                  </Button>
                )}
              </DialogFooter>
              <p className="text-center my-3 text-sm text-black/70">
                Feature Implemented by{" "}
                <a
                  href="https://opinify.in/"
                  target="_blank"
                  className="font-bold text-black"
                >
                  Opinify 🚀
                </a>
              </p>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};
