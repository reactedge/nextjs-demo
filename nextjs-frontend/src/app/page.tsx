import {ReactEdgeIntro} from "@/components/Intro";
import SiteHeader from "@/components/common/SiteHeader";
import Main from "@/components/common/Main";
import CmsBlockPublished from "@/components/reactedge/CmsBlockPublished";

export default async function Page() {
    return (
        <>
            <SiteHeader />
            <Main>
                <ReactEdgeIntro />
                <CmsBlockPublished />
            </Main>
        </>
    );
}