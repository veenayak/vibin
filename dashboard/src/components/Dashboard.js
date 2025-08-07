import axios from 'axios';
import { useEffect } from 'react';
const Dashboard = () => {

    const fetchData = () =>{
        const token = JSON.parse(localStorage.getItem('token'));
        const data = {
            "viewId": "223790293",
            "user": {
                "type": "CLIENT_ID",
                "userId": "1034600000.76425000000"
            },
            "dateRange": {
                "startDate": "2018-01-01",
                "endDate": "2018-12-31",
            }
        };
        axios.post('https://analyticsreporting.googleapis.com/v4/userActivity:search',)
        .then(res => {
            console.log(res);
        })
        .catch(rejected => {
            alert("There is sonething wrong. Please try again later.","alert show","!success");
        });
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div><p>lorem</p></div>
    );
}
export default Dashboard;