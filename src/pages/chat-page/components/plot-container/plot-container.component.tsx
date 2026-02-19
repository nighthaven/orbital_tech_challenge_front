import './plot-container.styles.scss'
import Plot from 'react-plotly.js'
import type { Data, Layout } from 'plotly.js'

interface PlotContainerProps {
    data: Record<string, unknown>
}

export default function PlotContainer({ data }: PlotContainerProps) {
    const traces = (data.data ?? []) as Data[]
    const layout = (data.layout ?? {}) as Partial<Layout>

    return (
        <div className="plot-container">
            <Plot
                data={traces}
                layout={{
                    ...layout,
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    font: { color: 'var(--text-primary)' },
                    autosize: true,
                }}
                config={{ responsive: true, displayModeBar: true, displaylogo: false }}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler
            />
        </div>
    )
}
