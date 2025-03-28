import { useNavigate } from "react-router-dom";
import Footer from "../utils/Footer";
import covidTestImage from "./../Items/medical-research.png.jpg"
import medicalResearchImage from "./../Items/covid-test.png.webp";

const HomePage = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/diagnose");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-red-700">
            AI-Powered COVID-19 Detection
          </h1>
          <p className="text-lg mb-6 text-gray-800">
            Our cutting-edge machine learning model helps detect COVID-19 based on symptoms and patient data.
            Simply enter your symptoms, and our AI will provide a probability-based diagnosis.
          </p>
          <p className="text-lg text-gray-800">
            Early detection can save lives. Use our tool to assess your risk and take necessary precautions.
          </p>
        </div>
        <div className="w-8/12">
          <img
            src={covidTestImage}
            alt="COVID-19 Test"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-8/12">
          <img
            src={medicalResearchImage}
            alt="Medical Research"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">
            How It Works
          </h1>
          <p className="text-lg mb-6 text-gray-800">
            Our AI model is trained on real-world data to provide accurate predictions. Using advanced supervised learning algorithms,
            we analyze input symptoms and provide insights based on statistical patterns.
          </p>
          <p className="text-lg text-gray-800">
            Enter your symptoms and get an instant assessment backed by data-driven predictions.
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClickHandler}
        >
          Check Your Risk
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
