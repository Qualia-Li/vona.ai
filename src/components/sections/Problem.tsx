'use client';

import { motion } from "framer-motion";

const stats = [
  { value: "90%", description: "of searches still happen on Google" },
  { value: "30%", description: "now include AI Overviews" },
  { value: "70%", description: "of AI Overviews cite YouTube" },
];

export const Problem = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-8 text-4xl font-bold text-gray-900">
            Search has changed. SEO hasn&apos;t.
          </h2>
          
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-4">Old SEO</h3>
                <div className="space-y-2">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-gray-200">
                <h3 className="text-xl font-semibold mb-4">New SEO</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">Users now ask full questions, not just keywords</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">AI provides comprehensive answers from multiple sources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 