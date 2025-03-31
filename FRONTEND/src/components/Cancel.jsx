import { XCircleIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QuYyWHfp1Ms590tgHhRMMwhDODINYDLjw5iuo8GVUSeiyWqv0ygVxWgjvdkpcWc8Fsw2ZeisRUmWZhhKClv9p8A00VY1CspFi");

export default function Cancel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
    const appointmentId = searchParams.get("id");
  const {backendurl,token}=useContext(AppContext)
  console.log(appointmentId)

  const paymentIntegration=async ()=>{
    try {

      

      if(!appointmentId){
        toast.error("Appointment not found")
      }

      const response=await axios.post(backendurl+"/api/user/paymentintegration",{appointmentId},{headers:{token}})

      // const {sessionId} = await response.data;
      const {url} = await response.data;
      const stripe = await stripePromise;

      if (!url) {
        toast.error("Failed to retrieve session ID.");
        return;
    }

      // await stripe.redirectToCheckout({ sessionId });

      window.location.href = url

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <XCircleIcon className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Payment Cancelled</h2>
        <p className="text-gray-600 mt-2">Your payment was not completed. If this was a mistake, you can try again.</p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-blue-600 py-2 hover:bg-blue-700 text-white" onClick={() => paymentIntegration()}>
            Try Again
          </button>
          <button className="w-full bg-gray-600 py-2 hover:bg-gray-700 text-white" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
