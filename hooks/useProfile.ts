import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../utils/supabase'
import { useSession } from '../utils/ctx'

export interface ProfileData {
    username: string
    website: string | null
    avatar_url: string | null
    name: string
    surname: string
}

export function useProfile() {
    const { session } = useSession()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState<ProfileData>({
        username: '',
        website: null,
        avatar_url: null,
        name: '',
        surname: ''
    })

    useEffect(() => {
        if (session) {
            getProfile()
        }
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url, name, surname`)
                .eq('id', session?.user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setProfile({
                    username: data.username || '',
                    website: data.website || null,
                    avatar_url: data.avatar_url || null,
                    name: data.name || '',
                    surname: data.surname || ''
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile(updates: Partial<ProfileData>) {
        try {
            setSaving(true)
            if (!session?.user) throw new Error('No user on the session!')

            const profileUpdates = {
                id: session?.user.id,
                ...updates,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(profileUpdates)

            if (error) {
                throw error
            }

            // Update local state
            setProfile(prev => ({ ...prev, ...updates }))
            return { success: true }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An error occurred'
            Alert.alert('Error', message)
            return { success: false, error: message }
        } finally {
            setSaving(false)
        }
    }

    async function uploadAvatar(imageUri: string): Promise<{ success: boolean; url?: string; error?: string }> {
        try {
            if (!session?.user) throw new Error('No user on the session!')

            // Upload to Supabase Storage
            const arraybuffer = await fetch(imageUri).then((res) => res.arrayBuffer())
            const fileExt = imageUri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
            const path = `${session?.user?.id}/${Date.now()}.${fileExt}`

            const { data, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(path, arraybuffer, {
                    contentType: 'image/jpeg',
                    upsert: true
                })

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(data.path)

            // Update profile with new avatar
            await updateProfile({ avatar_url: urlData.publicUrl })

            return { success: true, url: urlData.publicUrl }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Upload failed'
            return { success: false, error: message }
        }
    }

    return {
        profile,
        setProfile,
        loading,
        saving,
        getProfile,
        updateProfile,
        uploadAvatar
    }
}
