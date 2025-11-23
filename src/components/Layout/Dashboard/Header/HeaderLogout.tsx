'use client'

import { useLogoutMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/utils/lib'

export default function HeaderLogout({ children }: { children: React.ReactNode }) {
    const logoutMutation = useLogoutMutation()
    const router = useRouter()

    const logout = async () => {
    if (logoutMutation.isPending) return
        try {
            await logoutMutation.mutateAsync()
            router.push('/')
        } catch (error: any) {
            handleErrorApi({
                error
            })
        }
    }

    return (
        <div onClick={logout} onKeyDown={logout} role="button" tabIndex={0}>
            {children}
        </div>
    )
}
