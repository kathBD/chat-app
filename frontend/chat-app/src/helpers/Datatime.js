import moment from 'moment';


 const Datatime = ( fecha ) => {

    const today = moment( fecha );

    return today.format('HH:mm a | MMMM Do');

}

export default Datatime