"use client";

import { useEffect, useRef } from "react";
import { Widget as CmsBlockWidget } from "@reactedge/widget-cmsblock";
import { useWidgetManifest } from "@/reactedge/hooks/useWidgetManifest";

export default function CmsBlockClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mounted = useRef(false);
    const manifest = useWidgetManifest("cmsblock");

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !manifest?.contract || mounted.current) {
            return;
        }

        mounted.current = true;
        CmsBlockWidget({
            container,
            contract: manifest.contract,
        });
    }, [manifest]);

    return <div ref={containerRef} />;
}
