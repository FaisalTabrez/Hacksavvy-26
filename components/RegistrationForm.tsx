'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, RegistrationFormValues } from '@/app/register/schema'
import { registerTeam } from '@/app/register/actions'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

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
            formData.append('paymentScreenshot', data.paymentScreenshot[0])
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
        <form onSubmit={handleSubmit(onSubmit)} className="relative group overflow-hidden rounded-2xl bg-gray-900/50 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 border border-white/5 hover:border-red-500/20">
            {/* Card glow effect */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

            {serverError && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 mb-8 animate-shake">
                    {serverError}
                </div>
            )}

            {/* Team Details */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-1 bg-red-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Team Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Team Name</label>
                        <input
                            {...register('teamName')}
                            disabled={isEditing}
                            placeholder="Enter team name"
                            className={`w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-600 ${isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/20'}`}
                        />
                        {errors.teamName && <p className="text-red-400 text-xs mt-2 ml-1">{errors.teamName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Track</label>
                        <select
                            {...register('track')}
                            className="w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none hover:border-white/20 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat"
                        >
                            <option value="AI" className="bg-gray-900">AI, Automation & Robotics</option>
                            <option value="IoT" className="bg-gray-900">IoT & Embedded Systems</option>
                            <option value="Blockchain" className="bg-gray-900">Cybersecurity & Blockchain</option>
                            <option value="Open Innovation" className="bg-gray-900">Open Innovation</option>
                        </select>
                        {errors.track && <p className="text-red-400 text-xs mt-2 ml-1">{errors.track.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">Team Size</label>
                    <div className="flex flex-wrap gap-4">
                        {['2', '3', '4', '5'].map((size) => (
                            <label key={size} className="relative flex items-center gap-3 cursor-pointer group/radio">
                                <input
                                    type="radio"
                                    value={size}
                                    {...register('teamSize')}
                                    className="peer sr-only"
                                />
                                <div className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-gray-400 transition-all peer-checked:bg-red-500/10 peer-checked:border-red-500/50 peer-checked:text-white hover:border-white/20">
                                    {size} Members
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Member Details */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-1 bg-red-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Member Details</h2>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {fields.map((field, index) => (
                        <div key={field.id} className="relative overflow-hidden bg-white/[0.02] border border-white/5 p-6 rounded-2xl transition-all hover:bg-white/[0.04] hover:border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-xs">
                                        {index + 1}
                                    </span>
                                    {index === 0 ? 'Team Leader' : `Member ${index + 1}`}
                                </h3>
                                {index === 0 && <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-2 py-1 rounded bg-white/5 border border-white/10">Primary Contact</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                    <input
                                        {...register(`members.${index}.name`)}
                                        placeholder="Enter name"
                                        className="w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700"
                                    />
                                    {errors.members?.[index]?.name && (
                                        <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.members[index]?.name?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                    <input
                                        {...register(`members.${index}.email`)}
                                        readOnly={index === 0 && !!user}
                                        placeholder="Enter email"
                                        className={`w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700 ${index === 0 && user ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                    {errors.members?.[index]?.email && (
                                        <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.members[index]?.email?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
                                    <input
                                        {...register(`members.${index}.phone`)}
                                        placeholder="+91"
                                        className="w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700"
                                    />
                                    {errors.members?.[index]?.phone && (
                                        <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.members[index]?.phone?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">College Name</label>
                                    <input
                                        {...register(`members.${index}.college`)}
                                        placeholder="Enter college"
                                        className="w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700"
                                    />
                                    {errors.members?.[index]?.college && (
                                        <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.members[index]?.college?.message}</p>
                                    )}
                                </div>

                                {index === 0 && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Roll Number</label>
                                            <input
                                                {...register(`members.${index}.rollNo`)}
                                                placeholder="Enter roll no"
                                                className="w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700"
                                            />
                                            {errors.members?.[index]?.rollNo && (
                                                <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.members[index]?.rollNo?.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Branch</label>
                                            <input
                                                {...register(`members.${index}.branch`)}
                                                placeholder="Enter branch"
                                                className="w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700"
                                            />
                                            {errors.members?.[index]?.branch && (
                                                <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.members[index]?.branch?.message}</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="md:col-span-2 flex flex-wrap gap-6 items-center pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                {...register(`members.${index}.accommodation`)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-10 h-5 bg-white/10 rounded-full border border-white/10 transition-all peer-checked:bg-red-500/50"></div>
                                            <div className="absolute left-1 top-1 w-3 h-3 bg-gray-400 rounded-full transition-all peer-checked:left-6 peer-checked:bg-white"></div>
                                        </div>
                                        <span className="text-sm text-gray-400 group-hover/toggle:text-white transition-colors">Accommodation Req.</span>
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Food:</span>
                                        <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                            {['Veg', 'Non-Veg'].map((opt) => (
                                                <label key={opt} className="cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value={opt}
                                                        {...register(`members.${index}.food`)}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all text-gray-500 peer-checked:bg-white/5 peer-checked:text-red-500">
                                                        {opt}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6 mt-12 bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-1 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Payment Verification</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="relative group/qr">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-25 group-hover/qr:opacity-50 transition duration-1000 group-hover/qr:duration-200"></div>
                        <div className="relative w-48 h-48 bg-black/40 border border-white/10 p-3 rounded-2xl flex-shrink-0 flex items-center justify-center">
                            <span className="text-gray-500 font-medium text-sm">QR Placeholder</span>
                            {/* <img src="/qr.png" alt="Payment QR Code" className="w-full h-full object-contain" /> */}
                        </div>
                        <p className="mt-4 text-center text-[10px] text-gray-500 uppercase tracking-tighter font-bold">Scan to pay</p>
                    </div>

                    <div className="flex-grow space-y-6 w-full">
                        <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20">
                            <p className="text-sm text-red-100/80 leading-relaxed">
                                Please pay the registration fee of <strong className="text-red-500 font-black">₹2500</strong> per team.
                                Enter the <span className="underline decoration-red-500/50 underline-offset-4">Transaction ID</span> and upload the receipt below.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">UPI Reference ID</label>
                                <input
                                    {...register('upiReference')}
                                    disabled={isEditing}
                                    placeholder="e.g. 123456789012"
                                    className={`w-full bg-black/40 rounded-xl border border-white/10 p-3 text-white transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none placeholder:text-gray-700 ${isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/20'}`}
                                />
                                {errors.upiReference && <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.upiReference?.message}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment Receipt</label>
                                <div className="relative group/file">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register('paymentScreenshot')}
                                        disabled={isEditing}
                                        className={`w-full bg-black/40 rounded-xl border border-white/10 p-3 text-sm text-gray-400 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-red-500/10 file:text-red-500 hover:file:bg-red-500/20 ${isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/20'}`}
                                    />
                                </div>
                                {errors.paymentScreenshot && <p className="text-red-400 text-[10px] mt-2 ml-1">{errors.paymentScreenshot?.message as string}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
                {isEditing && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all border border-white/10"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 group relative overflow-hidden rounded-xl bg-red-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/50"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 tracking-wider uppercase">
                        {isSubmitting ? 'Processing...' : (isEditing ? 'Save Changes' : 'Confirm Registration')}
                    </span>
                </button>
            </div>
        </form>
    )
}
