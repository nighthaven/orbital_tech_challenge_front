import { useEffect, useState } from 'react'
import { datasetService } from '../services/dataset.service'
import type { DatasetInfo } from '../types/dataset.types'

export function useDatasets() {
    const [datasets, setDatasets] = useState<DatasetInfo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        datasetService
            .listDatasets()
            .then(setDatasets)
            .catch(() => setDatasets([]))
            .finally(() => setLoading(false))
    }, [])

    return { datasets, loading }
}
