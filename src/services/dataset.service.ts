import { API_BASE_URL } from '../config/api.config'
import type { DatasetInfo } from '../types/dataset.types'

export class DatasetServiceError extends Error {
    public readonly statusCode?: number

    constructor(message: string, statusCode?: number) {
        super(message)
        this.name = 'DatasetServiceError'
        this.statusCode = statusCode
    }
}

export class DatasetService {
    async listDatasets(): Promise<DatasetInfo[]> {
        const response = await fetch(`${API_BASE_URL}/datasets/`)

        if (!response.ok) {
            throw new DatasetServiceError(
                `Impossible de récupérer les datasets : ${response.statusText}`,
                response.status,
            )
        }

        return response.json() as Promise<DatasetInfo[]>
    }
}

export const datasetService = new DatasetService()
