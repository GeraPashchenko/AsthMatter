import React from "react";
import localization from '../../../localization/localization.json';
import { Title, FlexCenter } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import { Table, TableHeader, TD} from '../PatientsPage/StyledComponent';
import logoutUser from '../../../menus/AdminSideMenu';
import { connect } from "react-redux";

class AdminsTable extends React.Component {
    constructor(props) {
        super();
        this.user = JSON.parse(localStorage.getItem('user'));
        this.serverAddress = props.serverAddress;
        this.state = { admins: [], fetchDone: false }
    }

    getAdmins() {
        fetch(`${this.serverAddress}/admins`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).then(data => {
            if (data.error != null) {
                throw new Error(data.error);
            }
            if (data.length > 0) {
                this.setState({
                    admins: data,
                    fetchDone: true
                });
            } else {
                this.setState({ fetchDone: true });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getAdmins();
    }

    deleteAdmin(language, admin){
        let str = `${localization.adminsPage.confirm[language]} 
            ${localization.adminsPage.adminData[language]}:
            ${localization.adminsPage.email[language]} : ${admin.login}
            ${localization.adminsPage.surname[language]}: ${admin.surname}
            ${localization.adminsPage.name[language]}: ${admin.name}
            ${localization.adminsPage.patronymic[language]}: ${admin.patronymic !== null ? admin.patronymic : '-'}
            ${localization.adminsPage.gender[language]}: ${admin.gender === 'F' ? localization.registerPage.genderWoman[language] : localization.registerPage.genderMan[language]}
            ${localization.adminsPage.phone[language]}: ${admin.phone !== null ? admin.phone : '-'}
            ${localization.adminsPage.timezone[language]}: ${admin.timeZoneInfoId}`;
    
        let deleteFlag = window.confirm(str);
        if (deleteFlag) {
            fetch(`${this.serverAddress}/admins/${admin.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(admin)
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.error != null) {
                    throw new Error(data.error);
                } else {
                    let temp = this.state.admins;
                    temp.splice(this.state.admins.findIndex(adm => adm.id === admin.id), 1)
                    this.setState({ admins : temp}, function(){
                        if(admin.id === this.user.id){
                            logoutUser();
                        }
                    });
                }
            }).catch(err => alert("Error: " + err.message));
        }
    }

    render() {
        return (
            <>
                { this.state.admins.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>{localization.adminsPage.email[this.props.language]}</TableHeader>
                                <TableHeader>{localization.adminsPage.surname[this.props.language]}</TableHeader>
                                <TableHeader>{localization.adminsPage.name[this.props.language]}</TableHeader>
                                <TableHeader>{localization.adminsPage.patronymic[this.props.language]}</TableHeader>
                                <TableHeader>{localization.adminsPage.gender[this.props.language]}</TableHeader>
                                <TableHeader>{localization.adminsPage.phone[this.props.language]}</TableHeader>
                                <TableHeader>{localization.adminsPage.timezone[this.props.language]}</TableHeader>
                                <TableHeader></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.admins.map(admin => {
                                    return (
                                        <tr key={admin.id}>
                                            <TD> {admin.login} </TD>
                                            <TD> {admin.surname} </TD>
                                            <TD> {admin.name} </TD>
                                            <TD> {admin.patronymic != null ? admin.patronymic : '-'} </TD>
                                            <TD> {admin.gender === 'F' ? localization.registerPage.genderWoman[this.props.language] : localization.registerPage.genderMan[this.props.language]}</TD>
                                            <TD> {admin.phone !== null ? admin.phone : '-'} </TD>
                                            <TD>{admin.timeZoneInfoId}</TD>
                                            <TD>
                                                <input type="button" className="deleteButton" value={localization.deleteButton[this.props.language]} 
                                                onClick={() => { this.deleteAdmin(this.props.language, admin) }} />
                                            </TD>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> :
                    this.state.fetchDone ?
                        <FlexCenter>
                            <Title>{localization.adminsPage.notFound[this.props.language]}</Title>
                        </FlexCenter>
                        :
                        undefined
                }
            </>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress : store.serverAddress
});

export default connect(storeToProps, null)(AdminsTable);