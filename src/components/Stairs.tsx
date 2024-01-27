import "./styles/Stairs.css"

export const StairsComponent = ({value}:{value:number}) => {
    return (<>
    <div className="stairs">
    <span className="sectionTitle">あなたが達成したタスク</span>
            <div className="value">
                {value}
            </div>
    </div>
    </>)
}
