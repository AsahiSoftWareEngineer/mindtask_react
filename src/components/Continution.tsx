import "./styles/Continution.css"

export const ContinuationComponent = ({value}:{value:number}) => {
    return (
        <div className="continuation">
            <span className="sectionTitle">あなたが努力した日数</span>
            <div className="value">
                {value}
            </div>
        </div>
    )
}