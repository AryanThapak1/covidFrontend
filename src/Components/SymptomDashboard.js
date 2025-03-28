import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fileAddress from "../utils/FileAddress";
import Symptoms from "../utils/Symptom";
import Button from "../utils/Button";

const symptoms = [
  "Breathing Problem", "Fever", "Dry Cough", "Sore Throat", "Running Nose",
  "Asthma Chronic", "Lung Disease", "Headache", "Heart Disease", "Diabetes",
  "Hyper Tension", "Fatigue", "Gastrointestinal", "Abroad travel",
  "Contact with COVID Patient", "Attended Large Gathering",
  "Visited Public Exposed Places", "Family working in Public Exposed",
  "Places Wearing Masks", "Sanitization from Market"
];

const SymptomDashboard = () => {
  const [data, setData] = useState(new Array(symptoms.length).fill(0));

  const onSubmitHandler = async () => {
    try {
      const req = await fetch(`http://127.0.0.1:5000/predict`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const parsedData = await req.json();
      console.log(parsedData);

      if (parsedData.prediction === 1) {
        toast.error("⚠️ High Risk! You may have COVID-19. Consult a doctor immediately.", { autoClose: 5000 });
      } else {
        toast.success("✅ No Risk! You are safe.", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("⚠️ Error in fetching data. Please try again.");
    }
  };

  const toggleSelection = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = newData[index] === 0 ? 1 : 0;
      console.log(newData);
      return newData;
    });
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center mb-6">Symptoms Dashboard</h2>
      
      <div className="grid w-full justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {symptoms.map((el, index) => (
          <Symptoms 
            key={index} 
            symptomName={el} 
            imageUrl={fileAddress + el + ".jpeg"} 
            isSelected={data[index]} 
            onClick={() => toggleSelection(index)}
          />
        ))}
      </div>

      <Button title="Submit Details" onClick={onSubmitHandler}></Button>
      <ToastContainer />
    </div>
  );
};

export default SymptomDashboard;
