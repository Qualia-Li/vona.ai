import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFaviconUrl = (url: string): string => {
  try {
    const domain = new URL(url).hostname;

    // Try multiple favicon services in order of quality
    const faviconUrls = [
      // DuckDuckGo's service (often higher quality)
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      // Google's service as fallback
      `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      // Direct favicon.ico approach
      `https://${domain}/favicon.ico`,
    ];

    // Use the first working URL
    return faviconUrls[0]; // You could implement actual checking if needed
  } catch (error) {
    console.warn(`Failed to get favicon for ${url}:`, error);
    // Return a default favicon URL or null
    return "/default-favicon.png"; // Ensure you have a default favicon in your public folder
  }
};