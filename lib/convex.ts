import { ConvexHttpClient } from 'convex/browser';

const url = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!url) {
  // eslint-disable-next-line no-console
  console.warn('NEXT_PUBLIC_CONVEX_URL is missing. Convex requests will fail until configured.');
}

export const convex = new ConvexHttpClient(url ?? 'https://placeholder.convex.cloud');
