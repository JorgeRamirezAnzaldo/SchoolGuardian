import React from 'react';
import { Icon } from 'semantic-ui-react';

const studentAttendance = ({studentId}) => {
    const styles ={
        background:{
            background:"rgb(94,3,222)",
            boxShadow:"none",
            color:"white",
        },
        title:{
            color:"white",
            marginBottom: "1.2em",
            marginTop: "1em",
            fontFamily:"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
    }
    return(
        <div className="container" style={{marginTop: "80px"}}>
            <div className="ui equal width center aligned padded grid">
                <div className="row" >
                    <div className="column">
                        <div className="ui centered">
                            <h1 style={{color:"white"}}>Student: StudentName</h1>
                            <table className="ui celled padded table">
                                <thead>
                                    <tr>
                                        <th style={styles.background}>Class</th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}></th>
                                        <th style={styles.background}>Total Absences</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ClassName</td>
                                        <td className='negative'><Icon color='red' size='large' name='x' /></td>
                                        <td className='positive'><Icon color='green' size='large' name='checkmark' /></td>
                                        <td className='positive'><Icon color='green' size='large' name='checkmark' /></td>
                                        <td className='positive'><Icon color='green' size='large' name='checkmark' /></td>
                                        <td className='positive'><Icon color='green' size='large' name='checkmark' /></td>
                                        <td>N</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default studentAttendance;