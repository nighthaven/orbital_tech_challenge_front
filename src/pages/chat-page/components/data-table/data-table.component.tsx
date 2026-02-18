import './data-table.styles.scss'

export default function DataTable() {
    return (
        <div className="data-table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>4.5</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>6.0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
