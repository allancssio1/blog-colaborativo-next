import api from './api'
import { useAuthStore } from '@/store/useAuthStore'

export interface Post {
  id: string
  title: string
  content: string
  author_id: string
  author_name: string
  created_at: string
  updated_at: string
}

export interface PostResponse {
  message: string
  post: Post
}

export const getPosts = async (limit = 10, offset = 0): Promise<Post[]> => {
  const response = await api.get<Post[]>('/post', {
    params: { limit, offset },
  })

  return Array.isArray(response.data) ? response.data : []
}

export const getPost = async (id: string) => {
  const response = await api.get<Post>(`/post/${id}`)
  return response.data
}

export const createPost = async (data: { title: string; content: string }) => {
  const userId = useAuthStore.getState().user?.id
  const response = await api.post<PostResponse>('/post', {
    ...data,
    userId: Number(userId),
  })
  return response.data.post
}

export const updatePost = async (
  id: string,
  data: { title: string; content: string },
) => {
  const userId = useAuthStore.getState().user?.id
  const response = await api.patch<PostResponse>(`/post/${id}`, {
    ...data,
    userId: Number(userId),
  })
  return response.data.post
}

export const deletePost = async (id: string) => {
  const response = await api.delete(`/post/${id}`)
  return response.data
}
