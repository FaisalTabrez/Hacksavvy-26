'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, RegistrationFormValues } from '@/app/register/schema'
import { registerTeam } from '@/app/register/actions'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { updateTeamDetails } from '@/app/dashboard/actions'

const orbitron = Orbitron({ subsets: ["latin"], weight: ['400', '700', '900'], variable: '--font-orbitron' });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

interface RegistrationFormProps {
    initialData?: any
    isEditing?: boolean
    teamId?: string
    onCancel?: () => void
}

export default function RegistrationForm({ initialData, isEditing = false, teamId, onCancel }: RegistrationFormProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: initialData || { teamSize: '2', members: [{ accommodation: false, food: 'Veg' }, { accommodation: false, food: 'Veg' }] },
    })

    const { fields, replace } = useFieldArray({ control, name: 'members' })
    const teamSize = watch('teamSize')

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user && !isEditing) {
                setValue('members.0.email', user.email || '')
                setValue('members.0.name', user.user_metadata?.full_name || '')
            }
        }
        getUser()
    }, [setValue, isEditing])

    useEffect(() => {
        const size = parseInt(teamSize)
        const currentMembers = watch('members')
        if (currentMembers.length !== size) {
            const newMembers = [...currentMembers]
            if (newMembers.length < size) {
                for (let i = newMembers.length; i < size; i++) {
                    newMembers.push({ name: '', email: '', phone: '', college: '', accommodation: false, food: 'Veg' })
                }
            } else { newMembers.splice(size) }
            replace(newMembers)
        }
    }, [teamSize, replace, watch])

    const onSubmit = async (data: RegistrationFormValues) => {
        setIsSubmitting(true)
        setServerError(null)
        const formData = new FormData()
        
        formData.append('teamName', data.teamName)
        formData.append('track', data.track)
        formData.append('teamSize', data.teamSize)
        formData.append('upiReference', data.upiReference)

        if (data.paymentScreenshot && data.paymentScreenshot.length > 0) {
            let file = data.paymentScreenshot[0]
            if (file.type.startsWith('image/')) {
                try {
                    const imageCompression = (await import('browser-image-compression')).default;
                    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true }
                    const compressedFile = await imageCompression(file, options);
                    file = new File([compressedFile], file.name, { type: file.type });
                } catch (error) { console.error(error); }
            }
            formData.append('paymentScreenshot', file)
        }

        data.members.forEach((member, index) => {
            formData.append(`members.${index}.name`, member.name)
            formData.append(`members.${index}.email`, member.email)
            formData.append(`members.${index}.phone`, member.phone)
            formData.append(`members.${index}.college`, member.college)
            if (member.rollNo) formData.append(`members.${index}.rollNo`, member.rollNo)
            if (member.branch) formData.append(`members.${index}.branch`, member.branch)
            formData.append(`members.${index}.accommodation`, String(member.accommodation))
            formData.append(`members.${index}.food`, member.food)
        })

        let result;
        if (isEditing && teamId) {
            result = await updateTeamDetails(formData, teamId)
            if (result?.success) { window.location.reload(); return }
        } else { result = await registerTeam(formData) }

        if (result?.error) { setServerError(result.error); setIsSubmitting(false) }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // FIXED: Increased Top Padding (pt-32) so header isn't cut off
            className={cn("w-full min-h-screen pt-32 pb-32 px-4 md:px-8 max-w-6xl mx-auto", orbitron.variable, mono.variable)}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-16">
                
                {/* PAGE HEADER - SIZE REDUCED */}
                <div className="flex flex-col gap-2 border-l-2 border-red-600 pl-6">
                    <h1 className={cn(orbitron.className, "text-3xl md:text-4xl font-black text-white uppercase tracking-tighter")}>
                        {isEditing ? 'Modify Protocol' : 'Initialize Registration'}
                    </h1>
                    <p className={cn(mono.className, "text-xs text-neutral-500 uppercase tracking-[0.2em]")}>
                        Secure Channel // Sector 7 Access Grant
                    </p>
                </div>

                {serverError && (
                    <div className={cn(mono.className, "p-4 bg-red-950/30 border border-red-600 text-red-400 text-xs font-bold uppercase tracking-wide")}>
                        [SYSTEM ERROR]: {serverError}
                    </div>
                )}

                {/* --------------------------------------------------------- */}
                {/* SECTION 01: INFRASTRUCTURE */}
                {/* --------------------------------------------------------- */}
                <section className="space-y-8">
                    <div className="relative">
                        {/* REDUCED SUBHEADER SIZE: text-lg */}
                        <h2 className={cn(orbitron.className, "text-lg md:text-xl font-black text-red-600 uppercase tracking-widest z-10 relative")}>
                            01 // Infrastructure
                        </h2>
                        <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Team Name - COMPACT INPUTS */}
                        <div className="space-y-2">
                            <label className={cn(mono.className, "text-xs font-bold text-neutral-400 uppercase tracking-wider")}>
                                Identity Tag (Team Name)
                            </label>
                            <input
                                {...register('teamName')}
                                disabled={isEditing}
                                placeholder="ENTER_SQUAD_NAME"
                                // FIXED: Smaller padding (p-3) and text size (text-sm)
                                className={cn(mono.className, "w-full bg-black/40 border border-white/10 p-3 text-sm text-white placeholder:text-neutral-700 focus:border-red-600 focus:outline-none focus:bg-black/60 transition-all uppercase rounded-none")}
                            />
                            {errors.teamName && <span className="text-red-500 text-[10px] font-mono block mt-1">{errors.teamName.message}</span>}
                        </div>

                        {/* Track Selection */}
                        <div className="space-y-2">
                            <label className={cn(mono.className, "text-xs font-bold text-neutral-400 uppercase tracking-wider")}>
                                Operational Track
                            </label>
                            <div className="relative">
                                <select
                                    {...register('track')}
                                    className={cn(mono.className, "w-full bg-black/40 border border-white/10 p-3 text-sm text-white focus:border-red-600 focus:outline-none appearance-none cursor-pointer uppercase rounded-none")}
                                >
                                    <option value="AI" className="bg-black">AI, AUTOMATION & ROBOTICS</option>
                                    <option value="IoT" className="bg-black">IOT & EMBEDDED SYSTEMS</option>
                                    <option value="Blockchain" className="bg-black">CYBERSECURITY & BLOCKCHAIN</option>
                                    <option value="Open Innovation" className="bg-black">OPEN INNOVATION</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-red-600 text-xs">▼</div>
                            </div>
                        </div>
                    </div>

                    {/* Team Size */}
                    <div className="space-y-2">
                        <label className={cn(mono.className, "text-xs font-bold text-neutral-400 uppercase tracking-wider")}>
                            Squad Magnitude
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {['2', '3', '4', '5'].map((size) => (
                                <label key={size} className="cursor-pointer relative group">
                                    <input type="radio" value={size} {...register('teamSize')} className="peer sr-only" />
                                    <div className={cn(mono.className, "w-16 h-10 flex items-center justify-center text-sm font-bold bg-black/40 border border-white/10 text-neutral-600 hover:border-white/40 peer-checked:bg-red-600 peer-checked:border-red-600 peer-checked:text-white transition-all rounded-none")}>
                                        {size}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* SECTION 02: PERSONNEL MANIFEST */}
                {/* --------------------------------------------------------- */}
                <section className="space-y-8">
                     <div className="relative">
                        <h2 className={cn(orbitron.className, "text-lg md:text-xl font-black text-red-600 uppercase tracking-widest z-10 relative")}>
                            02 // Personnel Manifest
                        </h2>
                        <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {fields.map((field, index) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                // FIXED: Sharp corners (rounded-none) to prevent clipping
                                className="relative bg-black/20 border-l-2 border-white/10 p-6 md:p-8 hover:border-red-600 hover:bg-black/30 transition-all group rounded-none"
                            >
                                <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 border-b border-l border-white/10 text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                                    {index === 0 ? 'Project_Lead' : `Operative_0${index + 1}`}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <label className={cn(mono.className, "text-[10px] font-bold text-red-500/70 uppercase tracking-wider")}>Legal Name</label>
                                        <input
                                            {...register(`members.${index}.name`)}
                                            placeholder="FULL NAME"
                                            className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none transition-colors uppercase")}
                                        />
                                        {errors.members?.[index]?.name && <span className="text-red-500 text-[10px] block">{errors.members[index]?.name?.message}</span>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1">
                                        <label className={cn(mono.className, "text-[10px] font-bold text-red-500/70 uppercase tracking-wider")}>Comm Channel</label>
                                        <input
                                            {...register(`members.${index}.email`)}
                                            readOnly={index === 0 && !!user}
                                            placeholder="EMAIL ADDRESS"
                                            className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none transition-colors", index === 0 && user && "text-neutral-500")}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-1">
                                        <label className={cn(mono.className, "text-[10px] font-bold text-red-500/70 uppercase tracking-wider")}>Signal ID (Mobile)</label>
                                        <input
                                            {...register(`members.${index}.phone`)}
                                            placeholder="+91 XXXXX XXXXX"
                                            className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none transition-colors")}
                                        />
                                    </div>

                                    {/* College */}
                                    <div className="space-y-1">
                                        <label className={cn(mono.className, "text-[10px] font-bold text-red-500/70 uppercase tracking-wider")}>Institution</label>
                                        <input
                                            {...register(`members.${index}.college`)}
                                            placeholder="COLLEGE NAME"
                                            className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none transition-colors uppercase")}
                                        />
                                    </div>

                                    {/* Leader Specifics */}
                                    {index === 0 && (
                                        <>
                                            <div className="space-y-1">
                                                 <label className={cn(mono.className, "text-[10px] font-bold text-red-500/70 uppercase tracking-wider")}>ID Code (Roll No)</label>
                                                <input {...register(`members.${index}.rollNo`)} placeholder="ROLL NUMBER" className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none uppercase")} />
                                            </div>
                                            <div className="space-y-1">
                                                 <label className={cn(mono.className, "text-[10px] font-bold text-red-500/70 uppercase tracking-wider")}>Department</label>
                                                <input {...register(`members.${index}.branch`)} placeholder="BRANCH" className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none uppercase")} />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Logistics Toggles */}
                                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-6 items-center">
                                    <label className="flex items-center gap-3 cursor-pointer group/accom">
                                        <div className="relative">
                                            <input type="checkbox" {...register(`members.${index}.accommodation`)} className="peer sr-only" />
                                            <div className="w-8 h-4 bg-black border border-white/20 peer-checked:border-red-600 peer-checked:bg-red-600/20 transition-all"></div>
                                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white/30 peer-checked:bg-red-600 peer-checked:translate-x-4 transition-all"></div>
                                        </div>
                                        <span className={cn(mono.className, "text-[10px] font-bold text-neutral-400 group-hover/accom:text-white uppercase tracking-widest")}>Accommodation Req</span>
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <span className={cn(mono.className, "text-[10px] font-bold text-neutral-500 uppercase tracking-widest")}>Rations:</span>
                                        <div className="flex gap-2">
                                            {['Veg', 'Non-Veg'].map((opt) => (
                                                <label key={opt} className="cursor-pointer">
                                                    <input type="radio" value={opt} {...register(`members.${index}.food`)} className="peer sr-only" />
                                                    <span className={cn(mono.className, "px-3 py-1 border border-white/10 text-[10px] text-neutral-500 peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600 uppercase font-bold transition-all")}>
                                                        {opt}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* SECTION 03: TRANSACTION NODE */}
                {/* --------------------------------------------------------- */}
                <section className="space-y-8">
                     <div className="relative">
                        <h2 className={cn(orbitron.className, "text-lg md:text-xl font-black text-red-600 uppercase tracking-widest z-10 relative")}>
                            03 // Transaction Node
                        </h2>
                        <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></div>
                    </div>

                    <div className="bg-zinc-950 border border-white/10 p-6 md:p-8 relative overflow-hidden rounded-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-3xl pointer-events-none"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                            {/* Payment Info */}
                            <div className="space-y-6">
                                <div className="p-4 bg-red-950/20 border-l-2 border-red-600">
                                    <p className={cn(mono.className, "text-xs font-bold text-red-200 uppercase tracking-widest mb-1")}>Transfer Protocol:</p>
                                    <p className={cn(orbitron.className, "text-2xl text-white font-black")}>₹2500.00</p>
                                    <p className={cn(mono.className, "text-[10px] text-red-400 mt-1 uppercase font-bold")}>Dest: MGIT_HACKATHON_CORP</p>
                                </div>

                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-xs font-bold text-neutral-400 uppercase tracking-wider")}>
                                        UPI Reference ID (12-Digit)
                                    </label>
                                    <input
                                        {...register('upiReference')}
                                        disabled={isEditing}
                                        placeholder="XXXXXXXXXXXX"
                                        className={cn(mono.className, "w-full bg-black border border-white/10 p-3 text-base text-white placeholder:text-neutral-800 focus:border-red-600 focus:outline-none tracking-[0.2em] transition-all rounded-none")}
                                    />
                                    {errors.upiReference && <span className="text-red-500 text-[10px] font-mono block mt-1">Error: {errors.upiReference.message}</span>}
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-xs font-bold text-neutral-400 uppercase tracking-wider")}>
                                    Proof of Transfer (Screenshot)
                                </label>
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 bg-black/20 hover:bg-white/5 hover:border-red-600 cursor-pointer transition-all group rounded-none">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4 w-full overflow-hidden">
                                        <svg className="w-8 h-8 text-neutral-600 group-hover:text-red-500 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        <p className={cn(mono.className, "text-[10px] text-neutral-400 uppercase tracking-widest group-hover:text-white font-bold")}>
                                            <span className="text-red-500">Click</span> / Drop File
                                        </p>
                                        
                                        {/* Truncated File Name Display */}
                                        <div className="max-w-[200px] mt-2 bg-black/50 px-2 py-0.5 border border-white/10">
                                            <p className={cn(mono.className, "text-[9px] text-neutral-500 truncate")}>
                                                {watch('paymentScreenshot')?.[0]?.name || 'NO_DATA'}
                                            </p>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" {...register('paymentScreenshot')} disabled={isEditing} className="hidden" />
                                </label>
                                {errors.paymentScreenshot && <span className="text-red-500 text-[10px] font-mono block mt-1">Error: {errors.paymentScreenshot.message as string}</span>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --------------------------------------------------------- */}
                {/* FINAL ACTION */}
                {/* --------------------------------------------------------- */}
                <div className="pt-8 pb-24 flex gap-4">
                    {isEditing && onCancel && (
                        <button 
                            type="button" 
                            onClick={onCancel} 
                            className={cn(mono.className, "px-8 py-4 border border-white/10 text-neutral-400 hover:text-white hover:border-white uppercase tracking-[0.2em] font-bold transition-all text-xs rounded-none")}
                        >
                            Abort
                        </button>
                    )}
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        // REDUCED BUTTON SIZE: text-lg, py-4
                        className={cn(orbitron.className, "flex-1 bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl font-black py-4 uppercase tracking-[0.1em] transition-all hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:cursor-not-allowed clip-path-polygon rounded-none")}
                    >
                        {isSubmitting ? 'PROCESSING...' : (isEditing ? 'COMMIT' : 'EXECUTE REGISTRATION')}
                    </button>
                </div>

            </form>
        </motion.div>
    )
}

