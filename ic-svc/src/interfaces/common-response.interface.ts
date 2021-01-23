export interface BaseResponseDTO {
    status: number
    data: any
    message: string | null
    error: string | null
}
