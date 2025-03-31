import { useContext, useEffect, useState } from "react";
import { CheckCircleIcon } from "lucide-react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios"
import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";

export default function Success() {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id"); // Get session_id from URL
    const [transactionDetails, setTransactionDetails] = useState({
        id:"",
        amount:"",
        date:""
    });

    const {backendurl, token}=useContext(AppContext)
  
//   const [transactionDetails, setTransactionDetails] = useState({
//     id: "#123456789",
//     amount: "$100",
//     date: new Date().toLocaleDateString(),
//   });

  const navigate=useNavigate()

  useEffect(() => {
    if (sessionId) {
      fetchTransactionDetails(sessionId);
    }
  }, [sessionId]);

  async function fetchTransactionDetails(sessionId) {
    try {
      const {data} = await axios.post(backendurl+`/api/user/fetchTransactions`,{sessionId},{headers:{token}}); // Backend route
      console.log(data.session.id)
      console.log(data.session.amount_total)
      console.log(data.session.created)
      console.log(data.session)

      if(data.success){
        console.log("hello")
        console.log(data.session.id)
      console.log(data.session.amount_total)
      console.log(data.session.created)
        setTransactionDetails({
            id: data.session.id,
            amount: `₹${(data.session.amount_total / 100)}`, // Convert cents to dollars
            date: new Date(data.session.created * 1000).toLocaleDateString(),
          });

      }else{
        toast.error(data.message)
      }
      console.log(transactionDetails)
    } catch (error) {
      console.log(error)
      toast.error("Error fetching transaction details:", error);
    }
  }
 

  if (!transactionDetails.id) {
    return <div>Loading transaction details...</div>;
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <CheckCircleIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your payment. A confirmation email has been sent.</p>

        <div className="mt-6 text-left">
          <p className="text-gray-700 w-full break-all overflow-hidden"><strong>Transaction ID:</strong> {transactionDetails.id}</p>
          <p className="text-gray-700"><strong>Amount Paid:</strong> {transactionDetails.amount}</p>
          <p className="text-gray-700"><strong>Date:</strong> {transactionDetails.date}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={() => navigate(`/myappointment`)}  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white">View Booking</button>
          <button onClick={() => navigate(`/`)} className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white">Go to Home</button>
        </div>
      </div>
    </div>
  );
}
