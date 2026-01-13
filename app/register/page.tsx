import RegistrationForm from '@/components/RegistrationForm'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl font-orbitron">
                        Team Registration
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-400">
                        Register your team for HackSavvy-26. Fill in the details below to secure your spot.
                    </p>
                </div>

                <RegistrationForm />
            </div>
        </div>
    )
}
