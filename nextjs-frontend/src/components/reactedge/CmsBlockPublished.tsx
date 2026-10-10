"use client";

import { useEffect, useState } from "react";

type PublishedRevision = {
    html: string;
    css: string;
    revision: number;
};

type PublishedResponse = {
    published: PublishedRevision | null;
};

function toDocument(revision: PublishedRevision) {
    return `<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${revision.css}</style>
</head>
<body style="margin:0">${revision.html}</body>
</html>`;
}

export default function CmsBlockPublished() {
    const [published, setPublished] = useState<PublishedRevision | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        fetch("/api/cmsblock/published", { cache: "no-store" })
            .then(async response => {
                if (!response.ok) {
                    throw new Error("The published CMS block is temporarily unavailable.");
                }
                return response.json() as Promise<PublishedResponse>;
            })
            .then(data => {
                if (active) setPublished(data.published);
            })
            .catch(reason => {
                if (active) {
                    setError(reason instanceof Error
                        ? reason.message
                        : "The published CMS block is temporarily unavailable.");
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, []);

    return (
        <section aria-labelledby="cmsblock-home-title" className="border-t px-6 py-8">
            <h2 id="cmsblock-home-title" className="mb-4 text-2xl font-semibold">
                CMS block
            </h2>
            {loading && <p role="status">Loading published content…</p>}
            {!loading && error && <p role="status">{error}</p>}
            {!loading && !error && !published && (
                <p role="status">The published CMS block is temporarily unavailable.</p>
            )}
            {published && (
                <iframe
                    title={`Published CMS block, revision ${published.revision}`}
                    className="block min-h-[28rem] w-full border-0"
                    sandbox=""
                    referrerPolicy="no-referrer"
                    srcDoc={toDocument(published)}
                />
            )}
        </section>
    );
}
