import './welcome-screen.styles.scss'
import type { DatasetInfo } from '../../../../types/dataset.types'

interface WelcomeScreenProps {
    datasets: DatasetInfo[]
    loading: boolean
}

function DatasetCard({ dataset }: { dataset: DatasetInfo }) {
    const visible = dataset.column_names.slice(0, 4)
    const hiddenCount = dataset.column_names.length - visible.length

    return (
        <div className="dataset-card">
            <div className="dataset-card-header">
                <span className="dataset-card-icon">⊞</span>
                <span className="dataset-card-name">{dataset.name}</span>
            </div>
            <div className="dataset-card-meta">
                <span className="dataset-card-stat">{dataset.rows.toLocaleString()} lignes</span>
                <span className="dataset-card-sep">·</span>
                <span className="dataset-card-stat">{dataset.columns} colonnes</span>
            </div>
            <p className="dataset-card-columns">
                {visible.join(', ')}
                {hiddenCount > 0 && <span className="dataset-card-more"> +{hiddenCount}</span>}
            </p>
        </div>
    )
}

export default function WelcomeScreen({ datasets, loading }: WelcomeScreenProps) {
    return (
        <div className="welcome">
            <div className="welcome-hero">
                <div className="welcome-icon-wrapper">
                    <span className="welcome-icon">✦</span>
                </div>
                <h1 className="welcome-title">Orbital Agent</h1>
                <p className="welcome-subtitle">
                    Posez des questions sur vos données en langage naturel.
                </p>
            </div>

            {!loading && datasets.length > 0 && (
                <section className="welcome-datasets">
                    <p className="welcome-datasets-label">Données disponibles</p>
                    <div className="welcome-datasets-grid">
                        {datasets.map(ds => (
                            <DatasetCard key={ds.name} dataset={ds} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
