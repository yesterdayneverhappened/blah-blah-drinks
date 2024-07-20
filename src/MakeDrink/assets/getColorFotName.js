const getColorForName = (name) =>{
    switch(name){
        case 'Adelhyde':
            return 'red';
        case 'Bronson Ext':
            return 'orange';
        case 'Pwd Delta':
            return 'blue';
        case 'Flanergide':
            return 'green';
        case 'Karmotrine':
            return 'violet'
        default:
            return 'gray';
    }
}
export default getColorForName;