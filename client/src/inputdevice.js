import React from 'react';
import './css/inputDevice.css';
import axios from 'axios';
import validator from 'validator';
import { useHistory } from 'react-router';

export default function inputdevice() {
    const submitID = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(validator.isMACAddress(data.get('idDevice')) === true){
            axios.post(process.env.REACT_APP_baseURL + "/addDevice", {
                idDevice: data.get('idDevice'),
            }, {
                headers:{
                    'authtoken': localStorage.getItem("Token"),
                },
            }
            ).then((response) => {
                if(response.data.status === 1){
                    alert(response.data.message);
                    axios.post(process.env.REACT_APP_baseURL + "/login", { //to specif end point
                        username: response.data.email,
                        password: response.data.password,
                      }).then((response) => {
                          //memasukan authorisasi login ke localstorage agar bisa masuk ke dashboard
                          localStorage.setItem("isAuthenticated", true)
                          localStorage.setItem("Token", response.data.access)
                          localStorage.setItem("deviceID", response.data.deviceid)
                          if(response.data.deviceid === null){
                            window.location.pathname="/inputdevice";
                          }else if(response.data.deviceid !== null){
                            window.location.pathname="/dashboard/" + response.data.username;
                          }
                      })
                }else{
                    alert(response.data.message);
                    window.location.pathname="/inputdevice"
                }
            })
        }else if (data.get('idDevice') === ''){
            alert('Masukan ID device anda')
        }else{
            alert('ID tidak sesuai')
        }
    }

    const logout = () => {
            axios.get(process.env.REACT_APP_baseURL + "/checkdevice",{
                headers:{
                    "authtoken": localStorage.getItem("Token"),
                }
            }).then((res) => {
                if(res.data.device === null){
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("Token");
                
                    window.location.pathname="/";
                } else {
                    window.location.pathname='/dashboard/' + res.data.username;
                }
            })
            }

    return (
        <div className="containerTOP">
            <div class="box">
                <div className="formNewUser">
                    <h3>Input New Device</h3>
                </div>
                <hr></hr>
                <div className="IDform">
                    <form onSubmit={submitID}>
                        <label><b>ID Device : </b></label>
                        <input name="idDevice" placeholder="Insert your device ID"></input>
                        <br></br>
                        <div className="btnPadBot btnposition">
                            <input className="btnSubmit "type="submit" value="Submit"></input>
                            <input className="btnCancel" type="reset" onClick={logout} value="Cancel"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
