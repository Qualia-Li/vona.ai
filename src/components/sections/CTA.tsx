'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const CTA = () => {
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Thanks for your interest! We'll be in touch soon.");
      setEmail('');
      setUseCase('');
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="py-24 bg-gray-900 text-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to be discovered by AI?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join the early access list and be among the first to optimize your content for AI search engines.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your use case (e.g. eCommerce, SaaS, Personal Brand)"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full p-4 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                rows={4}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Request Early Access"}
            </Button>
          </form>

          <div className="mt-8 text-sm text-gray-400">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 