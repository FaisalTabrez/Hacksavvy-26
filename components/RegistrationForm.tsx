'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, RegistrationFormValues } from '@/app/register/schema'
import { registerTeam } from '@/app/register/actions'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

import { updateTeamDetails } from '@/app/dashboard/actions'

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

    // Fetch user on mount
    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) {
                setValue('members.0.email', user.email || '')
                setValue('members.0.name', user.user_metadata?.full_name || '')
            }
        }
        getUser()
    }, [setValue])

    // Update members array when team size changes
    useEffect(() => {
        const size = parseInt(teamSize)
        const currentMembers = watch('members')
        if (currentMembers.length !== size) {
            const newMembers = [...currentMembers]
            if (newMembers.length < size) {
                // Add members
                for (let i = newMembers.length; i < size; i++) {
                    newMembers.push({
                        name: '', email: '', phone: '', college: '',
                        accommodation: false, food: 'Veg'
                    })
                }
            } else {
                // Remove members
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

            // Compression Logic for Images
            if (file.type.startsWith('image/')) {
                try {
                    const imageCompression = (await import('browser-image-compression')).default;
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    }
                    const compressedFile = await imageCompression(file, options);
                    // Create a new file with the original name but compressed content
                    file = new File([compressedFile], file.name, { type: file.type });
                } catch (error) {
                    console.error('Image compression failed, using original file:', error);
                }
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
            if (result?.success) {
                window.location.reload()
                return
            }
        } else {
            result = await registerTeam(formData)
        }

        if (result?.error) {
            setServerError(result.error)
            setIsSubmitting(false)
        }
        // Success redirect is handled in server action
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="relative group overflow-hidden rounded-[2.5rem] bg-neutral-950/50 p-8 md:p-12 shadow-[0_0_40px_-10px_rgba(220,38,38,0.1)] backdrop-blur-2xl border border-red-900/30">
                {/* Decorative Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>

                {serverError && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-red-950/50 border border-red-900/50 rounded-2xl text-red-400 mb-10 text-center font-medium"
                    >
                        {serverError}
                    </motion.div>
                )}

                {/* Team Details Section */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Group Infrastructure</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Identity Tag (Team Name)</label>
                            <input
                                {...register('teamName')}
                                disabled={isEditing}
                                placeholder="IDENTIFY_YOUR_SQUAD"
                                className={cn(
                                    "w-full bg-neutral-900/50 rounded-2xl border border-neutral-800 p-4 text-white placeholder:text-neutral-700 transition-all outline-none",
                                    "focus:border-red-600 focus:ring-1 focus:ring-red-600/20",
                                    isEditing && "opacity-50 cursor-not-allowed"
                                )}
                            />
                            {errors.teamName && <p className="text-red-500 text-[10px] mt-1 ml-1 font-mono">{errors.teamName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Operational Track</label>
                            <select
                                {...register('track')}
                                className="w-full bg-neutral-900/50 rounded-2xl border border-neutral-800 p-4 text-white transition-all outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 appearance-none cursor-pointer"
                            >
                                <option value="AI">AI, AUTOMATION & ROBOTICS</option>
                                <option value="IoT">IOT & EMBEDDED SYSTEMS</option>
                                <option value="Blockchain">CYBERSECURITY & BLOCKCHAIN</option>
                                <option value="Open Innovation">OPEN INNOVATION</option>
                            </select>
                            {errors.track && <p className="text-red-500 text-[10px] mt-1 ml-1 font-mono">{errors.track.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Team Magnitude</label>
                        <div className="flex flex-wrap gap-3">
                            {['2', '3', '4', '5'].map((size) => (
                                <label key={size} className="relative cursor-pointer group">
                                    <input
                                        type="radio"
                                        value={size}
                                        {...register('teamSize')}
                                        className="peer sr-only"
                                    />
                                    <div className="min-w-[80px] text-center px-6 py-3 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-500 font-bold transition-all peer-checked:bg-red-600/10 peer-checked:border-red-600 peer-checked:text-white group-hover:border-neutral-700">
                                        {size}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Member Manifest Section */}
                <div className="space-y-10 mt-16">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Personnel Manifest</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {fields.map((field, index) => (
                                <motion.div
                                    key={field.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative group/member p-8 rounded-3xl bg-neutral-900/30 border border-neutral-800/50 hover:border-red-900/20 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-red-600 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
                                                ID_0{index + 1}
                                            </span>
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                                {index === 0 ? 'Project Lead' : `Sub-Member 0${index + 1}`}
                                            </h3>
                                        </div>
                                        {index === 0 && <span className="text-[8px] uppercase tracking-[0.3em] font-black text-red-500/50">Primary_Authority</span>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Legal Name</label>
                                            <input
                                                {...register(`members.${index}.name`)}
                                                placeholder="REQUIRED"
                                                className="w-full bg-neutral-900/50 rounded-xl border border-neutral-800 p-3 text-white transition-all outline-none focus:border-red-600"
                                            />
                                            {errors.members?.[index]?.name && (
                                                <p className="text-red-500 text-[10px] font-mono">{errors.members[index]?.name?.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Comm-Channel (Email)</label>
                                            <input
                                                {...register(`members.${index}.email`)}
                                                readOnly={index === 0 && !!user}
                                                placeholder="AUTH_REQUIRED"
                                                className={cn(
                                                    "w-full bg-neutral-900/50 rounded-xl border border-neutral-800 p-3 text-white transition-all outline-none focus:border-red-600",
                                                    index === 0 && user && "opacity-50 cursor-not-allowed"
                                                )}
                                            />
                                            {errors.members?.[index]?.email && (
                                                <p className="text-red-500 text-[10px] font-mono">{errors.members[index]?.email?.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Signal-ID (WhatsApp)</label>
                                            <input
                                                {...register(`members.${index}.phone`)}
                                                placeholder="+91_MOBILE"
                                                className="w-full bg-neutral-900/50 rounded-xl border border-neutral-800 p-3 text-white transition-all outline-none focus:border-red-600"
                                            />
                                            {errors.members?.[index]?.phone && (
                                                <p className="text-red-500 text-[10px] font-mono">{errors.members[index]?.phone?.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Sector (College)</label>
                                            <input
                                                {...register(`members.${index}.college`)}
                                                placeholder="INSTITUTION_NAME"
                                                className="w-full bg-neutral-900/50 rounded-xl border border-neutral-800 p-3 text-white transition-all outline-none focus:border-red-600"
                                            />
                                            {errors.members?.[index]?.college && (
                                                <p className="text-red-500 text-[10px] font-mono">{errors.members[index]?.college?.message}</p>
                                            )}
                                        </div>

                                        {index === 0 && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Serial-No (Roll No)</label>
                                                    <input
                                                        {...register(`members.${index}.rollNo`)}
                                                        placeholder="INTERNAL_ID"
                                                        className="w-full bg-neutral-900/50 rounded-xl border border-neutral-800 p-3 text-white transition-all outline-none focus:border-red-600"
                                                    />
                                                    {errors.members?.[index]?.rollNo && (
                                                        <p className="text-red-500 text-[10px] font-mono">{errors.members[index]?.rollNo?.message}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Department (Branch)</label>
                                                    <input
                                                        {...register(`members.${index}.branch`)}
                                                        placeholder="UNIT_NAME"
                                                        className="w-full bg-neutral-900/50 rounded-xl border border-neutral-800 p-3 text-white transition-all outline-none focus:border-red-600"
                                                    />
                                                    {errors.members?.[index]?.branch && (
                                                        <p className="text-red-500 text-[10px] font-mono">{errors.members[index]?.branch?.message}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-8 items-center bg-black/20 p-4 rounded-2xl border border-neutral-800/50">
                                        <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    {...register(`members.${index}.accommodation`)}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-10 h-5 bg-neutral-800 rounded-full transition-all peer-checked:bg-red-600"></div>
                                                <div className="absolute left-1 top-1 w-3 h-3 bg-neutral-400 rounded-full transition-all peer-checked:left-6 peer-checked:bg-white"></div>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-red-500 transition-colors">Accommodation Req_</span>
                                        </label>

                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Provisions:</span>
                                            <div className="flex bg-neutral-800/50 rounded-lg p-1">
                                                {['Veg', 'Non-Veg'].map((opt) => (
                                                    <label key={opt} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value={opt}
                                                            {...register(`members.${index}.food`)}
                                                            className="peer sr-only"
                                                        />
                                                        <div className="px-4 py-1.5 rounded-md text-[9px] font-black uppercase transition-all text-neutral-500 peer-checked:bg-red-600/10 peer-checked:text-red-500">
                                                            {opt}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Secure Payment Node */}
                <div className="mt-16 bg-neutral-900/40 border border-red-900/20 p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
                    {/* Scanner aesthetic accents */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-600/50"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-600/50"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-red-600/50"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-red-600/50"></div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Transaction Node</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="w-full md:w-auto flex flex-col items-center">
                            <div className="relative group/qr p-4 rounded-3xl bg-neutral-950/80 border border-neutral-800 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                                <div className="w-40 h-40 flex items-center justify-center text-neutral-700 font-mono text-[10px] text-center p-4">
                                    [QR_SIGNATURE_PENDING]
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="text-[9px] font-black text-red-500/50 uppercase tracking-[0.3em]">Scan_Auth_Code</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-8 w-full">
                            <div className="bg-red-600/5 p-4 rounded-2xl border-l-2 border-red-600">
                                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                                    Registration Credit: <span className="text-white font-black">₹2500_UNIT</span><br />
                                    Provide <span className="text-red-500">TRANSACTION_HASH</span> and <span className="text-red-500">RECEIPT_OBJ</span> for validation.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Transaction ID (UPI Ref)</label>
                                    <input
                                        {...register('upiReference')}
                                        disabled={isEditing}
                                        placeholder="SEQ_12_DIGITS"
                                        className={cn(
                                            "w-full bg-neutral-900/50 rounded-2xl border border-neutral-800 p-4 text-white placeholder:text-neutral-700 transition-all focus:border-red-600 outline-none",
                                            isEditing && "opacity-50 cursor-not-allowed"
                                        )}
                                    />
                                    {errors.upiReference && <p className="text-red-500 text-[10px] font-mono">{errors.upiReference?.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Digital Receipt (Image)</label>
                                    <div className="relative group/dropzone">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register('paymentScreenshot')}
                                            disabled={isEditing}
                                            className={cn(
                                                "w-full bg-neutral-900/20 rounded-2xl border-2 border-dashed border-neutral-800 p-8 text-xs text-neutral-500 text-center cursor-pointer transition-all",
                                                "hover:border-red-600 hover:bg-red-600/5",
                                                isEditing && "opacity-50 cursor-not-allowed pointer-events-none"
                                            )}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover/dropzone:opacity-100 transition-opacity">
                                                {watch('paymentScreenshot')?.[0]?.name || 'Upload_Evidence_Obj'}
                                            </span>
                                        </div>
                                    </div>
                                    {errors.paymentScreenshot && <p className="text-red-500 text-[10px] font-mono">{errors.paymentScreenshot?.message as string}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mt-16">
                    {isEditing && onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-neutral-900/50 hover:bg-neutral-800 text-white font-black py-5 px-10 rounded-2xl transition-all border border-neutral-800 uppercase tracking-widest text-xs"
                        >
                            Abort_Edit
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 relative group overflow-hidden rounded-2xl bg-red-600 px-10 py-5 text-sm font-black text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-t border-red-400/30"
                    >
                        <span className="relative z-10 uppercase tracking-[0.2em]">
                            {isSubmitting ? 'Validating_Sequence...' : (isEditing ? 'Sync_Changes' : 'Initialize_Registration')}
                        </span>
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

