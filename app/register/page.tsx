import RegistrationForm from '@/components/RegistrationForm'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PremiumBackground from '@/components/PremiumBackground'

export default async function RegisterPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <PremiumBackground>
            <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <div className="text-center mb-16 w-full max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-red-200 to-red-600 bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.4)] mb-6 font-[family-name:var(--font-orbitron)] uppercase">
                            Team Registration
                        </h1>
                        <div className="mx-auto h-1.5 w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full shadow-[0_0_15px_#dc2626] mb-8"></div>
                        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-lg mx-auto">
                            Register your team for <strong className="text-white font-bold">HackSavvy-26</strong>. 
                            Fill in the details below to secure your spot in the void.
                        </p>
                    </div>

                    <div className="w-full">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </PremiumBackground>
    )
}
