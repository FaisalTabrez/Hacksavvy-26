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
                    <div className="text-center mb-24 w-full max-w-3xl">
                        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-red-200 to-red-600 bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_25px_rgba(220,38,38,0.5)] mb-8 font-[family-name:var(--font-orbitron)] uppercase leading-tight">
                            Team Registration
                        </h1>
                        <div className="mx-auto h-1.5 w-60 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full shadow-[0_0_15px_#dc2626] mb-12"></div>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
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
