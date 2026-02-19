import './data-table.styles.scss'

interface DataTableProps {
    data: Record<string, unknown>[]
    columns: string[]
}

export default function DataTable({ data, columns }: DataTableProps) {
    if (!data.length) return null

    return (
        <div className="data-table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map(col => (
                                <td key={col}>{String(row[col] ?? '')}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
