import './plot-container.styles.scss'

interface PlotContainerProps {
    data: Record<string, unknown>
}

export default function PlotContainer({ data: _data }: PlotContainerProps) {
    // TODO : je vais devoir mettre react-plotly.js ici
    return (
        <div className="plot-container">
            <div className="plot-placeholder">
                <span className="plot-icon">📈</span>
                <span>Graphique Plotly reçu — rendu à brancher</span>
            </div>
        </div>
    )
}
