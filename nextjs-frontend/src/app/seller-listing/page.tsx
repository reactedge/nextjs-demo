import CheckLogin from "@/components/auth/CheckLogin";
import AccessCheckCard from "@/components/common/AccessCheckCard";

export default function SellerListingPage() {
    return <CheckLogin>
            <AccessCheckCard />
        </CheckLogin>
}