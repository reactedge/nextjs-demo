import CreateListingClient from "@/components/reactedge/CreateListingClient";

/**
 * CreateListing is CSR-only (SSR strategy: disabled).
 * Its widget injects CSS into a shadow root during the client mount.
 */
export default function CreateListing() {
    return <CreateListingClient />;
}
