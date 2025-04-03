// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import {  useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { assets } from "../assets/assets";



// const PaymentConfirmation = () => {
//     const location = useLocation();
//     const sessionId = location.state?.sessionId;
//   const { backendurl, token } = useContext(AppContext);
//   const [appointments, setAppointments] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const invoiceRef = useRef();

//   const months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split("_");
//     return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2];
//   };

//   function calculateAge(dob) {
//     // Convert the dob into a Date object if it's not already
//     const birthDate = new Date(dob);
//     const today = new Date();
  
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
  
//     // Adjust age if the birthday hasn't occurred yet this year
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
  
//     return age;
//   }

//   const downloadPDF = () => {
//     const input = invoiceRef.current;
  
//     if (!input) {
//       console.error("Invoice element not found!");
//       return;
//     }
  
//     html2canvas(input, { scale: 2 })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const imgWidth = 190;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
//         pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//         pdf.save(`${appointments.userData.name}.pdf`);
  
//         navigate("/"); // Redirect to homepage after download
//       })
//       .catch((error) => {
//         console.error("Error generating PDF:", error);
//       });
//   };
  

//   // Fetch transaction details
//   async function fetchTransactionDetails(sessionId) {
//     try {
//         console.log(sessionId)
//       const { data } = await axios.post(
//         `${backendurl}/api/user/invoice`,
//         { sessionId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         setAppointments(data.appointmentData);
//         console.log("Appointment Data:", data.appointmentData);
//       } else {
//         toast.error(data.message || "Failed to fetch appointment details.");
//       }
//     } catch (error) {
//       console.error("Error fetching transaction details:", error);
//       toast.error("Error fetching transaction details. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (sessionId) {
//       fetchTransactionDetails(sessionId);
//     }
//   }, [sessionId]);
  
//   useEffect(() => {
//     if (appointments) {
//       downloadPDF();
//     }
//   }, [appointments]); // Call downloadPDF only after appointments are loaded
  

//   if (loading) {
//     return <h3 style={styles.loadingMessage}>Loading transaction details...</h3>;
//   }

//   if (!appointments) {
//     return <h3 style={styles.errorMessage}>❌ No transaction details found.</h3>;
//   }

//   return (
//     <div ref={invoiceRef} style={styles.invoiceContainer}>
//         <img src={assets.novacare_logo} alt="" />
//       <h2 style={styles.title}>NovaCare Invoice</h2>
//       <div style={styles.section}>
//         <h3>Patient Details</h3>
//         <p><strong>Name:</strong> {appointments.userData?.name}</p>
//         <p><strong>Age:</strong> {calculateAge(appointments.userData?.dob)}</p>
//         <p><strong>Booking Date:</strong> {slotDateFormat(appointments.slotDate)}</p>
//         <p><strong>Booking Time:</strong> {appointments.slotTime}</p>
//       </div>
//       <div style={styles.section}>
//         <h3>Doctor Details</h3>
//         <p><strong>Name:</strong> {appointments.docData?.name}</p>
//         <p><strong>Specialty:</strong> {appointments.docData?.speciality}</p>
//       </div>
//       <div style={styles.section}>
//         <h3>Payment Summary</h3>
//         <p><strong>Consultation Fees:</strong> ₹{appointments.docData?.fees}</p>
//         <h3 style={styles.successMessage}>✅ Payment Successful!</h3>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   invoiceContainer: {
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     padding: '20px',
//     width: '400px',
//     margin: '20px auto',
//     boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//     backgroundColor: '#fff',
//     fontFamily: 'Arial, sans-serif',
//   },
//   title: {
//     textAlign: 'center',
//     borderBottom: '2px solid #000',
//     paddingBottom: '10px',
//   },
//   section: {
//     marginBottom: '15px',
//     paddingBottom: '10px',
//     borderBottom: '1px dashed #ccc',
//   },
//   successMessage: {
//     color: 'green',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   loadingMessage: {
//     textAlign: 'center',
//     fontSize: '18px',
//     fontWeight: 'bold',
//   },
//   errorMessage: {
//     textAlign: 'center',
//     fontSize: '18px',
//     color: 'red',
//     fontWeight: 'bold',
//   },
// };

// export default PaymentConfirmation;

import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { assets } from "../assets/assets";

const PaymentConfirmation = () => {
    const location = useLocation();
    const sessionId = location.state?.sessionId;
    const { backendurl, token } = useContext(AppContext);
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const invoiceRef = useRef();

    const months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return `${dateArray[0]} ${months[Number(dateArray[1])]}, ${dateArray[2]}`;
    };

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const downloadPDF = () => {
        const input = invoiceRef.current;
        if (!input) {
            console.error("Invoice element not found!");
            return;
        }
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save(`${appointments.userData.name}.pdf`);
            navigate("/");
        }).catch((error) => {
            console.error("Error generating PDF:", error);
        });
    };

    async function fetchTransactionDetails(sessionId) {
        try {
            const { data } = await axios.post(
                `${backendurl}/api/user/invoice`,
                { sessionId },
                { headers: { token } }
            );
            if (data.success) {
                setAppointments(data.appointmentData);
            } else {
                toast.error(data.message || "Failed to fetch appointment details.");
            }
        } catch (error) {
            toast.error("Error fetching transaction details. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (sessionId) {
            fetchTransactionDetails(sessionId);
        }
    }, [sessionId]);

    useEffect(() => {
        if (appointments) {
            downloadPDF();
        }
    }, [appointments]);

    if (loading) {
        return <h3 className="text-center text-xl font-semibold text-gray-700">Loading transaction details...</h3>;
    }

    if (!appointments) {
        return <h3 className="text-center text-xl font-semibold text-red-600">❌ No transaction details found.</h3>;
    }

    return (
        <div ref={invoiceRef} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-black">
            <img src={assets.novacare_logo} alt="NovaCare Logo" className="w-32 mx-auto" />
            <h2 className="text-2xl font-bold text-center mt-4 border-b pb-2">NovaCare Invoice</h2>
            
            <div className="mt-4 border-b border-dashed pb-4">
                <h3 className="text-lg font-semibold text-gray-700">Patient Details</h3>
                <p><strong>Name:</strong> {appointments.userData?.name}</p>
                <p><strong>Age:</strong> {calculateAge(appointments.userData?.dob)}</p>
                <p><strong>Booking Date:</strong> {slotDateFormat(appointments.slotDate)}</p>
                <p><strong>Booking Time:</strong> {appointments.slotTime}</p>
            </div>

            <div className="mt-4 border-b border-dashed pb-4">
                <h3 className="text-lg font-semibold text-gray-700">Doctor Details</h3>
                <p><strong>Name:</strong> {appointments.docData?.name}</p>
                <p><strong>Specialty:</strong> {appointments.docData?.speciality}</p>
            </div>

            <div className="mt-4 border-t border-dashed pt-4">
                <h3 className="text-lg font-semibold text-gray-700">Payment Summary</h3>
                <p><strong>Consultation Fees:</strong> ₹{appointments.docData?.fees}</p>
                <h3 className="text-green-600 font-bold text-lg text-center mt-2">✅ Payment Successful!</h3>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
