export default function(props){

        const styles = {
            backgroundColor : props.isHeld ? 'grey' : 'white'
        }

    return(
        <button className="die"
        style={styles}
        onClick={props.onClickButton}
        >{props.value}</button>
    )
}