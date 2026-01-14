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
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent sm:text-5xl sm:tracking-tight lg:text-7xl font-orbitron mb-4">
                            Team Registration
                        </h1>
                        <div className="mx-auto h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mb-6"></div>
                        <p className="max-w-xl mx-auto text-xl text-gray-400">
                            Register your team for HackSavvy-26. Fill in the details below to secure your spot.
                        </p>
                    </div>

                    <RegistrationForm />
                </div>
            </div>
        </PremiumBackground>
    )
}
