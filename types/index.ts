import { StackNavigationProp } from '@react-navigation/stack';
import { StyleProp, ViewStyle } from 'react-native';
import { Rang } from '../consts';

export type DimensionParameter = 'SCREEN' | 'WINDOW'

type StackParamList = {
    Home: {}
    AnnouncementsScreen: { announcment: Announcment, data: string }
    Register: {}
    Login: {}
    Options: {}
}

export type NavigationProps = StackNavigationProp<StackParamList>

export type AnnouncementsScreenRouteProps = { 
    params: { 
        announcment: Announcment
        data: string
    } 
}

export interface ScreenDimensions {
    width: number,
    height: number,
}

export interface NavbarSelectContextType {
    selected: boolean,
    setSelected: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

export interface UserContextType {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>> | undefined
}

export interface ParentProps {
    children: React.ReactNode | React.ReactNode[],
}

export interface Data<T> {
    status: string;
    message: string;
    data: T
}

export interface Loggined {
    device: string
    status: boolean
}

export interface User {
    _id?: string
    username?: string
    email: string
    picturePath?: string
    roles?: string[]
    password: string
    loggined: Loggined
}

export interface LogoProps { 
    onPress?: () => void
    scale: number,
    color?: string
    style?: StyleProp<ViewStyle>
}

export interface Announcment {
    _id: string
    author: string
    content: string
    likes: string[]
    comments: Comment[]
    rang: Rang
    date: Date
}

export interface AnnouncmentComponentProps {
    announcment: Announcment,
}

export interface CreateAnnouncmentInterface {
    author: string
    content: string
    rang: Rang
    date: Date
}

export interface Comment {
    author: string
    content: string
    responses?: Comment[]
    likes?: string[]
}

export interface CommentComponentProps { 
    comment: Comment, 
    id: string,
    index: number,
    setVisibleComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

export interface CreateCommentProps {
    id: string, 
    setVisibleComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

export interface Date {
    hour: number
    day: number
    month: number | string
    year: number
}

export type HeartConfigType = {
    likes: string[]
    likeUrl: string
    disLikeUrl: string
    reqObject: { username: string, _id?: string, index?: number, resIndex?: number }
    style?: StyleProp<ViewStyle>
}

export interface CreateResponseCommentProps  {
    responses: Comment[] | undefined
    _id: string, 
    index: number, 
    setResponses: React.Dispatch<React.SetStateAction<Comment[] | undefined>>,
    setReply: React.Dispatch<React.SetStateAction<boolean>>,
    data: string,
    loading: boolean
}

export interface CommentResponseProps {
    id: string, 
    comment: Comment, 
    resIndex: number, 
    index: number, 
    lastIndex: number 
}