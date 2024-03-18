import axios from "axios";
import { useEffect, useState } from "react";
import './bankDetail.css'
import { useNavigate, useParams } from "react-router-dom";
import { Payment } from "@mui/icons-material";
import { OrderPlace } from "../../Modal/Products/OrderPlace";

export function BankDetails()
{
    const [selectedBank, setselectedBank] = useState(0);
    const [selectedIFSC, setselectedIFSC] = useState('');
    const [bankList, setbankList] = useState([]);
    const [IFSCList, setIFSCList] = useState([]);
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [order,setOrder]=useState({orderId:''})
    const [Product, setProduct] = useState({description:'',productFile:'',productId:0, productName:'',productPrice:''});
   // const[bankDetails,setbankDetails] = useState({selectedBank:0,selectedIFSC:'',cardNumber:'',cardHolder:'',expiryDate:'',cvv:''});
   const [modalOpen, setModalOpen] = useState(false);
    const[paymentDetails,setPaymentDetails] =useState({BankId:0,IFSCCode:'',cardNumber:'',cardHolder:'',expiryMonth:0,expiryYear:0,cvv:''});
    const [counter, setCounter] = useState(0);
    let Emp = JSON.parse(localStorage.getItem('Users'));
    let DelAddress = JSON.parse(localStorage.getItem('DeliveryAddress'));
    
    let param = useParams();
    let navigate = useNavigate();
    
    const handleCardNumberChange = (e) => {
       
          // Remove non-numeric characters and limit to 16 digits
    const formattedCardNumber = e.target.value.replace(/\D/g, '').slice(0, 16);

    // Add space every 4 digits for better readability
    const spacedCardNumber = formattedCardNumber.replace(/(.{4})/g, '$1 ');

    setCardNumber(spacedCardNumber);

   // onStageChange({selectedBank:selectedBank,selectedIFSC:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryDate:expiryDate,cvv:cvv});

      };
    
      const handleCardHolderChange = (e) => {
        setCardHolder(e.target.value);
       // onStageChange({selectedBank:selectedBank,selectedIFSC:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryDate:expiryDate,cvv:cvv});
    
      };
    
      const handleExpiryDateChange = (e) => {
        // Validate and format expiry date if needed
        const formattedExpiryDate = e.target.value.replace(/\D/g, '').slice(0, 6);
        const month = formattedExpiryDate.slice(0, 2);
        const year = formattedExpiryDate.slice(2, 6);
    
        // Combine month and year with a "/" separator
        const spacedExpiryDate = `${month}/${year}`;
    
        setExpiryDate(spacedExpiryDate);
       // onStageChange({selectedBank:selectedBank,selectedIFSC:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryDate:spacedExpiryDate,cvv:cvv});
    
      };
    
      const handleCVVChange = (e) => {
       
        // Validate and format CVV if needed
        const formattedCVV = e.target.value.replace(/\D/g, '').slice(0, 3);
        setCVV(formattedCVV);
        //onStageChange({selectedBank:selectedBank,selectedIFSC:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryDate:expiryDate,cvv:cvv});
  
      };

  
    const handleBankSelected =(e)=>{
       
        setselectedBank(e.target.value);
        GetIFSCByBank(e.target.value)
       // onStageChange({selectedBank:selectedBank,selectedIFSC:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryDate:expiryDate,cvv:cvv});
    
    }

    function GetIFSCByBank(id)
    {
        axios.get(`http://localhost:11939/api/Student/GetIFSCByBank/${id}`).
                then(response=>{
                    setIFSCList(response.data.entity)
                })
    }
    const handleIFSCSelected= (e)=>{
        debugger;
        setselectedIFSC(e.target.value);
       // onStageChange({selectedBank:selectedBank,selectedIFSC:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryDate:expiryDate,cvv:cvv});

      //  GetIFSCByBank(e.target.value);
    }
    const GetBankList = ()=>{

        axios.get('http://localhost:11939/api/Student/GetBankList').
            then(response=>{
                setbankList(response.data.entity);
            })
    }

    function GetProductById()
    {   
        debugger;
        axios.get(`http://localhost:11939/api/Student/GetProductById/${param.productId}`).
                then(response=>{
                    setProduct(response.data.entity);
                    debugger;
                })
    }


    function handleBankProceed()
    {
       
        let Expirydate = expiryDate.split('/')
        let ExpMonth = Expirydate[0]
        let ExpYear = Expirydate[1]
        setPaymentDetails({BankId:selectedBank,IFSCCode:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryMonth:ExpMonth,expiryYear:ExpYear,cvv:cvv,Amount:Product.productPrice});
        
        const Payment = 
        {BankId:selectedBank,IFSCCode:selectedIFSC,cardNumber:cardNumber,cardHolder:cardHolder,expiryMonth:ExpMonth,expiryYear:ExpYear,cvv:cvv,Amount:Product.productPrice}



        PaymentProcess(Payment);
        
        debugger;
     
    }
    const startTimer = () => {
        const id = setInterval(() => {
          setCounter(prevCounter => prevCounter + 1);
        }, 1000);
        setTimerId(id);
      };
      const [timerId, setTimerId] = useState(null);
    const PaymentProcess = async (Payment)=>{
        try
        {
            debugger;

            handleOpen();
            const paymentResponse = await axios.post('http://localhost:11939/api/Student/PaymentProcess',Payment);
            if(paymentResponse.data.entity.isSuccess==true)
            {
                let Order={UserId:Emp.id,ProductId:param.productId,deliveryAddress:DelAddress}
                console.log(DelAddress);
                const orderResponse = await axios.post('http://localhost:11939/api/Student/OrderProcess',Order);
                    setOrder(orderResponse.data.entity)
                    //alert(`Order number is ${orderResponse.data.entity.orderId}`);
                    debugger;
                    startTimer();
                    localStorage.removeItem("DeliveryAddress");
                    // const intervalId = setInterval(() => {
                    //     closeModal();
                      
                    //     setCounter(prevCounter => prevCounter + 1);
                    //   }, 1000);
                     
                  
                      const timer = setTimeout(() => {
                        closeModal();
                        navigate('/user-order', { state: { Orderid: orderResponse.data.entity.orderId } });
                        //navigate('/user-order'); 
                      }, 3000); // Adjust the duration (in milliseconds) as needed
                  
                      // Clean up the timer to avoid memory leaks
                      return () => clearTimeout(timer);

                      //return () => clearInterval(1);
                     // return () => clearInterval(timerId);
                     // navigate('/user-order')

                   
            }
        }
        catch(error)
        {

        }
    }

    const handleOpen = () => {
    debugger;
        setModalOpen(true);
      };
   
  
  
      const closeModal = () => {
          setModalOpen(false);
        };


    useEffect(()=>{
       
        GetBankList();
        GetProductById();
        // if (counter >= 10) {
          
        //     setTimeout(() => {
        //       clearInterval(timerId); // Clear interval
        //      navigate('/user-order'); // Navigate to other page
        //     }, 2000);
        //   }

    },[counter])

    return(
        <>
        <div className=' feature-container-bank-dtls mt-3 mb-3 -2'>
                    <div className="row mt-3 mb-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">Bank Name</label> </div>
                        <div className="col-md-5">
                        <select className="form-select bank-drp" value={selectedBank} name="id" onChange={handleBankSelected}  sx={{m: 0.5, width: '57ch' }} >
                        {
                            bankList.map(item=>
                                <option key={item.id} value={item.id}> {item.name}</option>
                                )
                        }
                    
                        </select>
                        </div>
                  
                        
                    </div>
                    <div className="row mt-3 ms-5 w-50">
                    <div className="col-md-7">  <label className="">IFSC Code</label> </div>
                    <div className="col-md-5">
                        <select className="form-select bank-drp" value={selectedIFSC} name="id" onChange={handleIFSCSelected}  sx={{m: 0.5, width: '57ch' }} >
                        {
                            IFSCList.map(item=>
                                <option key={item.id} value={item.name}> {item.name}</option>
                                )
                        }
                    
                        </select>
                        </div>
                        </div>
                        <div className="row mt-3 ms-5 w-50">
                        <div className="col-md-7">  <label className=""> Card Number:</label> </div>
                        <div className="col-md-5">   <input type="text" className="card-input" value={cardNumber} onChange={handleCardNumberChange} placeholder="1234 5632 4125 5632"/> </div>
                        </div>

                        <div className="row mt-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">  Card Holder:</label> </div>
                        <div className="col-md-5">    <input type="text" className="card-input" value={cardHolder} onChange={handleCardHolderChange} /> </div>
                        </div>

                        <div className="row mt-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">  Expiry Date:</label> </div>
                        <div className="col-md-5">     <input type="text" className="card-input" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY"/> </div>
                        </div>

                        <div className="row mt-3 mb-3 ms-5 w-50">
                        <div className="col-md-7">  <label className="">CVV:</label> </div>
                        <div className="col-md-5">   <input type="text" className="card-input" value={cvv} onChange={handleCVVChange}  placeholder="123" /> </div>
                        </div>
                        <div>
                      
                        </div>
                        
                  <div className="btn-contr">
                    <button className='btn-pos' onClick={handleBankProceed}>proceed</button>
                 </div>

                </div>
                <OrderPlace  onOpen={modalOpen}  onClose={closeModal}   />
        </>
    )
}