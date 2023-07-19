import './groupItem.css'





export const GroupItem = ({ ...props }) => {



    return (
        <>

            <div className="group-item-list">
                <img className='img-list' src={props.imageUrl} alt={`Image or Cover of ${props.name}`} />
                <div className='item-list-info'>
                    <h3>{props.name}</h3>
                    <p>{props.type}</p>

                </div>
            </div>




            {/**<div className="group-item-list">
            <img className='img-list' src={props.imageUrl} alt={`Image or Cover of ${props.name}`} />
            <div className='item-list-info'>
                <h3>{props.name}</h3>
                <p>{props.artist}</p>
                <p>{props.type}</p>
            </div>
        </div> */}
        </>
    )
}
