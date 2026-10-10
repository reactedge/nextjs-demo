import CheckLogin from "@/components/auth/CheckLogin";
import CmsBlock from "@/components/reactedge/CmsBlock";

export default function CmsBlockPage() {
    return (
        <CheckLogin>
            <main className="m-5">
                <CmsBlock />
            </main>
        </CheckLogin>
    );
}
