import CheckLogin from "@/components/auth/CheckLogin";
import CreateListing from "@/components/reactedge/CreateListing";

export default function SellerListingPage() {
    return (
        <CheckLogin>
            <CreateListing />
        </CheckLogin>
    );
}
