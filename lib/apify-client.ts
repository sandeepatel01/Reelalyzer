import { ApifyClient } from "apify-client";

let apifyClient: ApifyClient | null = null;

export const getApifyClient = () => {
  if (!apifyClient) {
    const token = process.env.NEXT_PUBLIC_APIFY_TOKEN;
    if (!token) throw new Error("Apify token not configured");

    apifyClient = new ApifyClient({ token });
  }
  return apifyClient;
};

export const analyzeReel = async (reelUrl: string) => {
  const client = getApifyClient();
  const actor = process.env.NEXT_PUBLIC_APIFY_ACTOR;

  if (!actor) throw new Error("Apify actor not configured");

  const run = await client.actor(actor).call({
    startUrls: [{ url: reelUrl }],
    maxPostComments: 20,
    resultsLimit: 1,
    proxyConfiguration: {
      useApifyProxy: true,
      apifyProxyGroups: ["RESIDENTIAL"],
    },
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  return items[0] as unknown; // Raw data
};
