"use client";

import { useEffect, useRef } from "react";
import { Widget as CmsBlockWidget } from "@reactedge/widget-cmsblock";
import { useWidgetManifest } from "@/reactedge/hooks/useWidgetManifest";

type Props = {
    ssrHtml: string;
    bootstrap?: unknown;
};

export function CmsBlockClient({
      ssrHtml,
      bootstrap,
  }: Props) {
    const widgetRef = useRef<HTMLDivElement>(null);
    const manifest = useWidgetManifest("cmsblock");

    useEffect(() => {
        if (
            !widgetRef.current ||
            !manifest?.contract
        ) {
            return;
        }

        CmsBlockWidget({
            container: widgetRef.current,
            contract: manifest.contract,
            bootstrap,
            hydrate: true
        });
    }, [manifest, bootstrap]);

    return (
        <div
            ref={widgetRef}
            dangerouslySetInnerHTML={{
                __html: ssrHtml,
            }}
        />
    );
}