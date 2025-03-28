const Symptoms = ({ imageUrl, symptomName, isSelected, onClick }) => {
    return (
      <div
        className={`border rounded-xl p-4 shadow-md transition duration-300 cursor-pointer 
          ${isSelected ? "border-blue-500 bg-blue-100 scale-105" : "border-gray-300 bg-white hover:shadow-lg"}`}
        onClick={onClick}
      >
        <img 
          src={imageUrl} 
          alt={symptomName} 
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold text-center text-gray-800">{symptomName}</h3>
      </div>
    );
  };
  
  export default Symptoms;
  