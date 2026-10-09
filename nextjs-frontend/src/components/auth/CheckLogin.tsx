'use client';

import { useRouter } from 'next/navigation';
import { loginUrlForCurrentPage } from '@/lib/loginReturnTo';
import { useUserState } from '@/state/UserState';
import AccessCheckCard from '@/components/common/AccessCheckCard';
import { type ReactNode, useEffect } from 'react';

type GateLoginProps = {
    children: ReactNode;
};

export default function CheckLogin({ children }: GateLoginProps) {
    const { user } = useUserState();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.replace(loginUrlForCurrentPage());
        }
    }, [user, router]);

    // The spinner belongs to the unresolved session state, not the page content.
    if (user === undefined) return <AccessCheckCard />;
    if (user === null) return null;

    return <>{children}</>;
}
