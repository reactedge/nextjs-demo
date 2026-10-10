import { NextResponse } from "next/server";

type PublishedRevision = {
    html: string;
    css: string;
    revision: number;
};

export async function GET() {
    const serviceUrl = (
        process.env.CMSBLOCK_SERVICE_URL ??
        process.env.VITE_CMSBLOCK_URL ??
        "http://127.0.0.1:4190"
    ).replace(/\\/+$/, "");

    try {
        const response = await fetch(
            `${serviceUrl}/cmsblock/blocks/demo`,
            { cache: "no-store" }
        );

        if (response.status === 404) {
            return NextResponse.json({ published: null }, {
                headers: { "Cache-Control": "no-store" },
            });
        }

        if (!response.ok) {
            return NextResponse.json(
                { error: "CMSBlock service request failed." },
                { status: 502, headers: { "Cache-Control": "no-store" } }
            );
        }

        const record: unknown = await response.json();
        if (
            typeof record !== "object" ||
            record === null ||
            !("published" in record)
        ) {
            return NextResponse.json(
                { error: "CMSBlock service returned an invalid record." },
                { status: 502, headers: { "Cache-Control": "no-store" } }
            );
        }

        const published = record.published as PublishedRevision | null;
        if (
            published !== null &&
            (
                typeof published !== "object" ||
                typeof published.html !== "string" ||
                typeof published.css !== "string" ||
                typeof published.revision !== "number"
            )
        ) {
            return NextResponse.json(
                { error: "CMSBlock service returned an invalid published revision." },
                { status: 502, headers: { "Cache-Control": "no-store" } }
            );
        }

        return NextResponse.json({ published }, {
            headers: { "Cache-Control": "no-store" },
        });
    } catch {
        return NextResponse.json(
            { error: "Cannot reach the CMSBlock service." },
            { status: 503, headers: { "Cache-Control": "no-store" } }
        );
    }
}
