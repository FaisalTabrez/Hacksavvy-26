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

// Font Configurations
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

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: initialData || {
            teamSize: '2',
            members: [
                { accommodation: false, food: 'Veg' },
                { accommodation: false, food: 'Veg' },
            ],
        },
    })

    const { fields, replace } = useFieldArray({
        control,
        name: 'members',
    })

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
            } else {
                newMembers.splice(size)
            }
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
        } else {
            result = await registerTeam(formData)
        }

        if (result?.error) {
            setServerError(result.error)
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn("w-full max-w-5xl mx-auto h-full", orbitron.variable, mono.variable)}
        >
            {/* Main Container - The "Console" */}
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="relative flex flex-col w-full h-[85vh] bg-[#09090b] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
                {/* 1. Header Bar (Fixed) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-20">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
                        <h2 className={cn(orbitron.className, "text-lg font-bold text-white tracking-widest uppercase")}>
                            {isEditing ? 'Modify_Protocol' : 'Initialize_Registration'}
                        </h2>
                    </div>
                    <div className={cn(mono.className, "text-[10px] text-neutral-500 uppercase tracking-widest")}>
                        SECURE_CHANNEL_ESTABLISHED
                    </div>
                </div>

                {/* 2. Scrollable Content Area */}
                {/* Custom Scrollbar CSS applied via Tailwind arbitrary values */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 
                    scrollbar-thin scrollbar-track-black scrollbar-thumb-red-900 hover:scrollbar-thumb-red-600">
                    
                    {serverError && (
                        <div className={cn(mono.className, "p-4 bg-red-950/30 border-l-2 border-red-600 text-red-400 text-xs")}>
                            ERROR: {serverError}
                        </div>
                    )}

                    {/* SECTION 1: INFRASTRUCTURE */}
                    <div className="space-y-6">
                        <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                            <h3 className={cn(orbitron.className, "text-2xl text-white/90 uppercase tracking-wider")}>
                                01 // Infrastructure
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Team Name */}
                            <div className="space-y-2 group">
                                <label className={cn(mono.className, "text-[10px] text-red-500 uppercase tracking-widest group-focus-within:text-white transition-colors")}>
                                    Identity Tag
                                </label>
                                <input
                                    {...register('teamName')}
                                    disabled={isEditing}
                                    placeholder="ENTER_SQUAD_NAME"
                                    className={cn(mono.className, "w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm text-white placeholder:text-neutral-700 focus:bg-black focus:border-red-500 focus:outline-none transition-all")}
                                />
                                {errors.teamName && <span className="text-red-500 text-[10px]">{errors.teamName.message}</span>}
                            </div>

                            {/* Track Selection */}
                            <div className="space-y-2 group">
                                <label className={cn(mono.className, "text-[10px] text-red-500 uppercase tracking-widest group-focus-within:text-white transition-colors")}>
                                    Operational Track
                                </label>
                                <div className="relative">
                                    <select
                                        {...register('track')}
                                        className={cn(mono.className, "w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm text-white focus:bg-black focus:border-red-500 focus:outline-none appearance-none transition-all cursor-pointer")}
                                    >
                                        <option value="AI" className="bg-zinc-900">AI, AUTOMATION & ROBOTICS</option>
                                        <option value="IoT" className="bg-zinc-900">IOT & EMBEDDED SYSTEMS</option>
                                        <option value="Blockchain" className="bg-zinc-900">CYBERSECURITY & BLOCKCHAIN</option>
                                        <option value="Open Innovation" className="bg-zinc-900">OPEN INNOVATION</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                                </div>
                            </div>
                        </div>

                        {/* Team Size */}
                        <div className="space-y-2">
                            <label className={cn(mono.className, "text-[10px] text-red-500 uppercase tracking-widest")}>
                                Squad Magnitude
                            </label>
                            <div className="flex border border-white/10 rounded-md overflow-hidden w-fit">
                                {['2', '3', '4', '5'].map((size) => (
                                    <label key={size} className="cursor-pointer relative">
                                        <input type="radio" value={size} {...register('teamSize')} className="peer sr-only" />
                                        <div className={cn(mono.className, "w-16 h-10 flex items-center justify-center text-sm font-bold bg-white/5 text-neutral-500 border-r border-white/5 hover:bg-white/10 peer-checked:bg-red-600 peer-checked:text-white transition-all")}>
                                            {size}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: MANIFEST */}
                    <div className="space-y-6">
                        <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                            <h3 className={cn(orbitron.className, "text-2xl text-white/90 uppercase tracking-wider")}>
                                02 // Personnel Manifest
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {fields.map((field, index) => (
                                    <motion.div
                                        key={field.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative bg-white/[0.02] border-l-2 border-white/10 p-6 hover:border-red-600 hover:bg-white/[0.04] transition-all"
                                    >
                                        <div className="absolute top-0 right-0 p-2 bg-white/5 text-[10px] text-neutral-400 font-mono tracking-widest">
                                            {index === 0 ? 'LEADER' : `UNIT_0${index + 1}`}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div className="space-y-1">
                                                <input
                                                    {...register(`members.${index}.name`)}
                                                    placeholder="FULL_NAME"
                                                    className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none transition-colors")}
                                                />
                                                {errors.members?.[index]?.name && <span className="text-red-500 text-[9px]">{errors.members[index]?.name?.message}</span>}
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1">
                                                <input
                                                    {...register(`members.${index}.email`)}
                                                    readOnly={index === 0 && !!user}
                                                    placeholder="EMAIL_ADDRESS"
                                                    className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none transition-colors", index === 0 && user && "text-neutral-500")}
                                                />
                                                {errors.members?.[index]?.email && <span className="text-red-500 text-[9px]">{errors.members[index]?.email?.message}</span>}
                                            </div>

                                            {/* Phone */}
                                            <div className="space-y-1">
                                                <input
                                                    {...register(`members.${index}.phone`)}
                                                    placeholder="+91_MOBILE"
                                                    className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none transition-colors")}
                                                />
                                            </div>

                                            {/* College */}
                                            <div className="space-y-1">
                                                <input
                                                    {...register(`members.${index}.college`)}
                                                    placeholder="INSTITUTION"
                                                    className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none transition-colors")}
                                                />
                                            </div>

                                            {/* Leader Only Extra Fields */}
                                            {index === 0 && (
                                                <>
                                                    <div className="space-y-1">
                                                        <input {...register(`members.${index}.rollNo`)} placeholder="ROLL_NUMBER" className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none")} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <input {...register(`members.${index}.branch`)} placeholder="BRANCH" className={cn(mono.className, "w-full bg-transparent border-b border-white/10 py-2 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none")} />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Toggles (Food/Accom) */}
                                        <div className="mt-4 flex gap-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" {...register(`members.${index}.accommodation`)} className="peer sr-only" />
                                                <div className="w-3 h-3 border border-white/30 peer-checked:bg-red-600 peer-checked:border-red-600"></div>
                                                <span className={cn(mono.className, "text-[10px] text-neutral-400 peer-checked:text-white")}>STAY_REQ</span>
                                            </label>
                                            <div className="flex gap-2 items-center">
                                                 <span className={cn(mono.className, "text-[10px] text-neutral-500")}>RATIONS:</span>
                                                 {['Veg', 'Non-Veg'].map((opt) => (
                                                     <label key={opt} className="cursor-pointer">
                                                         <input type="radio" value={opt} {...register(`members.${index}.food`)} className="peer sr-only" />
                                                         <span className={cn(mono.className, "text-[10px] text-neutral-400 hover:text-white peer-checked:text-red-500 font-bold")}>{opt}</span>
                                                     </label>
                                                 ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* SECTION 3: TRANSACTION */}
                    <div className="space-y-6">
                        <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                            <h3 className={cn(orbitron.className, "text-2xl text-white/90 uppercase tracking-wider")}>
                                03 // Transaction Node
                            </h3>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-lg relative overflow-hidden">
                            {/* Receipt Pattern Background */}
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-white transform rotate-12">
                                    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-6-8h-2v2h2v-2zm0-4h-2v2h2V7zm0 8h-2v2h2v-2z" />
                                </svg>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-4">
                                    <div className="p-3 bg-red-900/20 border-l-2 border-red-500">
                                        <p className={cn(mono.className, "text-xs text-red-200")}>
                                            TRANSFER AMT: <span className="font-bold text-white">₹2500.00</span>
                                        </p>
                                        <p className={cn(mono.className, "text-[10px] text-red-400 mt-1")}>
                                            DESTINATION: MGIT_HACKATHON_CORP
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-2 group">
                                        <label className={cn(mono.className, "text-[10px] text-red-500 uppercase tracking-widest")}>
                                            UPI Reference ID
                                        </label>
                                        <input
                                            {...register('upiReference')}
                                            disabled={isEditing}
                                            placeholder="12_DIGIT_SEQ"
                                            className={cn(mono.className, "w-full bg-black border border-white/20 rounded-md p-3 text-sm text-white placeholder:text-neutral-700 focus:border-red-500 focus:outline-none transition-all tracking-widest")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                     <label className={cn(mono.className, "text-[10px] text-red-500 uppercase tracking-widest")}>
                                        Proof of Transfer
                                    </label>
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-lg hover:border-red-500/50 hover:bg-white/5 transition-all cursor-pointer">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 text-neutral-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className={cn(mono.className, "text-[10px] text-neutral-400 uppercase")}>
                                                {watch('paymentScreenshot')?.[0]?.name || 'UPLOAD_RECEIPT_IMG'}
                                            </p>
                                        </div>
                                        <input type="file" accept="image/*" {...register('paymentScreenshot')} disabled={isEditing} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Footer / Action Bar (Fixed) */}
                <div className="p-6 border-t border-white/10 bg-black/80 backdrop-blur-md z-20 flex gap-4">
                    {isEditing && onCancel && (
                        <button type="button" onClick={onCancel} className={cn(mono.className, "px-8 py-4 border border-white/10 text-white text-xs hover:bg-white/10 transition-all uppercase tracking-widest")}>
                            ABORT
                        </button>
                    )}
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={cn(mono.className, "flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-4 uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] disabled:opacity-50")}
                    >
                        {isSubmitting ? 'PROCESSING_DATA...' : (isEditing ? 'COMMIT_CHANGES' : 'EXECUTE_REGISTRATION')}
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

