import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BankDetails } from '../BankDetails/BankDetail';
import { DeleveryAddress } from '../../Address/deliveryAddress';

export function ProductBuy({BackToFeature})
{

    const [bankExists, setBankExists] = useState('');
    const[IsExist,setIsExist] = useState(false);
    const[Bankdetaildispay,setBankdetaildispay] = useState();
    const[isAddress,setIsAddress] = useState(true);

        
    const handleBanksSelected = (event) => {
        debugger;
        if(event.target.value==='NotExists')
        {
            setIsExist(true)
        }
        else
        {
            setIsExist(false)
        }
        setBankExists(event.target.value);
       
    };

    function handleAddressProceed(value)
    {
        setIsAddress(value)
        setBankdetaildispay('bank-display-block');

       
    }

    
    const controlProps = (item) => ({
      checked: bankExists === item,
      onChange: handleBanksSelected,
      value: item,
      name: 'size-radio-button-demo',
      inputProps: { 'aria-label': item },
    });

    function handleBankProceed()
    {
        if(!isAddress)
        {
            setBankdetaildispay('bank-display-none');

        }
        // setIsExist(false)
        setBankExists('');
    }
    
useEffect(()=>{
    setBankdetaildispay('bank-display-none');
},[])

    return(
        <>
        {/* <div className="row">
            <div className="col-md-2">
        <ArrowBackIcon  className='prod-back' onClick={BackToFeature}/>
            </div>
            <div className="col-md-10"></div>
        </div> */}

            <div className=" feature-container m-3 ">
                <div className={Bankdetaildispay}>
                <Radio {...controlProps('Exists')} size="small" /> Use Existing Bank Details
                <Radio {...controlProps('NotExists')} size="small" /> New Bank details
                </div>

                {((bankExists==='NotExists') && (isAddress==false))?<BankDetails />:''}
                {/* {((IsExist==false) && (isAddress==false))?'Please add the bank details':''} */}
                {(isAddress)?<DeleveryAddress addressProceed={handleAddressProceed}/>:''}
             
                

                {/* <div className="btn-contr">
                    <button className='btn-pos' onClick={handleBankProceed}>proceed</button>
                </div> */}
            </div>
        </>
    )
}