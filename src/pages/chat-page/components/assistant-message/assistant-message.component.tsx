import './assistant-message.styles.scss'
import ThinkingBlock from '../thinking-block/thinking-block.component'
import ToolCall from '../tool-call/tool-call.component'
import PlotContainer from '../plot-container/plot-container.component'
import DataTable from '../data-table/data-table.component'

export default function AssistantMessage() {
    return (
        <div className="assistant-message">
            <div className="assistant-header">
                <div className="assistant-avatar">✦</div>
                <span className="assistant-label">Agent</span>
            </div>

            <div className="assistant-body">
                <ThinkingBlock content="Analyse de la question… sélection du modèle statistique…" />

                <ToolCall
                    name="calculate_humor_sensitivity"
                    args={`"dataset": "sales.csv",\n"method": "OLS"`}
                    result={`"slope": 1.42,\n"intercept": 3.12`}
                />

                <div className="assistant-text">
                    Auto-destruction dans 10, 9, 8...
                </div>

                <PlotContainer />
                <DataTable />
            </div>
        </div>
    )
}
