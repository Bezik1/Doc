import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { API_URLS, COLORS } from "../consts"
import { useReloadContext } from "../contexts/ReloadContext"
import { useUserContext } from "../contexts/UserContext"
import { useFetch } from "../hooks/useFetch"
import { styles } from "../styles"
import { Comment, CreateResponseCommentProps } from "../types"
import ProfileImage from "./ProfileImage"
import CheckedSvg from "./svg/Checked"

const CreateResponseComment = ({ 
    _id, 
    index, 
    setResponses,
    setReply, 
    responses 
} : CreateResponseCommentProps) =>{

    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const { user } = useUserContext()
    const { data, loading } = useFetch<string>(`${API_URLS.GetPhoto}/${user?.username}`)
    const { setReload } = useReloadContext()

    const isLastElement = () => Number(responses?.length) === 0 ? { height: '56%' } : {}

    const handleSubmit = async () =>{
        try {
            if(content.length < 4) setError('Komentarz musi zawierać, co najmniej 4 znaki')
            else {
                const comment: Comment = {
                    author: String(user?.username),
                    content
                }
        
                await axios.post(API_URLS.AddResponse, { _id, comment, index })
                setContent('')
                //@ts-ignore
                setResponses((responses) => [...responses, comment])
                setReply(false)
                setReload((reload) => !reload)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View 
                style={{
                    ...styles.announcementCommentResponseLine,
                    ...isLastElement()
                }}
            />
            <View style={styles.announcementCommentResponseLineConnect} />
            <View style={{ width: '85%', height: 150, backgroundColor: COLORS.gray, marginTop: 20, marginRight: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ProfileImage style={{ width: 40, height: 40, margin: 5 }} data={data} loading={loading} />
                <Text style={{ marginTop: 15, color: COLORS.purple }}>{user?.username}</Text>
            </View>
            <TextInput
                style={{ padding: 10, color: COLORS.white }}
                placeholderTextColor={COLORS.white}
                value={content}
                onChangeText={text => setContent(text)}
                placeholder="Dodaj komentarz..." 
            />
            <Pressable
                onPress={handleSubmit}
                style={{ width: 50, height: 50, position: 'absolute', right: 20, bottom: 20 }}
            >
                <CheckedSvg />
            </Pressable>
        </View>
        </View>
    )
}

export default CreateResponseComment