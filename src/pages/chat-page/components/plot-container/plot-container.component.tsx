import './plot-container.styles.scss'

export default function PlotContainer() {
    return (
        <div className="plot-container">
            <div className="plot-placeholder">
                <span className="plot-icon">📈</span>
                <span>Le graphique Plotly s'affichera ici</span>
            </div>
        </div>
    )
}
