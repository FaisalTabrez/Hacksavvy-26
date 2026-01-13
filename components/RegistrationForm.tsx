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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg text-white">
            {serverError && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
                    {serverError}
                </div>
            )}

            {/* Team Details */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Team Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    <div>
                        <label className="block text-sm font-medium mb-1">Team Name</label>
                        <input
                            {...register('teamName')}
                            disabled={isEditing}
                            className={`w-full bg-gray-700 rounded border border-gray-600 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Track</label>
                        <select
                            {...register('track')}
                            className="w-full bg-gray-700 rounded border border-gray-600 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="AI">AI, Automation & Robotics</option>
                            <option value="IoT">IoT & Embedded Systems</option>
                            <option value="Blockchain">Cybersecurity & Blockchain</option>
                            <option value="Open Innovation">Open Innovation</option>
                        </select>
                        {errors.track && <p className="text-red-400 text-sm mt-1">{errors.track.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Team Size</label>
                    <div className="flex gap-4">
                        {['2', '3', '4', '5'].map((size) => (
                            <label key={size} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={size}
                                    {...register('teamSize')}
                                    className="text-blue-500 focus:ring-blue-500"
                                />
                                <span>{size} Members</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Member Details */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Member Details</h2>

                {fields.map((field, index) => (
                    <div key={field.id} className="bg-gray-700/50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg text-blue-400">
                            {index === 0 ? 'Team Leader (Member 1)' : `Member ${index + 1}`}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    {...register(`members.${index}.name`)}
                                    className="w-full bg-gray-700 rounded border border-gray-600 p-2"
                                />
                                {errors.members?.[index]?.name && (
                                    <p className="text-red-400 text-sm mt-1">{errors.members[index]?.name?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    {...register(`members.${index}.email`)}
                                    readOnly={index === 0 && !!user} // Leader email read-only if logged in
                                    className={`w-full bg-gray-700 rounded border border-gray-600 p-2 ${index === 0 && user ? 'opacity-70 cursor-not-allowed' : ''}`}
                                />
                                {errors.members?.[index]?.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.members[index]?.email?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone (WhatsApp)</label>
                                <input
                                    {...register(`members.${index}.phone`)}
                                    className="w-full bg-gray-700 rounded border border-gray-600 p-2"
                                />
                                {errors.members?.[index]?.phone && (
                                    <p className="text-red-400 text-sm mt-1">{errors.members[index]?.phone?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">College Name</label>
                                <input
                                    {...register(`members.${index}.college`)}
                                    className="w-full bg-gray-700 rounded border border-gray-600 p-2"
                                />
                                {errors.members?.[index]?.college && (
                                    <p className="text-red-400 text-sm mt-1">{errors.members[index]?.college?.message}</p>
                                )}
                            </div>

                            {/* Leader Specific Fields */}
                            {index === 0 && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Roll Number</label>
                                        <input
                                            {...register(`members.${index}.rollNo`)}
                                            className="w-full bg-gray-700 rounded border border-gray-600 p-2"
                                        />
                                        {errors.members?.[index]?.rollNo && (
                                            <p className="text-red-400 text-sm mt-1">{errors.members[index]?.rollNo?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Branch</label>
                                        <input
                                            {...register(`members.${index}.branch`)}
                                            className="w-full bg-gray-700 rounded border border-gray-600 p-2"
                                        />
                                        {errors.members?.[index]?.branch && (
                                            <p className="text-red-400 text-sm mt-1">{errors.members[index]?.branch?.message}</p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Logistics */}
                            <div className="md:col-span-2 flex gap-6 items-center mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register(`members.${index}.accommodation`)}
                                        className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                                    />
                                    <span>Accommodation Required</span>
                                </label>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Food:</span>
                                    <select
                                        {...register(`members.${index}.food`)}
                                        className="bg-gray-700 rounded border border-gray-600 p-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Payment</h2>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-48 h-48 bg-white p-2 rounded-lg flex-shrink-0">
                        <img src="/qr.png" alt="Payment QR Code" className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-grow space-y-4 w-full">
                        <div className="bg-blue-900/30 p-4 rounded border border-blue-500/30">
                            <p className="text-sm text-blue-200">
                                Please scan the QR code to pay the registration fee of <strong>₹2500</strong> per team.
                                After payment, enter the UPI Reference ID and upload a screenshot.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">UPI Reference ID</label>
                            <input
                                {...register('upiReference')}
                                disabled={isEditing}
                                placeholder="e.g. 123456789012"
                                className={`w-full bg-gray-700 rounded border border-gray-600 p-2 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                            {errors.upiReference && <p className="text-red-400 text-sm mt-1">{errors.upiReference?.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Payment Screenshot</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register('paymentScreenshot')}
                                disabled={isEditing}
                                className={`w-full bg-gray-700 rounded border border-gray-600 p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                            {errors.paymentScreenshot && <p className="text-red-400 text-sm mt-1">{errors.paymentScreenshot?.message as string}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                {isEditing && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Update Details' : 'Complete Registration')}
                </button>
            </div>
        </form >
    )
}
