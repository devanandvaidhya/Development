import axios from "axios";
import { useEffect, useState } from "react";

export function DeleveryAddress({addressProceed})
{

    const [stateList, setstateList] = useState([]);
    const [districtList, setdistrictList] = useState([]);
    const [cityList, setcityList] = useState([]);
    const [selectedState, setselectedState] = useState(0);
    const [selectedDistrict, setselectedDistrict] = useState(0);
    const [selectedCity, setselectedCity] = useState(0);
    const [pincode, setPincode] = useState();
    const [address, setaddress] = useState('');
    

    const handleStateSelected =(e)=>{
        setselectedState(e.target.value);
        GetDistrictByStete(e.target.value)
    }

    const GetStateList = ()=>{

        axios.get('http://localhost:11939/api/Student/GetStateList').
            then(response=>{
                setstateList(response.data.entity);
                debugger;
            })
    }

    function GetDistrictByStete(id)
    {
        axios.get(`http://localhost:11939/api/Student/GetDistByState/${id}`).
                then(response=>{
                    setdistrictList(response.data.entity)
                })
    }

    function handleDistrictSelected(e)
    {
        setselectedDistrict(e.target.value);
        GetCityByDistrict(e.target.value)
    }
    function handleCitySelected(e)
    {
        setselectedCity(e.target.value);
    }

    function GetCityByDistrict(id)
    {
        axios.get(`http://localhost:11939/api/Student/GetCitytByDistrict/${id}`).
                then(response=>{
                    setcityList(response.data.entity)
                })
    }

    const handlePincode = (e)=>{
        const formattedPincode = e.target.value.replace(/\D/g, '').slice(0, 6);

        // Add space every 4 digits for better readability
        const spacedCardNumber = formattedPincode.replace(/(.{3})/g, '$1 ');
        setPincode(spacedCardNumber)
    }

    const handleAddress = (e)=>
    {
        setaddress(e.target.value)
    }

    const handleSubmit=()=>{

        const deliveryAddress = {StateId:selectedState,DistrictId:selectedDistrict,CityId:selectedCity,Pincode:pincode,Address:address}
        localStorage.setItem('DeliveryAddress',JSON.stringify(deliveryAddress));
        addressProceed(false);
    }

    useEffect(()=>{
        GetStateList();
    },[])


    return(
        <>
        <div className=' feature-container-bank-dtls mt-3 mb-3 -2'>
                    <div className="row mt-3 mb-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">State</label> </div>
                        <div className="col-md-5">
                        <select className="form-select bank-drp" value={selectedState} name="id" onChange={handleStateSelected}  sx={{m: 0.5, width: '57ch' }} >
                        {
                            stateList.map(item=>
                                <option key={item.id} value={item.id}> {item.name}</option>
                                )
                        }
                    
                        </select>
                        </div>
                  
                        
                    </div>

                    <div className="row mt-3 mb-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">District</label> </div>
                        <div className="col-md-5">
                        <select className="form-select bank-drp" value={selectedDistrict} name="id" onChange={handleDistrictSelected}  sx={{m: 0.5, width: '57ch' }} >
                        {
                            districtList.map(item=>
                                <option key={item.id} value={item.id}> {item.name}</option>
                                )
                        }
                    
                        </select>
                        </div>
                  
                        
                    </div>

                    <div className="row mt-3 mb-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">City</label> </div>
                        <div className="col-md-5">
                        <select className="form-select bank-drp" value={selectedCity} name="id" onChange={handleCitySelected}  sx={{m: 0.5, width: '57ch' }} >
                        {
                            cityList.map(item=>
                                <option key={item.id} value={item.id}> {item.name}</option>
                                )
                        }
                    
                        </select>
                        </div>
                  
                        
                    </div>
                 
                        <div className="row mt-3 ms-5 w-50">
                        <div className="col-md-7">  <label className=""> Pincode:</label> </div>
                        <div className="col-md-5">   <input type="text" className="card-input" value={pincode} onChange={handlePincode} placeholder="123 456"/> </div>
                        </div>

                        <div className="row mt-3 ms-5 w-50">
                        <div className="col-md-7">  <label className=""> Address:</label> </div>
                        <div className="col-md-5">   <textarea type="text"  className="card-input" value={address} onChange={handleAddress} placeholder="Enter address"/> </div>
                        </div>

                        

                        <div className="btn-contr">
                    <button className='btn-pos' onClick={handleSubmit}>Next to payment</button>
                 </div>

                       
                        <div>
                      
                        </div>
                       
                  
                </div>
        </>
    )
}