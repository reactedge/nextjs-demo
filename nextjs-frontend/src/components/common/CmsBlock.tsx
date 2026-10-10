'use client';

import { useEffect, useRef } from "react";
import { useReactEdgeRuntimeConfig } from "@/reactedge/hooks/useReactEdgeRuntimeConfig";
import { useWidgetManifest } from "@/reactedge/hooks/useWidgetManifest";

export default function CmsBlock() {
    const cmsBlockRef = useRef<HTMLDivElement>(null);
    const mounted = useRef(false);
    const cmsBlockManifest = useWidgetManifest("cmsblock");
    const { runtime, identityReady } = useReactEdgeRuntimeConfig();

    useEffect(() => {
        const container = cmsBlockRef.current;
        if (!container || !cmsBlockManifest?.contract || !identityReady || mounted.current) {
            return;
        }

        let active = true;
        const mount = async () => {
            const { Widget: CmsBlockWidget } =
                await import("@reactedge/widget-cmsblock");

            if (!active || !container.isConnected || mounted.current) return;
            mounted.current = true;

            // Identity is presentation-only. Protected operations must be
            // authorised independently using the server-side session.
            CmsBlockWidget({
                container,
                contract: cmsBlockManifest.contract,
                runtime,
            });
        };

        void mount();
        return () => { active = false; };
        // Current widget API has no update/unmount method; only mount once.
    }, [cmsBlockManifest, runtime, identityReady]);

    return <div className="m-5">
        <div ref={cmsBlockRef} />
    </div>;
}
