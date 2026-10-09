"use client";

import {useEffect, useRef, useState} from "react";
import {useWidgetManifest} from "@/reactedge/hooks/useWidgetManifest";
import {useReactEdgeRuntimeConfig} from "@/reactedge/hooks/useReactEdgeRuntimeConfig";

/**
 * Mounts the CreateListing artifact with the current session's presentation-only
 * identity context. Server-side listing operations must independently authorise.
 */
export default function CreateListingClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mounted = useRef(false);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const manifest = useWidgetManifest("createlisting");
    const {runtime, identityReady} = useReactEdgeRuntimeConfig();

    useEffect(() => {
        if (manifest && !manifest.contract) {
            setError("The CreateListing manifest is missing its widget contract.");
            return;
        }

        const container = containerRef.current;
        if (!container || !manifest?.contract || !identityReady || mounted.current) return;

        let active = true;
        const mount = async () => {
            try {
                const {Widget} = await import("@reactedge/widget-createlisting");
                if (!active || !container.isConnected || mounted.current) return;

                mounted.current = true;
                // SSR is disabled for this artifact: render rather than hydrate.
                Widget({container, contract: manifest.contract, runtime});
                setReady(true);
            } catch (cause) {
                if (active) {
                    console.error("Failed to mount CreateListing", cause);
                    setError("Unable to load the seller listing widget.");
                }
            }
        };

        void mount();
        return () => { active = false; };
        // Current widget API has no unmount/update method. Do not mount twice
        // if Next.js refreshes access while this page is already displayed.
    }, [manifest, identityReady, runtime]);

    return (
        <div className="m-5">
            {error ? <p role="alert">{error}</p> : null}
            {!ready && !error ? <p>Loading seller listing…</p> : null}
            <div ref={containerRef} />
        </div>
    );
}
